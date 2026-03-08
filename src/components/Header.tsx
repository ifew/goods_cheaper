'use client';

import { useTranslations, useLocale } from 'next-intl';
import { useRouter, usePathname, Link } from '@/i18n/navigation';
import { locales } from '@/i18n/routing';
import AuthButton from './AuthButton';

const LOCALE_NAMES: Record<string, string> = {
  en: 'English',   th: 'ไทย',         'zh-TW': '繁中',
  'zh-CN': '简中', fr: 'Français',    ru: 'Русский',
  de: 'Deutsch',   es: 'Español',     vi: 'Tiếng Việt',
  ja: '日本語',    ar: 'العربية',     hi: 'हिन्दी',
  kk: 'Қазақша',
};

export default function Header() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-20 shadow-sm">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between max-w-5xl">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-2xl">🛒</span>
          <span className="font-bold text-green-600 text-lg hidden sm:block">{t('app.name')}</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-gray-600">
          <Link href="/"         className="hover:text-green-600 transition-colors">{t('nav.compare')}</Link>
          <Link href="/history"  className="hover:text-green-600 transition-colors">{t('nav.history')}</Link>
          <Link href="/settings" className="hover:text-green-600 transition-colors">{t('nav.settings')}</Link>
        </nav>

        <div className="flex items-center gap-3">
          <select
            value={locale}
            onChange={(e) => router.replace(pathname, { locale: e.target.value })}
            className="text-sm border border-gray-200 rounded-lg px-2 py-1.5 bg-white focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            {locales.map((l) => (
              <option key={l} value={l}>{LOCALE_NAMES[l] ?? l}</option>
            ))}
          </select>
          <AuthButton />
        </div>
      </div>
    </header>
  );
}
