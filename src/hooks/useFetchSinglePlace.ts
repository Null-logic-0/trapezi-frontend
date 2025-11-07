"use client";

import { BusinessInterface } from "@/interfaces/places.interface";
import { fetchSinglePlace } from "@/lib/api/fetchSinglePlace";
import { useLanguage } from "@/store/language-context";
import { useEffect, useState } from "react";

export function useFetchSinglePlace(id: number) {
  const [business, setBusiness] = useState<BusinessInterface | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { locale } = useLanguage();

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchSinglePlace(Number(id), locale);
        setBusiness(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load Place. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [id, locale]);

  return {
    business,
    loading,
    error,
  };
}
