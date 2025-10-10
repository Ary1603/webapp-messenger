"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getDictionary, type Messages, type Locale } from "@/lib/i18n";

type I18nContextType = {
  locale: Locale;
  messages: Messages | null;
  setLocale: (l: Locale) => void;
};

const I18nContext = createContext<I18nContextType>({
  locale: "es",
  messages: null,
  setLocale: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = useState<Locale>("es");
  const [messages, setMessages] = useState<Messages | null>(null);

  useEffect(() => {
    getDictionary(locale).then(setMessages);
  }, [locale]);

  useEffect(() => {
    const saved = localStorage.getItem("locale") as Locale | null;
    if (saved) setLocale(saved);
  }, []);

  useEffect(() => {
    localStorage.setItem("locale", locale);
  }, [locale]);

  return (
    <I18nContext.Provider value={{ locale, messages, setLocale }}>
      {messages ? children : <p>Cargando...</p>}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
