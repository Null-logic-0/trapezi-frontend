"use client";
import Input from "@/components/UI/Input";
import Checkbox from "@/components/UI/Checkbox";
import Button from "@/components/UI/Button";

import { FaAddressCard, FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { TbLockFilled } from "react-icons/tb";
import { signup } from "@/lib/actions/signup";
import { useActionState } from "react";
import { useActionToast } from "@/hooks/useActionToast";

function Signup() {
  const [state, formAction, isPending] = useActionState(signup, {
    success: false,
    message: "",
    fieldErrors: {},
    values: {
      name: "",
      email: "",
      last_name: "",
    },
  });

  useActionToast(state, "/profile");

  return (
    <form action={formAction} className="flex flex-col gap-4 w-full">
      <Input
        type="text"
        name="name"
        defaultValue={state.values?.name}
        placeholder="John"
        label="Name"
        error={state.fieldErrors?.name}
        icon={<FaUser className="text-gray-500 " />}
      />
      <Input
        type="text"
        name="last_name"
        defaultValue={state.values?.last_name}
        placeholder="Doe"
        label="Last Name"
        error={state.fieldErrors?.last_name}
        icon={<FaAddressCard className="text-gray-500 text-xl" />}
      />
      <Input
        type="email"
        name="email"
        defaultValue={state.values?.email}
        placeholder="your@email.com"
        label="Email"
        error={state.fieldErrors?.email}
        icon={<MdEmail className="text-gray-500 text-xl" />}
      />

      <Input
        type="password"
        name="password"
        placeholder="*************"
        label="Password"
        isPassword={true}
        error={state.fieldErrors?.password}
        icon={<TbLockFilled className="text-gray-500 text-xl" />}
      />

      <Input
        type="password"
        name="password_confirmation"
        placeholder="*************"
        label="Confirm Password"
        isPassword={true}
        error={state.fieldErrors?.password_confirmation}
        icon={<TbLockFilled className="text-gray-500 text-xl" />}
        className="mb-2"
      />

      <Checkbox name="business_owner" label={" Register Business Account"} />

      <Button
        type="submit"
        isPending={isPending}
        isDisabled={isPending}
        className="mt-2"
      >
        {isPending ? "Signing up..." : "Sign up"}
      </Button>
    </form>
  );
}

export default Signup;
