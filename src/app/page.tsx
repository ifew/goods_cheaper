import { redirect } from 'next/navigation';

// Fallback: redirect bare "/" to the default locale
export default function RootPage() {
  redirect('/en');
}
