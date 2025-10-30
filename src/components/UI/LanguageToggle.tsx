"use client";

import { useLanguage } from "@/store/language-context";

function LanguageToggle() {
  const { locale, toggleLanguage } = useLanguage();

  return (
    <button
      onClick={toggleLanguage}
      className="cursor-pointer
       text-[#838383] flex justify-start items-center transition-all gap-2 rounded-xl px-2 py-1
       font-semibold text-[16px] hover:bg-[#ffd466]"
    >
      {locale === "ka" ? "🇬🇧 EN" : "🇬🇪 KA"}
    </button>
  );
}

export default LanguageToggle;
