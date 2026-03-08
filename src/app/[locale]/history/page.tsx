import { createClient } from '@/lib/supabase/server';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import HistoryList from '@/components/HistoryList';
import type { SavedComparison } from '@/types';

export default async function HistoryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('history');
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <p className="text-4xl mb-4">📋</p>
        <p className="text-gray-500">{t('loginPrompt')}</p>
      </div>
    );
  }

  const { data } = await supabase
    .from('comparisons')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false });

  return (
    <div className="container mx-auto px-4 py-6 max-w-2xl">
      <HistoryList comparisons={(data ?? []) as SavedComparison[]} />
    </div>
  );
}
