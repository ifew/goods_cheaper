import type { Metadata } from 'next';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import Header from '@/components/Header';
import BottomNav from '@/components/BottomNav';
import '../globals.css';

export const metadata: Metadata = {
  title: 'Goods Cheaper',
  description: 'Compare prices smarter',
  manifest: '/manifest.json',
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as never)) notFound();
  setRequestLocale(locale);

  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body className="bg-gray-50 min-h-screen" suppressHydrationWarning>
        <NextIntlClientProvider messages={messages}>
          <Header />
          <main className="pb-16 lg:pb-0">{children}</main>
          <BottomNav />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
