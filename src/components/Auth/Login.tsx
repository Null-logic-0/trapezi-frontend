"use client";

import { useActionState } from "react";
import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";

import { MdEmail } from "react-icons/md";
import { login } from "@/lib/actions/login";
import { TbLockFilled } from "react-icons/tb";
import { useActionToast } from "@/hooks/useActionToast";

function Login() {
  const [state, formAction, isPending] = useActionState(login, {
    message: "",
    success: false,
    values: {
      email: "",
    },
  });

  useActionToast(state, "/profile");

  return (
    <form action={formAction} className="flex flex-col gap-4 w-full">
      <Input
        type="email"
        name="email"
        defaultValue={state.values?.email}
        placeholder="your@email.com"
        label="Email"
        icon={<MdEmail className="text-gray-500 text-xl" />}
      />

      <Input
        type="password"
        name="password"
        placeholder="*************"
        label="Password"
        isPassword={true}
        icon={<TbLockFilled className="text-gray-500 text-xl" />}
      />

      <Button
        type="submit"
        isPending={isPending}
        isDisabled={isPending}
        className="mt-2"
      >
        {isPending ? "Logging..." : "Login"}
      </Button>
    </form>
  );
}

export default Login;
