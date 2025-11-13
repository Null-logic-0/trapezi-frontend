"use client";
import { TERMS } from "@/helpers/terms";
import { useMessages } from "@/hooks/useMessages";
import { useLanguage } from "@/store/language-context";

function TermsOfService() {
  const { locale } = useLanguage();
  const messages = useMessages();
  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-24 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 ">{messages.terms}</h1>

        <div className="prose prose-lg max-w-none space-y-6 ">
          {TERMS.map((term, index) => (
            <section key={index}>
              <h2 className="text-2xl font-semibold mb-4 ">
                {term.title[locale]}
              </h2>
              <p className="text-[#666666]">{term.text[locale]}</p>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}

export default TermsOfService;
