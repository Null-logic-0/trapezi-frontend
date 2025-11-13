"use client";

import { COOKIES } from "@/helpers/cookies";
import { PRIVACY } from "@/helpers/privacy";
import { useMessages } from "@/hooks/useMessages";
import { useLanguage } from "@/store/language-context";

function Privacy() {
  const { locale } = useLanguage();
  const messages = useMessages();
  return (
    <div className="min-h-screen">
      <main className="container mx-auto px-4 py-24 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8 ">{messages.privacy}</h1>

        <div className="prose prose-lg max-w-none space-y-6 ">
          {PRIVACY.map((privacy, index) => (
            <section key={index}>
              <h2 className="text-2xl font-semibold mb-4 ">
                {privacy.title[locale]}
              </h2>
              <p className="text-[#666666]">{privacy.text[locale]}</p>
            </section>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Privacy;
