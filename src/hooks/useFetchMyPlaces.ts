"use client";

import { MyFoodPlaceInterface } from "@/interfaces/places.interface";
import { fetchMyPlaces } from "@/lib/api/fetchMyPlaces";
import { useEffect, useState } from "react";

export function useFetchMyPlaces() {
  const [businesses, setBusinesses] = useState<MyFoodPlaceInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const data = await fetchMyPlaces();
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

  const removeBusiness = (id?: number) => {
    if (!id) return;
    setBusinesses((prev) => prev.filter((b) => b.id !== id));
  };

  return {
    businesses,
    loading,
    error,
    removeBusiness,
  };
}
