"use client";

import { useActionState } from "react";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";

import { MdEmail } from "react-icons/md";
import { login } from "@/lib/actions/login";
import { TbLockFilled } from "react-icons/tb";
import { useActionToast } from "@/hooks/useActionToast";
import { useMessages } from "@/hooks/useMessages";
import { useLanguage } from "@/store/language-context";
import { AuthFormState } from "@/interfaces/authResponse.interface";
import Link from "next/link";
import Navigation from "../UI/navigation";

function Login() {
  const { locale } = useLanguage();
  const handleAction = async (prevState: AuthFormState, formData: FormData) => {
    return login(prevState, formData, locale);
  };
  const [state, formAction, isPending] = useActionState(handleAction, {
    message: "",
    success: false,
    values: {
      email: "",
    },
  });

  useActionToast(state, "/profile");

  const messages = useMessages();

  return (
    <form action={formAction} className="flex flex-col gap-4 w-full">
      <Input
        type="email"
        name="email"
        defaultValue={state.values?.email}
        placeholder="your@email.com"
        label={messages.email}
        icon={<MdEmail className="text-gray-500 text-xl" />}
      />

      <Input
        type="password"
        name="password"
        placeholder="*************"
        label={messages.password}
        isPassword={true}
        icon={<TbLockFilled className="text-gray-500 text-xl" />}
      />

      <Button
        type="submit"
        isPending={isPending}
        isDisabled={isPending}
        className="mt-2"
      >
        {isPending ? messages.logging : messages.login}
      </Button>
      <Navigation path="/forgot-password">Forgot password?</Navigation>
    </form>
  );
}

export default Login;
