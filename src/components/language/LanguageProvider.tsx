"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { getDictionary, type Messages, type Locale } from "@/lib/i18n";
import { I18nContextType } from "@/types/i18n";

// --- Configuration & helpers -------------------------------------------------
const DEFAULT_LOCALE: Locale = "en";

function isValidLocale(value: unknown): value is Locale {
  return value === "en" || value === "es"; // extend as you add locales
}

function readSavedLocale(): Locale {
  if (typeof window === "undefined") return DEFAULT_LOCALE;
  try {
    const saved = localStorage.getItem("locale");
    if (saved && isValidLocale(saved)) return saved;
  } catch {
    // ignore storage access errors and fall back to default
  }
  return DEFAULT_LOCALE;
}

// --- Context -----------------------------------------------------------------

const I18nContext = createContext<I18nContextType>({
  locale: DEFAULT_LOCALE,
  messages: null,
  setLocale: () => {},
});

// --- Provider ----------------------------------------------------------------

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  // Initialize locale from localStorage synchronously to avoid a flash
  const [locale, setLocale] = useState<Locale>(() => readSavedLocale());
  const [messages, setMessages] = useState<Messages | null>(null);

  // Load messages whenever the locale changes
  useEffect(() => {
    let cancelled = false;
    setMessages(null);
    getDictionary(locale)
      .then((dict) => {
        if (!cancelled) setMessages(dict);
      })
      .catch(() => {
        // If loading fails, keep messages null so the fallback renders
      });
    return () => {
      cancelled = true;
    };
  }, [locale]);

  // Persist locale changes
  useEffect(() => {
    try {
      localStorage.setItem("locale", locale);
    } catch {
      // ignore storage write errors
    }
  }, [locale]);

  return (
    <I18nContext.Provider value={{ locale, messages, setLocale }}>
      {messages ? children : null}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
