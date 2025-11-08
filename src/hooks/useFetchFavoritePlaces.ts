"use client";

import { BusinessInterface } from "@/interfaces/places.interface";
import { fetchFavoritePlaces } from "@/lib/api/fetchFavoritePlaces";
import { useEffect, useState } from "react";

export function useFetchFavoritePlaces() {
  const [businesses, setBusinesses] = useState<BusinessInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchFavoritePlaces();
        setBusinesses(data);
      } catch (err) {
        console.error(err);
        setError("Failed to load businesses. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return {
    businesses,
    loading,
    error,
  };
}
