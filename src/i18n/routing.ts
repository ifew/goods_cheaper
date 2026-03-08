import { defineRouting } from 'next-intl/routing';

export const locales = [
  'en', 'th', 'zh-TW', 'zh-CN',
  'fr', 'ru', 'de', 'es',
  'vi', 'ja', 'ar', 'hi', 'kk',
] as const;

export type AppLocale = (typeof locales)[number];

export const routing = defineRouting({
  locales,
  defaultLocale: 'en',
  localeDetection: false, // rely on URL prefix only, not Accept-Language header
});
