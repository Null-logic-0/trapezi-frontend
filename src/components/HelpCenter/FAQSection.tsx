"use client";
import { useMessages } from "@/hooks/useMessages";
import { Accordion, AccordionItem } from "../UI/Accordion";
import { FAQs } from "@/helpers/faqs";
import { useLanguage } from "@/store/language-context";

function FAQSection() {
  const messages = useMessages();
  const { locale } = useLanguage();
  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">{messages.faqs_title}</h2>
          <p className="text-lg text-[#666666]">{messages.faqs_subtitle}</p>
        </div>

        <Accordion className="w-full space-y-4">
          {FAQs.map((faq, index) => (
            <AccordionItem
              key={index}
              title={faq.question[locale]}
              className="bg-[#ffffff] border border-[#e5e5e5] rounded-lg px-6 shadow-sm"
            >
              <p className="text-[#666666]">{faq.answer[locale]}</p>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

export default FAQSection;
