"use client";

import { useFetchReviews } from "@/hooks/useFetchReviews";
import { useMessages } from "@/hooks/useMessages";
import { useRef, useState } from "react";
import DeleteReview from "./DeleteReview";
import CreateReview from "./CreateReview";
import { Reviews as ReviewsInterface } from "@/interfaces/reviews.interface";
import ReviewsList from "./ReviewsList";

function Reviews({ id }: { id: number }) {
  const messages = useMessages();

  const {
    reviews,
    loading,
    error,
    hasMore,
    fetchNextPage,
    upsertReview,
    removeReview,
  } = useFetchReviews(id);

  const observer = useRef<IntersectionObserver | null>(null);
  const [selectedReview, setSelectedReview] = useState<
    ReviewsInterface | undefined
  >();
  const [selectedReviewId, setSelectedReviewId] = useState<
    number | undefined
  >();

  const lastReviewCallback = (node: HTMLDivElement | null) => {
    if (loading) return;

    if (observer.current) observer.current.disconnect();

    if (node && hasMore) {
      observer.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) fetchNextPage();
      });
      observer.current.observe(node);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">{messages.reviews}</h2>

      <ReviewsList
        loading={loading}
        error={error || false}
        reviews={reviews}
        setSelectedReview={setSelectedReview}
        lastReviewCallback={lastReviewCallback}
        setSelectedReviewId={setSelectedReviewId}
      />

      <DeleteReview
        placeId={id}
        reviewId={selectedReviewId}
        onDeleted={() => removeReview(selectedReviewId)}
      />
      <CreateReview
        placeId={id}
        review={selectedReview}
        onSuccess={(newReview) => upsertReview(newReview)}
      />
    </>
  );
}

export default Reviews;
