"use client";

import Button from "../UI/Button";
import Input from "../UI/Input";
import { TbLockFilled } from "react-icons/tb";
import Navigation from "../UI/navigation";
import { useMessages } from "@/hooks/useMessages";
import { useActionState } from "react";
import toast from "react-hot-toast";
import { resetPasswordAction } from "@/lib/actions/restPasswordAction";
import { ResetPasswordState } from "@/interfaces/authResponse.interface";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/store/language-context";

function ResetPassword({ token }: { token: string }) {
  const messages = useMessages();
  const router = useRouter();
  const { locale } = useLanguage();

  const handleAction = async (
    prevState: ResetPasswordState,
    formData: FormData
  ) => {
    formData.set("token", token);
    const result = await resetPasswordAction(prevState, formData, locale);

    if (result.success) {
      toast.success(result.message);
      router.push("/login");
    } else {
      toast.error(result.message);
    }

    return result;
  };
  const [_state, formAction, isPending] = useActionState(handleAction, {
    message: "",
    success: false,
    values: {
      password: "",
      password_confirmation: "",
    },
    fieldErrors: {},
  });

  return (
    <form
      action={formAction}
      className="bg-[#ffffff] flex flex-col gap-4 border-3
            border-[#e5e5e5] rounded-xl p-4 max-w-lg w-full "
    >
      <h2 className="text-xl font-bold">{messages.reset_password}</h2>
      <p className="text-sm text-[#6b6b6b]">{messages.new_password}</p>

      <Input
        type="password"
        name="password"
        placeholder="*************"
        label={messages.password}
        isPassword={true}
        icon={<TbLockFilled className="text-gray-500 text-xl" />}
      />

      <Input
        type="password"
        name="password_confirmation"
        placeholder="*************"
        label={messages.password_confirmation}
        isPassword={true}
        icon={<TbLockFilled className="text-gray-500 text-xl" />}
        className="mb-2"
      />

      <Button
        type="submit"
        className="text-sm "
        isDisabled={isPending}
        isPending={isPending}
      >
        {messages.reset_password}
      </Button>

      <Navigation path="/login">{messages.back}</Navigation>
    </form>
  );
}

export default ResetPassword;
