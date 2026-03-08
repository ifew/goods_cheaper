'use client';

import { useTranslations } from 'next-intl';
import { useComparisonStore } from '@/stores/comparisonStore';
import { createClient } from '@/lib/supabase/client';

export default function ResultBanner() {
  const t = useTranslations();
  const { result, productA, productB, currency } = useComparisonStore();

  const handleSave = async () => {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      alert(t('history.loginPrompt'));
      return;
    }
    const { error } = await supabase.from('comparisons').insert({
      user_id:     user.id,
      product_a:   productA,
      product_b:   productB,
      winner:      result.winner,
      unit_price_a: result.unitPriceA,
      unit_price_b: result.unitPriceB,
      base_unit:   result.baseUnit,
    });
    if (!error) alert(t('compare.save') + ' ✓');
  };

  if (result.error === 'unit_mismatch') {
    return (
      <div className="mt-5 p-4 bg-amber-50 border border-amber-300 rounded-2xl text-center text-amber-700 text-sm">
        ⚠️ {t('compare.errors.unitMismatch')}
      </div>
    );
  }

  if (!result.canCompare) return null;

  const nameA = productA.name || t('compare.productA');
  const nameB = productB.name || t('compare.productB');
  const winnerName = result.winner === 'A' ? nameA : result.winner === 'B' ? nameB : null;

  return (
    <div className="mt-5 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
      <div className="text-center mb-5">
        {result.winner === 'tie' ? (
          <div>
            <p className="text-3xl mb-1">🤝</p>
            <p className="text-lg font-semibold text-gray-600">{t('result.tie')}</p>
          </div>
        ) : (
          <div>
            <p className="text-3xl mb-1">🏆</p>
            <p className="text-2xl font-bold text-green-600">
              {t('result.winner', { name: winnerName })}
            </p>
            <p className="text-gray-500 mt-1.5 text-sm">
              {t('result.savingsPercent', { pct: result.savingsPercent.toFixed(1) })}
              {' · '}
              {t('result.savingsCash', {
                amount: `${currency} ${result.savingsCash.toFixed(4)}`,
                unit: result.baseUnit,
              })}
            </p>
          </div>
        )}
      </div>

      {/* Mini comparison table */}
      <div className="grid grid-cols-2 gap-3 mb-5 text-sm">
        {(['A', 'B'] as const).map((p) => {
          const name = p === 'A' ? nameA : nameB;
          const price = p === 'A' ? result.unitPriceA : result.unitPriceB;
          const winner = result.winner === p;
          return (
            <div key={p} className={`rounded-xl p-3 text-center ${winner ? 'bg-green-50 border border-green-200' : 'bg-gray-50'}`}>
              <p className="font-medium text-gray-700 truncate">{name}</p>
              <p className={`font-bold tabular-nums ${winner ? 'text-green-600' : 'text-gray-500'}`}>
                {currency} {price.toFixed(4)}<span className="text-xs font-normal">/{result.baseUnit}</span>
              </p>
            </div>
          );
        })}
      </div>

      <button
        onClick={handleSave}
        className="w-full bg-green-500 hover:bg-green-600 active:bg-green-700 text-white font-semibold py-3 rounded-xl transition-colors"
      >
        {t('compare.save')}
      </button>
    </div>
  );
}
