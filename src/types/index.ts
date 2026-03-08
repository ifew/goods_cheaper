export type Locale =
  | 'en' | 'th' | 'zh-TW' | 'zh-CN'
  | 'fr' | 'ru' | 'de' | 'es'
  | 'vi' | 'ja' | 'ar' | 'hi' | 'kk';

export type UnitCategory = 'volume' | 'weight' | 'count';

export interface UnitDef {
  label: string;
  base: string;
  factor: number;
  category: UnitCategory;
}

export type DiscountType = 'percent' | 'flat';

export interface ProductInput {
  name: string;
  price: string;
  quantity: string;
  unit: string;
  discountType: DiscountType;
  discountValue: string;
}

export interface ComparisonResult {
  unitPriceA: number;
  unitPriceB: number;
  winner: 'A' | 'B' | 'tie' | null;
  savingsPercent: number;
  savingsCash: number;
  baseUnit: string;
  canCompare: boolean;
  error?: 'unit_mismatch' | 'invalid_input';
}

export interface SavedComparison {
  id: string;
  user_id: string;
  product_a: ProductInput;
  product_b: ProductInput;
  winner: 'A' | 'B' | 'tie' | null;
  unit_price_a: number;
  unit_price_b: number;
  base_unit: string;
  created_at: string;
}

export interface UserProfile {
  id: string;
  language: Locale;
  currency: string;
  unit_system: 'metric' | 'imperial';
}
