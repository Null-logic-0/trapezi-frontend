"use client";

import { useMessages } from "@/hooks/useMessages";
import Modal from "../UI/Modal";
import { useState } from "react";
import { useUIContext } from "@/store/ui-context";
import toast from "react-hot-toast";
import Button from "../UI/Button";
import { destroyReview } from "@/lib/api/destroyReview";

type Props = {
  placeId?: number;
  reviewId?: number;
  onDeleted?: () => void;
};

function DeleteReview({ placeId, reviewId, onDeleted }: Props) {
  const { handleCloseModal } = useUIContext();

  const [pending, setPending] = useState(false);

  const message = useMessages();

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewId || !placeId) {
      toast.error(message.error_message);
      return;
    }

    setPending(true);
    try {
      await destroyReview(placeId, reviewId);
      handleCloseModal();
      onDeleted?.();
    } catch (err) {
      console.error(err);
      toast.error(message.error_message);
    } finally {
      setPending(false);
    }
  };

  return (
    <Modal modalId={"delete-review"}>
      <form onSubmit={handleDelete}>
        <h2 className="text-xl text-center font-bold">
          {message.delete_caution}
        </h2>

        <div className="flex mt-6 justify-center items-center gap-4">
          <Button onClick={handleCloseModal} type="button" buttonType="outline">
            {message.cancel}
          </Button>
          <Button
            type="submit"
            isDisabled={pending}
            isPending={pending}
            buttonType="fill"
          >
            {pending ? message.deleting : message.delete}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default DeleteReview;
