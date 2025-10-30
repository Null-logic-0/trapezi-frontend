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
import { useMessages } from "@/hooks/useMessages";
import { useLanguage } from "@/store/language-context";
import { AuthFormState } from "@/interfaces/authResponse.interface";

function Signup() {
  const { locale } = useLanguage();
  const handleAction = async (prevState: AuthFormState, formData: FormData) => {
    return signup(prevState, formData, locale);
  };
  const [state, formAction, isPending] = useActionState(handleAction, {
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
  const messages = useMessages();

  return (
    <form action={formAction} className="flex flex-col gap-4 w-full">
      <Input
        type="text"
        name="name"
        defaultValue={state.values?.name}
        placeholder="John"
        label={messages.name}
        error={state.fieldErrors?.name}
        icon={<FaUser className="text-gray-500 " />}
      />
      <Input
        type="text"
        name="last_name"
        defaultValue={state.values?.last_name}
        placeholder="Doe"
        label={messages.last_name}
        error={state.fieldErrors?.last_name}
        icon={<FaAddressCard className="text-gray-500 text-xl" />}
      />
      <Input
        type="email"
        name="email"
        defaultValue={state.values?.email}
        placeholder="your@email.com"
        label={messages.email}
        error={state.fieldErrors?.email}
        icon={<MdEmail className="text-gray-500 text-xl" />}
      />

      <Input
        type="password"
        name="password"
        placeholder="*************"
        label={messages.password}
        isPassword={true}
        error={state.fieldErrors?.password}
        icon={<TbLockFilled className="text-gray-500 text-xl" />}
      />

      <Input
        type="password"
        name="password_confirmation"
        placeholder="*************"
        label={messages.password_confirmation}
        isPassword={true}
        error={state.fieldErrors?.password_confirmation}
        icon={<TbLockFilled className="text-gray-500 text-xl" />}
        className="mb-2"
      />

      <Checkbox name="business_owner" label={messages.business_account} />

      <Button
        type="submit"
        isPending={isPending}
        isDisabled={isPending}
        className="mt-2"
      >
        {isPending ? messages.signing : messages.signup}
      </Button>
    </form>
  );
}

export default Signup;
