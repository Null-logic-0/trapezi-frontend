"use client";
import Button from "../UI/Button";
import ReviewForm from "./ReviewForm";
import { AnimatePresence, motion } from "framer-motion";
import { useMessages } from "@/hooks/useMessages";
import { useUIContext } from "@/store/ui-context";
import { Reviews } from "@/interfaces/reviews.interface";

type ReviewProps = {
  placeId: number;
  review?: Reviews;
  onSuccess?: (review: Reviews) => void;
};

function CreateReview({ placeId, review, onSuccess }: ReviewProps) {
  const { handleToggleReviewForm, writeReview } = useUIContext();
  const messages = useMessages();

  return (
    <div className="w-full ">
      <AnimatePresence>
        {writeReview && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            <ReviewForm
              placeId={placeId}
              review={review}
              onSuccess={onSuccess}
            />
          </motion.div>
        )}
      </AnimatePresence>
      <Button
        onClick={handleToggleReviewForm}
        className="w-full shadow-md mt-6"
        buttonType="outline"
      >
        {writeReview ? messages.cancel : messages.write_review}
      </Button>
    </div>
  );
}

export default CreateReview;
