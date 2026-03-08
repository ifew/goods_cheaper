'use client';

import { useTranslations } from 'next-intl';
import { useComparisonStore } from '@/stores/comparisonStore';

interface Props { product: 'A' | 'B' }

export default function ProductCard({ product }: Props) {
  const t = useTranslations();
  const { productA, productB, result, updateProductA, updateProductB } = useComparisonStore();

  const data   = product === 'A' ? productA : productB;
  const update = product === 'A' ? updateProductA : updateProductB;

  const isWinner  = result.canCompare && result.winner === product;
  const isTie     = result.canCompare && result.winner === 'tie';
  const unitPrice = result.canCompare
    ? (product === 'A' ? result.unitPriceA : result.unitPriceB)
    : null;

  return (
    <div className={`flex-1 min-w-0 rounded-2xl border-2 p-3 sm:p-5 transition-all duration-200 bg-white ${
      isWinner
        ? 'border-green-500 shadow-lg shadow-green-100 ring-1 ring-green-300'
        : isTie
        ? 'border-blue-400'
        : 'border-gray-200'
    }`}>
      {/* Card header */}
      <div className="flex items-center justify-between mb-3">
        <h2 className="font-bold text-sm sm:text-lg text-gray-700">
          {t(`compare.product${product}`)}
        </h2>
        {isWinner && (
          <span className="bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full animate-pulse whitespace-nowrap">
            🏆 <span className="hidden sm:inline">{t('result.cheaper')}</span>
          </span>
        )}
        {isTie && (
          <span className="bg-blue-400 text-white text-xs font-bold px-2 py-0.5 rounded-full">
            🤝
          </span>
        )}
      </div>

      <div className="space-y-2">
        {/* Price */}
        <input
          type="number"
          inputMode="decimal"
          placeholder={t('compare.pricePlaceholder')}
          value={data.price}
          min={0}
          onChange={(e) => update({ price: e.target.value })}
          className="w-full border border-gray-200 rounded-xl px-2.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50"
        />

        {/* Quantity (unitless — user enters in any consistent unit) */}
        <input
          type="number"
          inputMode="decimal"
          placeholder={t('compare.quantityPlaceholder')}
          value={data.quantity}
          min={0}
          onChange={(e) => update({ quantity: e.target.value })}
          className="w-full border border-gray-200 rounded-xl px-2.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50"
        />

        {/* Name (optional) */}
        <input
          type="text"
          placeholder={t('compare.productName')}
          value={data.name}
          onChange={(e) => update({ name: e.target.value })}
          className="w-full border border-gray-200 rounded-xl px-2.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50"
        />

        {/* Discount */}
        <div className="flex gap-1.5">
          <div className="flex rounded-xl border border-gray-200 overflow-hidden text-xs flex-shrink-0">
            <button
              onClick={() => update({ discountType: 'percent' })}
              className={`px-2.5 py-2 transition-colors ${
                data.discountType === 'percent'
                  ? 'bg-green-500 text-white font-semibold'
                  : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
            >%</button>
            <button
              onClick={() => update({ discountType: 'flat' })}
              className={`px-2.5 py-2 transition-colors ${
                data.discountType === 'flat'
                  ? 'bg-green-500 text-white font-semibold'
                  : 'bg-white text-gray-500 hover:bg-gray-50'
              }`}
            >{t('compare.discountPrice')}</button>
          </div>
          <input
            type="number"
            inputMode="decimal"
            placeholder="0"
            min={0}
            value={data.discountValue === '0' ? '' : data.discountValue}
            onChange={(e) => update({ discountValue: e.target.value || '0' })}
            className="flex-1 min-w-0 border border-gray-200 rounded-xl px-2.5 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50"
          />
        </div>

        {/* Unit price result */}
        {unitPrice !== null && (
          <div className={`text-center p-2 rounded-xl ${isWinner ? 'bg-green-50' : 'bg-gray-100'}`}>
            <p className={`text-base sm:text-xl font-bold tabular-nums ${isWinner ? 'text-green-600' : 'text-gray-700'}`}>
              {unitPrice.toFixed(2)}
            </p>
            <p className="text-xs text-gray-400">{t('result.perUnit')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
