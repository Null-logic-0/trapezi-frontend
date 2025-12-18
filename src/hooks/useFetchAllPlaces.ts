"use client";

import { BusinessInterface } from "@/interfaces/places.interface";
import { fetchAllPlaces } from "@/lib/api/fetchAllPlaces";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "./useDebounce";
import { Places } from "@/types/places.types";

export function useFetchAllPlaces() {
  const searchParams = useSearchParams();
  const [places, setPlaces] = useState<BusinessInterface[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const queryFromURL = searchParams.get("search") || "";

  const [paginate, setPaginate] = useState<Places["pagination"] | null>(null);
  const [page, setPage] = useState(1);

  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const categories = searchParams?.get("categories") || undefined;
        const effectiveSearch =
          debouncedSearchTerm.trim() || queryFromURL.trim() || undefined;
        const { places, pagination } = await fetchAllPlaces({
          categories,
          search: effectiveSearch,
          page,
          per_page: 10,
        });
        setPlaces(places);
        setPaginate(pagination);
      } catch (err) {
        console.error(err);
        setError("Failed to load places. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [searchParams, debouncedSearchTerm, page, queryFromURL]);

  return {
    places,
    paginate,
    loading,
    error,
    setPage,
    setSearchTerm,
  };
}
