'use client';

import { useTranslations } from 'next-intl';
import { useComparisonStore } from '@/stores/comparisonStore';

export default function ResetButton() {
  const t = useTranslations('compare');
  const reset = useComparisonStore((s) => s.reset);

  return (
    <button
      onClick={reset}
      className="text-sm text-gray-400 hover:text-gray-600 border border-gray-200 rounded-lg px-3 py-1.5 transition-colors"
    >
      ↺ {t('reset')}
    </button>
  );
}
