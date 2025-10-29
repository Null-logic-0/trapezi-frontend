"use client";

import { useActionState } from "react";
import Button from "../UI/Button";
import Input from "../UI/Input";
import { updatePassword } from "@/lib/actions/updatePassword";

import ProfileHeading from "./ProfileHeading";
import { useActionToast } from "@/hooks/useActionToast";

function UpdatePassword() {
  const [state, formAction, isPending] = useActionState(updatePassword, {
    message: "",
    success: false,
  });

  useActionToast(state, "/login");

  return (
    <div className="profile-card-container">
      <ProfileHeading title="Update Password" />
      <form action={formAction} className="flex mt-4 flex-col gap-4">
        <Input isPassword label="Current Password" name="current_password" />
        <Input isPassword label="New Password" name="password" />
        <Input
          isPassword
          label="Confirm Password"
          name="password_confirmation"
        />

        <Button isPending={isPending} isDisabled={isPending} type="submit">
          Update password
        </Button>
      </form>
    </div>
  );
}

export default UpdatePassword;
