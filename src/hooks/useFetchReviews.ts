"use client";

import { Reviews } from "@/interfaces/reviews.interface";
import { fetchReviews } from "@/lib/api/fetchReviews";
import { useEffect, useRef, useState } from "react";

export function useFetchReviews(id: number, pageSize = 4) {
  const [reviews, setReviews] = useState<Reviews[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const loadingRef = useRef(false);

  const loadReviews = async (page: number) => {
    if (loadingRef.current || !hasMore) return;

    loadingRef.current = true;
    setLoading(true);
    try {
      setLoading(true);
      const data = await fetchReviews(id, page, pageSize);
      if (data.length < pageSize) setHasMore(false);
      setReviews((prev) => {
        const ids = new Set(prev.map((r) => r.id));
        const unique = data.filter((r) => !ids.has(r.id));
        return [...prev, ...unique];
      });
    } catch (err) {
      console.error(err);
      setError("Failed to load reviews. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, id]);

  const fetchNextPage = () => {
    if (!loading && hasMore) setPage((prev) => prev + 1);
  };

  const removeReview = (reviewId?: number) => {
    setReviews((prev) => prev.filter((r) => r.id !== reviewId));
  };

  const upsertReview = (newReview: Reviews) => {
    setReviews((prev) => {
      const exists = prev.some((r) => r.id === newReview.id);
      if (exists) {
        return prev.map((r) =>
          r.id === newReview.id
            ? {
                ...r,
                ...newReview,
                user: newReview.user ? newReview.user : r.user,
              }
            : r
        );
      } else {
        return [newReview, ...prev];
      }
    });
  };

  return {
    reviews,
    loading,
    error,
    hasMore,
    fetchNextPage,
    upsertReview,
    removeReview,
  };
}
