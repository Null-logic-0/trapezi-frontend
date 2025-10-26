'use client'

import Input from "@/components/UI/Input";
import Button from "@/components/UI/Button";

import {MdEmail} from "react-icons/md";
import {TbLockFilled} from "react-icons/tb";
import {useActionState} from "react";
import {login} from "@/lib/actions/login";
import {useRouter} from "next/navigation";

function Login() {
    const router = useRouter();

    const [state, formAction, isPending] = useActionState(login, {
            message: "",
            success: false,
            values: {
                email: "",
            }
        },
    )


    return (
        <form
            action={formAction}
            className="flex flex-col gap-4 w-full">
            <Input
                type="email"
                name="email"
                defaultValue={state.values?.email}
                placeholder="your@email.com"
                label="Email"
                error={state.message}
                icon={<MdEmail className="text-gray-500 text-xl"/>}
            />

            <Input
                type="password"
                name="password"
                placeholder="*************"
                label="Password"
                error={state.message}
                isPassword={true}
                icon={<TbLockFilled className="text-gray-500 text-xl"/>}
            />


            <Button type="submit"
                    isPending={isPending}
                    isDisabled={isPending}
                    className="mt-2">
                Sign Up
            </Button>
        </form>
    );
}

export default Login;
