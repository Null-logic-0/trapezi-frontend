"use client";

import kaMessages from "../messages/ka.json";
import enMessages from "../messages/en.json";
import { useLanguage } from "@/store/language-context";

export const useMessages = () => {
  const { locale } = useLanguage();

  const messages = locale === "ka" ? kaMessages : enMessages;

  return messages;
};
