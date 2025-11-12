"use client";

import { BusinessInterface } from "@/interfaces/places.interface";
import { fetchMyPlaces } from "@/lib/api/fetchMyPlaces";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";
import { Places } from "@/types/places.types";

export function useFetchMyPlaces() {
  const searchParams = useSearchParams();
  const [places, setPlaces] = useState<BusinessInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [paginate, setPaginate] = useState<Places["pagination"] | null>(null);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const categories = searchParams?.get("categories") || undefined;
        const search = debouncedSearchTerm || undefined;
        const { places, pagination } = await fetchMyPlaces({
          categories,
          search,
          page,
          per_page: 10,
        });
        setPlaces(places);
        setPlaces(places);
        setPaginate(pagination);
      } catch (err) {
        console.error(err);
        setError("Failed to load businesses. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [searchParams, debouncedSearchTerm, page]);

  const removeBusiness = (id?: number) => {
    if (!id) return;
    setPlaces((prev) => prev.filter((b) => b.id !== id));
  };

  return {
    places,
    loading,
    error,
    removeBusiness,
    setSearchTerm,
    setPage,
    paginate,
  };
}
