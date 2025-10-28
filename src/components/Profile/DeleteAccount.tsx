"use client";

import { useUIContext } from "@/store/ui-context";
import Button from "../UI/Button";
import Modal from "../UI/Modal";

function DeleteAccount() {
  const { handleToggleModal } = useUIContext();
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
        <form>
          <h1 className="text-2xl text-center font-bold">Delete Account</h1>
          <p className="text-sm text-center mt-2 font-semibold text-gray-400">
            Once deleted, this can’t be undone. Still want to proceed?
          </p>

          <div className="flex mt-6 justify-center items-center gap-4">
            <Button
              onClick={handleToggleModal}
              type="button"
              buttonType="outline"
            >
              Cancel
            </Button>
            <Button type="submit" buttonType="fill">
              Delete
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default DeleteAccount;
