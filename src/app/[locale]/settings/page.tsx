import { createClient } from '@/lib/supabase/server';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import SettingsForm from '@/components/SettingsForm';
import type { UserProfile } from '@/types';

export default async function SettingsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations('settings');
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  let profile: UserProfile | null = null;
  if (user) {
    const { data } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', user.id)
      .single();
    profile = data;
  }

  return (
    <div className="container mx-auto px-4 py-6 max-w-md">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">{t('title')}</h1>
      <SettingsForm profile={profile} userId={user?.id ?? null} />
    </div>
  );
}
