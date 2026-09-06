"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Dictionary, Direction, LanguageMeta, Locale } from "./types";
import { LANGUAGES } from "./types";
import { fr } from "./dictionaries/fr";
import { en } from "./dictionaries/en";
import { es } from "./dictionaries/es";
import { ar } from "./dictionaries/ar";

const DICTIONARIES: Record<Locale, Dictionary> = {
  fr,
  en,
  es,
  ar,
};

interface I18nContextType {
  locale: Locale;
  setLocale: (nextLocale: Locale) => void;
  dir: Direction;
  isRTL: boolean;
  dict: Dictionary;
  t: (path: string) => string;
  languages: LanguageMeta[];
  currentLanguage: LanguageMeta;
}

const I18nContext = createContext<I18nContextType | null>(null);

const STORAGE_KEY = "inclass_locale";
const COOKIE_NAME = "NEXT_LOCALE";

export function I18nProvider({
  children,
  defaultLocale = "fr",
}: {
  children: ReactNode;
  defaultLocale?: Locale;
}) {
  const [locale, setLocaleState] = useState<Locale>(defaultLocale);
  const [mounted, setMounted] = useState(false);

  const applyLocaleToDOM = (loc: Locale) => {
    const isArabic = loc === "ar";
    const dir: Direction = isArabic ? "rtl" : "ltr";
    document.documentElement.lang = loc;
    document.documentElement.dir = dir;
    if (isArabic) {
      document.documentElement.classList.add("rtl");
    } else {
      document.documentElement.classList.remove("rtl");
    }
  };

  // Initialize from localStorage or cookie on mount
  useEffect(() => {
    /* eslint-disable react-hooks/set-state-in-effect -- Hydration-safe locale init from storage */
    setMounted(true);
    try {
      const stored = localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (stored && (stored === "fr" || stored === "en" || stored === "es" || stored === "ar")) {
        setLocaleState(stored);
        applyLocaleToDOM(stored);
        return;
      }
      // Check navigator language
      const navLang = navigator.language.slice(0, 2).toLowerCase();
      if (navLang === "ar" || navLang === "en" || navLang === "es") {
        setLocaleState(navLang as Locale);
        applyLocaleToDOM(navLang as Locale);
      } else {
        applyLocaleToDOM(defaultLocale);
      }
    } catch {
      applyLocaleToDOM(defaultLocale);
    }
    /* eslint-enable react-hooks/set-state-in-effect */
  }, [defaultLocale]);

  const setLocale = useCallback((nextLocale: Locale) => {
    setLocaleState(nextLocale);
    try {
      localStorage.setItem(STORAGE_KEY, nextLocale);
      document.cookie = `${COOKIE_NAME}=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {}
    applyLocaleToDOM(nextLocale);
  }, []);

  const currentDict = DICTIONARIES[locale] ?? DICTIONARIES.fr;
  const isRTL = locale === "ar";
  const dir: Direction = isRTL ? "rtl" : "ltr";
  const currentLanguage = LANGUAGES.find((l) => l.code === locale) ?? LANGUAGES[0];

  const t = useCallback(
    (path: string): string => {
      const parts = path.split(".");
      let current: any = currentDict;
      for (const part of parts) {
        if (current && typeof current === "object" && part in current) {
          current = current[part];
        } else {
          // Fallback to French if key is missing in target language
          let fallback: any = DICTIONARIES.fr;
          for (const fbPart of parts) {
            if (fallback && typeof fallback === "object" && fbPart in fallback) {
              fallback = fallback[fbPart];
            } else {
              return path;
            }
          }
          return typeof fallback === "string" ? fallback : path;
        }
      }
      return typeof current === "string" ? current : path;
    },
    [currentDict]
  );

  return (
    <I18nContext.Provider
      value={{
        locale,
        setLocale,
        dir,
        isRTL,
        dict: currentDict,
        t,
        languages: LANGUAGES,
        currentLanguage,
      }}
    >
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    // Return fallback context if used outside provider (e.g. static preview)
    const fallbackDict = DICTIONARIES.fr;
    return {
      locale: "fr" as Locale,
      setLocale: () => {},
      dir: "ltr" as Direction,
      isRTL: false,
      dict: fallbackDict,
      t: (path: string) => path,
      languages: LANGUAGES,
      currentLanguage: LANGUAGES[0],
    };
  }
  return context;
}
