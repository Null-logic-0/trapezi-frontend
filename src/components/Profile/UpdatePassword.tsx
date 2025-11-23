"use client";

import { useActionState } from "react";
import Button from "../UI/Button";
import Input from "../UI/Input";
import { updatePassword } from "@/lib/actions/updatePassword";

import ProfileHeading from "./ProfileHeading";

import { useMessages } from "@/hooks/useMessages";
import { useLanguage } from "@/store/language-context";
import { ProfileFormState } from "@/interfaces/user.interface";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function UpdatePassword() {
  const { locale } = useLanguage();
  const messages = useMessages();
  const router = useRouter();
  const handleAction = async (
    prevState: ProfileFormState,
    formData: FormData
  ) => {
    const result = await updatePassword(prevState, formData, locale);
    if (result.success) {
      toast.success(messages.password_update_success);
      router.push("/login");
    } else {
      toast.error(messages.login_error);
    }

    return result;
  };
  const [state, formAction, isPending] = useActionState(handleAction, {
    message: "",
    success: false,
    values: {
      current_password: "",
      password: "",
      password_confirmation: "",
    },
  });

  return (
    <div className="profile-card-container">
      <ProfileHeading title="Update Password" />
      <form action={formAction} className="flex mt-4 flex-col gap-4">
        <Input
          isPassword
          label={messages.password_confirmation}
          name="current_password"
          error={state.fieldErrors?.current_password}
        />
        <Input
          isPassword
          label={messages.password}
          name="password"
          error={state.fieldErrors?.password}
        />
        <Input
          isPassword
          label={messages.password_confirmation}
          name="password_confirmation"
          error={state.fieldErrors?.password_confirmation}
        />

        <Button isPending={isPending} isDisabled={isPending} type="submit">
          {isPending ? messages.updating : messages.update_password}
        </Button>
      </form>
    </div>
  );
}

export default UpdatePassword;
