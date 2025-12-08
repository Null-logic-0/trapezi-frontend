"use client";

import { useState } from "react";
import Input from "../UI/Input";
import { LuSend } from "react-icons/lu";
import Button from "../UI/Button";
import { MdStar } from "react-icons/md";
import { useMessages } from "@/hooks/useMessages";
import { CreateReview, Reviews } from "@/interfaces/reviews.interface";
import { useUIContext } from "@/store/ui-context";
import toast from "react-hot-toast";
import { saveReview } from "@/lib/api/saveReview";
import { useLanguage } from "@/store/language-context";

type ReviewFormProps = {
  placeId: number;
  onSuccess?: (review: Reviews) => void;
  review?: Reviews;
};

function ReviewForm({ placeId, review, onSuccess }: ReviewFormProps) {
  const [rating, setRating] = useState(review?.rating || 0);
  const [hover, setHover] = useState(0);
  const [isPending, setIsPending] = useState(false);

  const { locale } = useLanguage();
  const messages = useMessages();

  const { handleToggleReviewForm } = useUIContext();

  const reviewId = review?.id;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!rating) {
      toast.error("Please select a rating.");
      return;
    }

    const formData = new FormData(e.currentTarget);

    const data: CreateReview = {
      comment: formData.get("comment") as string,
      rating: Number(rating),
    };

    setIsPending(true);

    try {
      const savedReview = await saveReview({
        placeId,
        reviewId,
        method: reviewId ? "PATCH" : "POST",
        locale,
        data,
      });
      if ("error" in savedReview) {
        toast.error(savedReview.error);
        if (savedReview.userBlocked) {
          toast.error(messages.user_blocked);
        }
        return;
      }
      handleToggleReviewForm();
      if (onSuccess && savedReview) onSuccess(savedReview);
    } catch (err) {
      console.error(err);
      toast.error(messages.error_message);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex items-center gap-2 pb-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            type="button"
            key={star}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            className={`text-3xl cursor-pointer transition-colors ${
              star <= (hover || rating) ? "text-yellow-400" : "text-gray-300"
            }`}
          >
            <MdStar />
          </button>
        ))}
        <input type="hidden" name="rating" value={rating} />
      </div>

      <div className="relative">
        <Input
          isTextArea
          placeholder={`${messages.write_review}...`}
          name="comment"
          className="h-14"
          defaultValue={review?.comment || ""}
        />

        <Button
          type="submit"
          isDisabled={isPending}
          className="rounded-full text-xl  absolute right-3 top-2  w-10 h-10"
        >
          <LuSend />
        </Button>
      </div>
    </form>
  );
}

export default ReviewForm;
