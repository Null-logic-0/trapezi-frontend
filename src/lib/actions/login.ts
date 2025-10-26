"use server"

import {AuthFormState, CreateUserResponse} from "@/interfaces/authResponse.interface";
import {LoginInterface} from "@/interfaces/login.interface";
import {createSession} from "@/lib/api/createSession";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

export async function login(_prevState: AuthFormState, formData: FormData): Promise<AuthFormState> {
    const body: LoginInterface = {
        email: (formData.get("email") as string) || "",
        password: (formData.get("password") as string) || "",
    }

    const res: CreateUserResponse = await createSession(body);

    if (!res.success) {
        return {
            success: false,
            message: res.message || "Login failed",
            values: body
        };
    }


    revalidatePath("/", "layout");
    redirect("/");


}

