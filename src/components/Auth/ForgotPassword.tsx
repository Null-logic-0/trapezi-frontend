"use client";

import Button from "../UI/Button";
import Input from "../UI/Input";
import { MdEmail } from "react-icons/md";
import Navigation from "../UI/navigation";
import { useMessages } from "@/hooks/useMessages";
import { useLanguage } from "@/store/language-context";
import { ResetPasswordRequestState } from "@/interfaces/authResponse.interface";
import { restPasswordRequestAction } from "@/lib/actions/restPasswordAction";
import { useActionState } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function ForgotPassword() {
  const messages = useMessages();
  const router = useRouter();
  const { locale } = useLanguage();
  const handleAction = async (
    prevState: ResetPasswordRequestState,
    formData: FormData
  ) => {
    const result = await restPasswordRequestAction(prevState, formData, locale);

    if (result.success) {
      toast.success(result.message);
      router.push("/forgot-password/success");
    } else {
      toast.error(result.message);
    }

    return result;
  };
  const [state, formAction, isPending] = useActionState(handleAction, {
    message: "",
    success: false,
    values: {
      email: "",
    },
    fieldErrors: {},
  });
  return (
    <form
      action={formAction}
      className="bg-[#ffffff] flex flex-col gap-4 border-3
            border-[#e5e5e5] rounded-xl p-4 max-w-lg w-full "
    >
      <h2 className="text-xl font-bold">{messages.forgot_password_title}</h2>
      <p className="text-sm text-[#6b6b6b]">
        {messages.forgot_password_subtitle}
      </p>

      <Input
        label={messages.email}
        type="email"
        name="email"
        defaultValue={state.values?.email}
        placeholder="your@email.com"
        icon={<MdEmail className="text-gray-500 text-xl" />}
      />
      <Button
        type="submit"
        isDisabled={isPending}
        isPending={isPending}
        className="text-sm "
      >
        {messages.send}
      </Button>

      <Navigation path="/login">{messages.back}</Navigation>
    </form>
  );
}

export default ForgotPassword;
