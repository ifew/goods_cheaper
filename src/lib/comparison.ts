import type { ProductInput, ComparisonResult } from '@/types';
import { UNITS } from './units';

function parseNum(v: string): number {
  const n = parseFloat(v);
  return isNaN(n) ? 0 : n;
}

function effectivePrice(price: number, type: string, discount: number): number {
  if (type === 'percent') return price * (1 - Math.min(discount, 100) / 100);
  return Math.max(0, price - discount);
}

function normalised(p: ProductInput): { price: number; base: string; category: string } | null {
  const conv = UNITS[p.unit];
  if (!conv) return null;
  const price = parseNum(p.price);
  const qty   = parseNum(p.quantity);
  const disc  = parseNum(p.discountValue);
  if (price <= 0 || qty <= 0) return null;
  return {
    price: effectivePrice(price, p.discountType, disc) / (qty * conv.factor),
    base: conv.base,
    category: conv.category,
  };
}

const EMPTY: ComparisonResult = {
  unitPriceA: 0, unitPriceB: 0, winner: null,
  savingsPercent: 0, savingsCash: 0, baseUnit: '', canCompare: false,
};

export function compare(a: ProductInput, b: ProductInput): ComparisonResult {
  const na = normalised(a);
  const nb = normalised(b);

  if (!na || !nb) return { ...EMPTY, error: 'invalid_input' };
  if (na.category !== nb.category) return { ...EMPTY, error: 'unit_mismatch' };

  const diff = Math.abs(na.price - nb.price);
  const max  = Math.max(na.price, nb.price);

  const winner: 'A' | 'B' | 'tie' =
    diff < 1e-10 ? 'tie' : na.price < nb.price ? 'A' : 'B';

  return {
    unitPriceA: na.price,
    unitPriceB: nb.price,
    winner,
    savingsPercent: max > 0 ? (diff / max) * 100 : 0,
    savingsCash: diff,
    baseUnit: na.base,
    canCompare: true,
  };
}
