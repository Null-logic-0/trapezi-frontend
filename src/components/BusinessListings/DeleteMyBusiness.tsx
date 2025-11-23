"use client";

import { useUIContext } from "@/store/ui-context";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import { useState } from "react";
import toast from "react-hot-toast";
import { useMessages } from "@/hooks/useMessages";
import { deleteBusiness } from "@/lib/actions/deleteBusiness";

function DeleteMyBusiness({
  id,
  onDeleted,
}: {
  id?: number;
  onDeleted?: () => void;
}) {
  const { handleToggleModal } = useUIContext();

  const [pending, setPending] = useState(false);

  const message = useMessages();

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);

    try {
      const result = await deleteBusiness(id);
      if (result.success) {
        toast.success(message.business_deletion);
        handleToggleModal();
        if (onDeleted) onDeleted();
      }
    } catch (err) {
      console.error(err);
      toast.error(message.error_message);
    } finally {
      setPending(false);
    }
  };
  return (
    <Modal>
      <form onSubmit={handleDelete}>
        <h2 className="text-xl text-center font-bold">
          {message.delete_caution}
        </h2>

        <div className="flex mt-6 justify-center items-center gap-4">
          <Button
            onClick={handleToggleModal}
            type="button"
            buttonType="outline"
          >
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

export default DeleteMyBusiness;
