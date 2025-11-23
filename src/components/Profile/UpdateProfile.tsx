"use client";

import { useUIContext } from "@/store/ui-context";
import Button from "../UI/Button";
import Input from "../UI/Input";
import Modal from "../UI/Modal";
import ImagePicker from "../UI/ImagePicker";
import { useActionState } from "react";
import { updateProfile } from "@/lib/actions/updateUserProfile";
import toast from "react-hot-toast";
import { useMessages } from "@/hooks/useMessages";
import BusinessAccountToggle from "./BusinessAccountToggle";
import { ProfileFormState } from "@/interfaces/user.interface";

type UpdateProfileProps = {
  name: string;
  last_name: string;
  avatar_url: string;
  isBusiness?: boolean;
};

function UpdateProfile({
  name,
  last_name,
  avatar_url,
  isBusiness,
}: UpdateProfileProps) {
  const { handleCloseModal } = useUIContext();
  const messages = useMessages();

  const handleAction = async (
    prevState: ProfileFormState,
    formData: FormData
  ) => {
    const result = await updateProfile(prevState, formData);

    if (result.success) {
      toast.success(messages.profile_success);
      handleCloseModal();
    } else {
      toast.error(messages.error_message);
    }

    return result;
  };
  const [_state, formAction, isPending] = useActionState(handleAction, {
    message: "",
    success: false,
  });

  return (
    <Modal modalId={"update-profile"}>
      <form action={formAction} className="flex flex-col gap-4">
        <ImagePicker
          firstName={name}
          lastName={last_name}
          defaultImage={avatar_url}
          name="avatar"
        />
        <Input
          type="text"
          label={messages.name}
          name="name"
          defaultValue={name}
        />
        <Input
          type="text"
          label={messages.last_name}
          name="last_name"
          defaultValue={last_name}
        />

        <BusinessAccountToggle isBusiness={isBusiness} />

        <div className="flex justify-center mt-6 items-center gap-4">
          <Button
            buttonType="outline"
            isDisabled={isPending}
            type="button"
            onClick={handleCloseModal}
          >
            {messages.cancel}
          </Button>

          <Button
            isPending={isPending}
            isDisabled={isPending}
            buttonType="fill"
            type="submit"
          >
            {isPending ? messages.saving : messages.save}
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default UpdateProfile;
