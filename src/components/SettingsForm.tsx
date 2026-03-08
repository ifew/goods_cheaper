'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { locales } from '@/i18n/routing';
import { createClient } from '@/lib/supabase/client';
import { useComparisonStore } from '@/stores/comparisonStore';
import type { UserProfile } from '@/types';

const LOCALE_NAMES: Record<string, string> = {
  en: 'English', th: 'ไทย', 'zh-TW': '繁體中文', 'zh-CN': '简体中文',
  fr: 'Français', ru: 'Русский', de: 'Deutsch', es: 'Español',
  vi: 'Tiếng Việt', ja: '日本語', ar: 'العربية', hi: 'हिन्दी', kk: 'Қазақша',
};

const CURRENCIES = ['THB', 'USD', 'EUR', 'GBP', 'JPY', 'CNY', 'KRW', 'VND', 'INR', 'RUB', 'KZT'];

interface Props {
  profile: UserProfile | null;
  userId:  string | null;
}

export default function SettingsForm({ profile, userId }: Props) {
  const t     = useTranslations('settings');
  const tCurr = useTranslations('currencies');
  const setCurrency = useComparisonStore((s) => s.setCurrency);

  const [lang,    setLang]    = useState(profile?.language ?? 'en');
  const [curr,    setCurr]    = useState(profile?.currency ?? 'THB');
  const [unitSys, setUnitSys] = useState(profile?.unit_system ?? 'metric');
  const [saved,   setSaved]   = useState(false);

  const handleSave = async () => {
    setCurrency(curr);
    if (userId) {
      const supabase = createClient();
      await supabase.from('profiles').upsert({
        id: userId, language: lang, currency: curr,
        unit_system: unitSys, updated_at: new Date().toISOString(),
      });
    }
    // Persist preference and navigate
    document.cookie = `NEXT_LOCALE=${lang};path=/;max-age=31536000`;
    const parts = window.location.pathname.split('/');
    parts[1] = lang;
    window.location.href = parts.join('/');
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 space-y-5">
      {/* Language */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">{t('language')}</label>
        <select
          value={lang}
          onChange={(e) => setLang(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50"
        >
          {locales.map((l) => (
            <option key={l} value={l}>{LOCALE_NAMES[l] ?? l}</option>
          ))}
        </select>
      </div>

      {/* Currency */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">{t('currency')}</label>
        <select
          value={curr}
          onChange={(e) => setCurr(e.target.value)}
          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-400 bg-gray-50"
        >
          {CURRENCIES.map((c) => (
            <option key={c} value={c}>{tCurr(c)}</option>
          ))}
        </select>
      </div>

      {/* Unit system */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-2">{t('unitSystem')}</label>
        <div className="flex gap-4">
          {(['metric', 'imperial'] as const).map((s) => (
            <label key={s} className="flex items-center gap-2 cursor-pointer text-sm">
              <input
                type="radio"
                name="unitSystem"
                value={s}
                checked={unitSys === s}
                onChange={() => setUnitSys(s)}
                className="accent-green-500"
              />
              {t(s)}
            </label>
          ))}
        </div>
      </div>

      <button
        onClick={handleSave}
        className={`w-full font-semibold py-3 rounded-xl transition-all ${
          saved
            ? 'bg-blue-500 text-white'
            : 'bg-green-500 hover:bg-green-600 text-white'
        }`}
      >
        {saved ? `✓ ${t('saved')}` : t('save')}
      </button>
    </div>
  );
}
