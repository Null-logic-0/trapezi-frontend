"use client";
import { useMessages } from "@/hooks/useMessages";
import Button from "../UI/Button";
import { useActionState } from "react";
import toast from "react-hot-toast";
import { confirm } from "@/lib/actions/signup";
import { useRouter } from "next/navigation";
import { useLanguage } from "@/store/language-context";
import { ConfirmFormState } from "@/interfaces/authResponse.interface";

function ConfirmRegistrationButton({ token }: { token: string }) {
  const messages = useMessages();
  const router = useRouter();
  const { locale } = useLanguage();

  const handleAction = async (
    prevState: ConfirmFormState,
    formData: FormData
  ) => {
    formData.set("token", token);
    const result = await confirm(prevState, locale, token);

    if (result.success) {
      toast.success(result.message);
      router.push("/profile");
    } else {
      toast.error(result.message);
    }

    return result;
  };
  const [_state, formAction, isPending] = useActionState(handleAction, {
    message: "",
    success: false,
  });
  return (
    <form action={formAction}>
      <Button
        type="submit"
        isPending={isPending}
        isDisabled={isPending}
        className="w-[350px] mx-auto mt-4  mb-2"
      >
        {messages.confirm_email}
      </Button>
    </form>
  );
}

export default ConfirmRegistrationButton;
