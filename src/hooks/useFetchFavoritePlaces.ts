"use client";

import { BusinessInterface } from "@/interfaces/places.interface";
import { fetchFavoritePlaces } from "@/lib/api/fetchFavoritePlaces";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";
import { Places } from "@/types/places.types";

export function useFetchFavoritePlaces() {
  const searchParams = useSearchParams();
  const [places, setPlaces] = useState<BusinessInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [paginate, setPaginate] = useState<Places["pagination"] | null>(null);
  const [page, setPage] = useState(1);
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const categories = searchParams?.get("categories") || undefined;
        const search = debouncedSearchTerm || undefined;

        const { places, pagination } = await fetchFavoritePlaces({
          categories,
          search,
          page,
          per_page: 10,
        });
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
  }, [debouncedSearchTerm, page, searchParams]);

  return {
    places,
    loading,
    error,
    setPage,
    paginate,
    setSearchTerm,
  };
}
