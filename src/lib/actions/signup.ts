"use server";
import { createUser } from "@/lib/api/createUser";
import { revalidatePath } from "next/cache";
import { SignupInterface } from "@/interfaces/signup.interface";
import {
  AuthFormState,
  ConfirmFormState,
} from "@/interfaces/authResponse.interface";
import { cookies } from "next/headers";
import { ENDPOINTS } from "../endpoints";

export async function signup(
  _prevState: AuthFormState,
  formData: FormData,
  locale: "ka" | "en" = "ka"
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

  const res = await createUser(body, locale);

  if (!res.success) {
    const fieldErrors: Record<string, string> = {};
    for (const key in res.fieldErrors) {
      fieldErrors[key] = Array.isArray(res.fieldErrors[key])
        ? res.fieldErrors[key][0]
        : res.fieldErrors[key];
    }

    return {
      success: false,
      message: res.message,
      fieldErrors,
      values: body,
    };
  }

  revalidatePath("/profile", "page");

  return {
    success: true,
    message: res.message,
    fieldErrors: {},
    values: body,
  };
}

export async function confirm(
  _prevState: ConfirmFormState,
  locale: "ka" | "en" = "ka",
  token: string,
  setCookie = true
) {
  try {
    const res = await fetch(ENDPOINTS.auth.confirm, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": locale,
      },
      body: JSON.stringify({ token }),
    });

    const body = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: body.error || body.message || "Request failed",
        errors: body.errors || {},
      };
    }

    if (setCookie && body.token) {
      const cookieStore = await cookies();
      cookieStore.set("token", body.token, {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "strict",
      });
    }

    return {
      success: true,
      message: body.message,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : String(error),
    };
  }
}
