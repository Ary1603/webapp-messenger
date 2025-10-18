import type { Messages, Locale } from "@/lib/i18n";

export type I18nContextType = {
  locale: Locale;
  messages: Messages | null;
  setLocale: (l: Locale) => void;
};