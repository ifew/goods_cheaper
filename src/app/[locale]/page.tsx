'use client';

import { useTranslations } from 'next-intl';
import ProductCard from '@/components/ProductCard';
import ResultBanner from '@/components/ResultBanner';
import ResetButton from '@/components/ResetButton';

export default function ComparePage() {
  const t = useTranslations('compare');

  return (
    <div className="container mx-auto px-4 py-6 max-w-5xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800">{t('title')}</h1>
        <ResetButton />
      </div>

      <div className="flex flex-row gap-2 sm:gap-5">
        <ProductCard product="A" />
        <div className="hidden sm:flex items-center justify-center text-3xl text-gray-300 font-bold px-2 flex-shrink-0">
          VS
        </div>
        <ProductCard product="B" />
      </div>

      <ResultBanner />
    </div>
  );
}
