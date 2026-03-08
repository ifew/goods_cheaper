'use client';

import { useTranslations } from 'next-intl';
import { useComparisonStore } from '@/stores/comparisonStore';
import { UNIT_GROUPS } from '@/lib/units';

interface Props { product: 'A' | 'B' }

export default function ProductCard({ product }: Props) {
  const t = useTranslations();
  const { productA, productB, result, updateProductA, updateProductB, currency } = useComparisonStore();

  const data   = product === 'A' ? productA : productB;
  const update = product === 'A' ? updateProductA : updateProductB;

  const isWinner = result.canCompare && result.winner === product;
  const isTie    = result.canCompare && result.winner === 'tie';
  const unitPrice = result.canCompare
    ? (product === 'A' ? result.unitPriceA : result.unitPriceB)
    : null;

  return (
    <div className={`flex-1 rounded-2xl border-2 p-5 transition-all duration-200 bg-white ${
      isWinner
        ? 'border-green-500 shadow-lg shadow-green-100 ring-1 ring-green-300'
        : isTie
        ? 'border-blue-400'
        : 'border-gray-200'
    }`}>
      {/* Card header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-lg text-gray-700">
          {t(`compare.product${product}`)}
        </h2>
        {isWinner && (
          <span className="bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-pulse">
            🏆 {t('result.cheaper')}
          </span>
        )}
        {isTie && (
          <span className="bg-blue-400 text-white text-xs font-bold px-3 py-1 rounded-full">
            🤝 {t('result.tie')}
          </span>
        )}
      </div>

      <div className="space-y-3">
        {/* Name */}
        <input
          type="text"
          placeholder={t('compare.productName')}
          value={data.name}
          onChange={(e) => update({ name: e.target.value })}
          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50"
        />

        {/* Price */}
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium pointer-events-none">
            {currency}
          </span>
          <input
            type="number"
            inputMode="decimal"
            placeholder={t('compare.price')}
            value={data.price}
            min={0}
            onChange={(e) => update({ price: e.target.value })}
            className="w-full border border-gray-200 rounded-xl pl-14 pr-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50"
          />
        </div>

        {/* Quantity + Unit */}
        <div className="flex gap-2">
          <input
            type="number"
            inputMode="decimal"
            placeholder={t('compare.quantity')}
            value={data.quantity}
            min={0}
            onChange={(e) => update({ quantity: e.target.value })}
            className="flex-1 min-w-0 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50"
          />
          <select
            value={data.unit}
            onChange={(e) => update({ unit: e.target.value })}
            className="border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50"
          >
            {Object.entries(UNIT_GROUPS).map(([category, units]) => (
              <optgroup key={category} label={category}>
                {units.map((u) => (
                  <option key={u} value={u}>{t(`units.${u}`)}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        {/* Discount */}
        <div>
          <p className="text-xs text-gray-500 mb-1.5 font-medium">{t('compare.discount')}</p>
          <div className="flex gap-2">
            {/* Type toggle */}
            <div className="flex rounded-xl border border-gray-200 overflow-hidden text-sm">
              <button
                onClick={() => update({ discountType: 'percent' })}
                className={`px-3 py-2 transition-colors ${
                  data.discountType === 'percent'
                    ? 'bg-green-500 text-white font-semibold'
                    : 'bg-white text-gray-500 hover:bg-gray-50'
                }`}
              >%</button>
              <button
                onClick={() => update({ discountType: 'flat' })}
                className={`px-3 py-2 transition-colors ${
                  data.discountType === 'flat'
                    ? 'bg-green-500 text-white font-semibold'
                    : 'bg-white text-gray-500 hover:bg-gray-50'
                }`}
              >{currency}</button>
            </div>
            <input
              type="number"
              inputMode="decimal"
              placeholder="0"
              min={0}
              value={data.discountValue === '0' ? '' : data.discountValue}
              onChange={(e) => update({ discountValue: e.target.value || '0' })}
              className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50"
            />
          </div>
        </div>

        {/* Unit price result */}
        {unitPrice !== null && (
          <div className={`text-center p-3 rounded-xl ${isWinner ? 'bg-green-50' : 'bg-gray-100'}`}>
            <p className="text-xs text-gray-500 mb-0.5">
              {t('result.pricePerUnit', { price: '', unit: result.baseUnit }).replace(' / ', '')} / {result.baseUnit}
            </p>
            <p className={`text-xl font-bold tabular-nums ${isWinner ? 'text-green-600' : 'text-gray-700'}`}>
              {currency} {unitPrice.toFixed(4)}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
