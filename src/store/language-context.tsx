"use client";

import { createContext, use, useState, useEffect, ReactNode } from "react";

type Language = "ka" | "en";

interface LanguageContextType {
  locale: Language;
  toggleLanguage: () => void;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [locale, setLocale] = useState<Language>("ka");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("locale") as Language | null;
    if (saved === "ka" || saved === "en") {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLocale(saved);
    }
    setMounted(true);
  }, []);

  const toggleLanguage = () => {
    const newLang = locale === "ka" ? "en" : "ka";
    setLocale(newLang);
    localStorage.setItem("locale", newLang);
  };

  const setLanguage = (lang: Language) => {
    setLocale(lang);
    localStorage.setItem("locale", lang);
  };

  if (!mounted) return null;

  return (
    <LanguageContext value={{ locale, toggleLanguage, setLanguage }}>
      {children}
    </LanguageContext>
  );
};

export const useLanguage = () => {
  const context = use(LanguageContext);
  if (!context)
    throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
};
