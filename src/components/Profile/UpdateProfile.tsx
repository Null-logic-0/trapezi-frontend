"use client";

import { useUIContext } from "@/store/ui-context";
import Button from "../UI/Button";
import Input from "../UI/Input";
import Modal from "../UI/Modal";
import ImagePicker from "../UI/ImagePicker";
import { useActionState, useEffect } from "react";
import { updateProfile } from "@/lib/actions/updateUserProfile";
import toast from "react-hot-toast";

type UpdateProfileProps = {
  name: string;
  last_name: string;
  avatar_url: string;
};

function UpdateProfile({ name, last_name, avatar_url }: UpdateProfileProps) {
  const [state, formAction, isPending] = useActionState(updateProfile, {
    message: "",
    success: false,
  });

  const { handleCloseModal } = useUIContext();

  useEffect(() => {
    if (!state.message) return;

    if (state.success) {
      toast.success(state.message || "Updated successfully!");
      handleCloseModal();
    } else {
      toast.error(state.message || "Something went wrong.");
    }
  }, [state, handleCloseModal]);

  return (
    <Modal>
      <form action={formAction} className="flex flex-col gap-4">
        <ImagePicker
          firstName={name}
          lastName={last_name}
          defaultImage={avatar_url}
          name="avatar"
        />
        <Input type="text" label="Name" name="name" defaultValue={name} />
        <Input
          type="text"
          label="Last Name"
          name="last_name"
          defaultValue={last_name}
        />

        <div className="flex justify-center mt-6 items-center gap-4">
          <Button
            buttonType="outline"
            isDisabled={isPending}
            type="button"
            onClick={handleCloseModal}
          >
            Cancel
          </Button>

          <Button
            isPending={isPending}
            isDisabled={isPending}
            buttonType="fill"
            type="submit"
          >
            Save
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default UpdateProfile;
