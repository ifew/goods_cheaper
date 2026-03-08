'use client';

import { useTranslations } from 'next-intl';
import { Link, usePathname } from '@/i18n/navigation';

export default function BottomNav() {
  const t = useTranslations('nav');
  const pathname = usePathname();

  const links = [
    { href: '/' as const,         label: t('compare'),  icon: '⚖️' },
    { href: '/history' as const,  label: t('history'),  icon: '📋' },
    { href: '/settings' as const, label: t('settings'), icon: '⚙️' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 lg:hidden z-20">
      <div className="flex">
        {links.map(({ href, label, icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex-1 flex flex-col items-center py-2.5 text-xs gap-1 transition-colors ${
                active ? 'text-green-600 font-semibold' : 'text-gray-500'
              }`}
            >
              <span className="text-xl leading-none">{icon}</span>
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
