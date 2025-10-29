"use server";
import { createUser } from "@/lib/api/createUser";
import { revalidatePath } from "next/cache";
import { SignupInterface } from "@/interfaces/signup.interface";
import {
  AuthFormState,
  CreateUserResponse,
} from "@/interfaces/authResponse.interface";

export async function signup(
  _prevState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  const body: SignupInterface = {
    name: (formData.get("name") as string) || "",
    last_name: (formData.get("last_name") as string) || "",
    email: (formData.get("email") as string) || "",
    password: (formData.get("password") as string) || "",
    password_confirmation:
      (formData.get("password_confirmation") as string) || "",
    business_owner:
      (formData.get("business_owner") as string)?.toLowerCase() === "true" ||
      (formData.get("business_owner") as string)?.toLowerCase() === "on" ||
      false,
  };

  const res: CreateUserResponse = await createUser(body);

  if (!res.success) {
    const fieldErrors: Record<string, string> = {};
    if (res.errors) {
      for (const key in res.errors) {
        fieldErrors[key] = Array.isArray(res.errors[key])
          ? res.errors[key][0]
          : res.errors[key];
      }
    }

    return {
      success: false,
      message: res.message || "Signup failed",
      fieldErrors,
      values: body,
    };
  }

  revalidatePath("/profile", "page");

  return {
    success: true,
    message: "Signup successful!",
    values: body,
  };
}
