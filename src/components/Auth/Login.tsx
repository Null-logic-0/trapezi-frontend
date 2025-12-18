"use client";

import { useActionState } from "react";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";

import { MdEmail } from "react-icons/md";
import { login } from "@/lib/actions/login";
import { TbLockFilled } from "react-icons/tb";
import { useMessages } from "@/hooks/useMessages";
import { useLanguage } from "@/store/language-context";
import { AuthFormState } from "@/interfaces/authResponse.interface";
import Navigation from "../UI/navigation";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

function Login() {
  const { locale } = useLanguage();
  const messages = useMessages();
  const router = useRouter();

  const handleAction = async (prevState: AuthFormState, formData: FormData) => {
    const result = await login(prevState, formData, locale);

    if (result.success) {
      toast.success(messages.login_success);
      router.push("/profile");
    } else {
      toast.error(messages.login_error);
    }

    return result;
  };
  const [state, formAction, isPending] = useActionState(handleAction, {
    message: "",
    success: false,
    values: {
      email: "",
    },
  });

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
