import es from '@/locales/es.json';
export type Messages = typeof es;
export type Locale = 'en' | 'es';

const dictionaries = {
  es: () => import('@/locales/es.json').then((m) => m.default),
  en: () => import('@/locales/en.json').then((m) => m.default),
};

export async function getDictionary(locale: Locale): Promise<Messages> {
  return dictionaries[locale]();
}