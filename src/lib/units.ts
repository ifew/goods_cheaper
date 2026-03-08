import type { UnitDef } from '@/types';

export const UNITS: Record<string, UnitDef> = {
  // Volume – metric
  ml:     { label: 'ml',     base: 'ml', factor: 1,        category: 'volume' },
  cl:     { label: 'cl',     base: 'ml', factor: 10,       category: 'volume' },
  dl:     { label: 'dl',     base: 'ml', factor: 100,      category: 'volume' },
  l:      { label: 'L',      base: 'ml', factor: 1000,     category: 'volume' },
  // Volume – imperial
  'fl oz': { label: 'fl oz', base: 'ml', factor: 29.5735,  category: 'volume' },
  pint:   { label: 'pint',   base: 'ml', factor: 473.176,  category: 'volume' },
  gallon: { label: 'gallon', base: 'ml', factor: 3785.41,  category: 'volume' },
  // Weight – metric
  g:  { label: 'g',  base: 'g', factor: 1,       category: 'weight' },
  kg: { label: 'kg', base: 'g', factor: 1000,    category: 'weight' },
  // Weight – imperial
  oz: { label: 'oz', base: 'g', factor: 28.3495, category: 'weight' },
  lb: { label: 'lb', base: 'g', factor: 453.592, category: 'weight' },
  // Count
  pcs:   { label: 'pcs',   base: 'pcs', factor: 1,  category: 'count' },
  pack:  { label: 'pack',  base: 'pcs', factor: 1,  category: 'count' },
  dozen: { label: 'dozen', base: 'pcs', factor: 12, category: 'count' },
};

export const UNIT_GROUPS: Record<string, string[]> = {
  volume: ['ml', 'cl', 'dl', 'l', 'fl oz', 'pint', 'gallon'],
  weight: ['g', 'kg', 'oz', 'lb'],
  count:  ['pcs', 'pack', 'dozen'],
};
