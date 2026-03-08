import { create } from 'zustand';
import type { ProductInput, ComparisonResult } from '@/types';
import { compare } from '@/lib/comparison';

const defaultProduct = (): ProductInput => ({
  name: '',
  price: '',
  quantity: '',
  unit: 'pcs',
  discountType: 'percent',
  discountValue: '0',
});

const emptyResult = (): ComparisonResult => ({
  unitPriceA: 0, unitPriceB: 0, winner: null,
  savingsPercent: 0, savingsCash: 0, baseUnit: '', canCompare: false,
});

interface Store {
  productA: ProductInput;
  productB: ProductInput;
  result:   ComparisonResult;
  currency: string;
  updateProductA: (patch: Partial<ProductInput>) => void;
  updateProductB: (patch: Partial<ProductInput>) => void;
  setCurrency:    (c: string) => void;
  reset:          () => void;
}

export const useComparisonStore = create<Store>((set, get) => ({
  productA: defaultProduct(),
  productB: defaultProduct(),
  result:   emptyResult(),
  currency: 'THB',

  updateProductA(patch) {
    const productA = { ...get().productA, ...patch };
    set({ productA, result: compare(productA, get().productB) });
  },
  updateProductB(patch) {
    const productB = { ...get().productB, ...patch };
    set({ productB, result: compare(get().productA, productB) });
  },
  setCurrency(currency) { set({ currency }); },
  reset() { set({ productA: defaultProduct(), productB: defaultProduct(), result: emptyResult() }); },
}));
