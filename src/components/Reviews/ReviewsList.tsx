"use client";
import DropdownMenu from "../UI/DropdownMenu";
import Spinner from "../UI/Spinner/Spinner";
import { RiEditFill } from "react-icons/ri";
import { RiDeleteBinLine } from "react-icons/ri";
import { IoMdStar } from "react-icons/io";

import { useUIContext } from "@/store/ui-context";
import { useMessages } from "@/hooks/useMessages";
import { Reviews } from "@/interfaces/reviews.interface";
import { useFetchCurrentUser } from "@/hooks/useFetchCurrentUser";

type Props = {
  loading: boolean;
  error: boolean | string;
  reviews: Reviews[];
  setSelectedReview: (review: Reviews | undefined) => void;
  setSelectedReviewId: (id: number | undefined) => void;
  lastReviewCallback: (node: HTMLDivElement | null) => void;
};

function ReviewsList({
  loading,
  error,
  reviews,
  setSelectedReview,
  setSelectedReviewId,
  lastReviewCallback,
}: Props) {
  const { handleOpenModal, handleToggleReviewForm } = useUIContext();

  const messages = useMessages();

  const { user } = useFetchCurrentUser();

  return (
    <div className="space-y-4 overflow-y-auto h-[350px] py-4 px-2">
      {reviews.map((review, idx) => {
        const isLast = idx === reviews.length - 1;
        const isCreator = user?.id === review.user?.id;
        return (
          <div
            key={`${review.id}-${idx}`}
            ref={isLast ? lastReviewCallback : null}
            className="border-b pb-4 last:border-0"
          >
            <div className="flex items-center justify-between">
              <p className="font-semibold text-[16px]">
                {review?.user?.name} {review?.user?.last_name}
              </p>
              <div className="flex items-center space-x-1 text-sm">
                <IoMdStar className="text-[#ff6633] text-xl" />
                <span className="text-sm font-semibold">{review.rating}</span>
              </div>
            </div>
            <div className="flex relative justify-between items-center">
              <p className="text-[#666666] text-sm">{review.comment}</p>

              {isCreator && (
                <DropdownMenu
                  align="right"
                  buttonStyles="text-xl"
                  items={[
                    {
                      label: (
                        <p className="flex justify-between items-center">
                          {messages.edit}
                          <RiEditFill />
                        </p>
                      ),
                      onClick: () => {
                        handleToggleReviewForm();
                        setSelectedReview({ ...review });
                      },
                    },
                    {
                      label: (
                        <p className="flex text-red-500 justify-between items-center">
                          {messages.delete}
                          <RiDeleteBinLine />
                        </p>
                      ),
                      onClick: () => {
                        handleOpenModal("delete-review");
                        setSelectedReviewId(review.id);
                      },
                    },
                  ]}
                />
              )}
            </div>
          </div>
        );
      })}

      {loading && (
        <div className="flex justify-center items-center">
          <Spinner />
        </div>
      )}

      {!loading && reviews.length === 0 && (
        <p className="text-center text-gray-400 text-lg py-2">
          {messages.no_reviews}
        </p>
      )}

      {error && <p className="text-center text-red-500 py-2">{error}</p>}
    </div>
  );
}

export default ReviewsList;
