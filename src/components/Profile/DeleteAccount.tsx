"use client";

import { useUIContext } from "@/store/ui-context";
import Button from "../UI/Button";
import Modal from "../UI/Modal";
import { useState } from "react";
import { deleteAccount } from "@/lib/actions/deleteAccount";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useMessages } from "@/hooks/useMessages";

function DeleteAccount() {
  const router = useRouter();
  const { handleToggleModal } = useUIContext();

  const [pending, setPending] = useState(false);

  const message = useMessages();

  const handleDelete = async (e: React.FormEvent) => {
    e.preventDefault();
    setPending(true);

    try {
      const result = await deleteAccount();
      if (result.success) {
        toast.success("Account deleted successfully");
        handleToggleModal();
        router.push("/login");
      }
    } catch (err) {
      console.error(err);
      toast.error("Account destruction failed");
    } finally {
      setPending(false);
    }
  };
  return (
    <>
      <Button
        onClick={handleToggleModal}
        buttonType="outline"
        className="text-red-500 max-w-[150px]"
      >
        Delete Account
      </Button>

      <Modal>
        <form onSubmit={handleDelete}>
          <h1 className="text-2xl text-center font-bold">
            {message.delete_account}
          </h1>
          <p className="text-sm text-center mt-2 font-semibold text-gray-400">
            {message.delete_caution}
          </p>

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
              {pending ? message.deleting : message.delete_account}
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default DeleteAccount;
