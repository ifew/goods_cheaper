'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { createClient } from '@/lib/supabase/client';
import type { SavedComparison } from '@/types';

interface Props { comparisons: SavedComparison[] }

export default function HistoryList({ comparisons: initial }: Props) {
  const t  = useTranslations();
  const tc = useTranslations('compare');
  const th = useTranslations('history');

  const [items, setItems] = useState(initial);
  const [search, setSearch] = useState('');

  const filtered = items.filter((c) => {
    const q = search.toLowerCase();
    return !q
      || c.product_a.name?.toLowerCase().includes(q)
      || c.product_b.name?.toLowerCase().includes(q);
  });

  const handleDelete = async (id: string) => {
    const supabase = createClient();
    await supabase.from('comparisons').delete().eq('id', id);
    setItems((prev) => prev.filter((c) => c.id !== id));
  };

  const exportCsv = () => {
    const header = ['Date', 'Product A', 'Price/Unit A', 'Product B', 'Price/Unit B', 'Winner', 'Unit'];
    const rows = filtered.map((c) => [
      new Date(c.created_at).toLocaleDateString(),
      c.product_a.name || 'A',
      c.unit_price_a.toFixed(6),
      c.product_b.name || 'B',
      c.unit_price_b.toFixed(6),
      c.winner ?? 'tie',
      c.base_unit,
    ]);
    const csv  = [header, ...rows].map((r) => r.map((v) => `"${v}"`).join(',')).join('\n');
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const url  = URL.createObjectURL(blob);
    const a    = Object.assign(document.createElement('a'), { href: url, download: 'comparisons.csv' });
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold text-gray-800">{th('title')}</h1>
        <button
          onClick={exportCsv}
          className="text-sm border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50 transition-colors"
        >
          {th('exportCsv')}
        </button>
      </div>

      <input
        type="text"
        placeholder={th('search')}
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full border border-gray-200 rounded-xl px-4 py-2.5 mb-4 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-white"
      />

      {filtered.length === 0 ? (
        <div className="text-center py-16 text-gray-400">
          <p className="text-4xl mb-3">📋</p>
          <p>{th('empty')}</p>
        </div>
      ) : (
        <div className="space-y-3">
          {filtered.map((c) => {
            const nameA = c.product_a.name || tc('productA');
            const nameB = c.product_b.name || tc('productB');
            const winnerName = c.winner === 'A' ? nameA : c.winner === 'B' ? nameB : null;
            return (
              <div key={c.id} className="bg-white border border-gray-200 rounded-2xl p-4 flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1 flex-wrap">
                    <span className="font-semibold text-gray-800 truncate">{nameA}</span>
                    <span className="text-gray-400 text-sm">vs</span>
                    <span className="font-semibold text-gray-800 truncate">{nameB}</span>
                  </div>
                  <div className="text-sm text-gray-500 flex items-center gap-2">
                    {c.winner === 'tie' ? (
                      <span className="text-blue-500">🤝 {th('noWinner')}</span>
                    ) : (
                      <span className="text-green-600">🏆 {th('winner', { name: winnerName })}</span>
                    )}
                    <span>·</span>
                    <span>{new Date(c.created_at).toLocaleDateString()}</span>
                  </div>
                </div>
                <button
                  onClick={() => handleDelete(c.id)}
                  className="flex-shrink-0 text-xs text-gray-400 hover:text-red-500 transition-colors px-2 py-1 rounded-lg hover:bg-red-50"
                >
                  {th('delete')}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
