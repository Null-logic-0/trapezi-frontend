"use server";

import {
  ResetPasswordRequestState,
  ResetPasswordState,
} from "@/interfaces/authResponse.interface";
import { resetPassword, resetPasswordRequest } from "../api/resetPassword";
import { revalidatePath } from "next/cache";

export async function restPasswordRequestAction(
  _prevState: ResetPasswordRequestState,
  formData: FormData,
  locale: "ka" | "en" = "ka"
) {
  const email = (formData.get("email") as string) || "";

  return await resetPasswordRequest(email, locale);
}

export async function resetPasswordAction(
  _prevState: ResetPasswordState,
  formData: FormData,
  locale: "ka" | "en" = "ka"
) {
  const password = (formData.get("password") as string) || "";
  const password_confirmation =
    (formData.get("password_confirmation") as string) || "";
  const token = formData.get("token") as string;

  const res = await resetPassword(
    password,
    password_confirmation,
    locale,
    token
  );

  if (!res.success) {
    return {
      success: false,
      message: res.message,
      fieldErrors: res.fieldErrors ?? {},
      values: { password, password_confirmation },
    };
  }

  revalidatePath("/login", "page");
  return {
    success: true,
    message: res.message,
    fieldErrors: {},
    values: { password, password_confirmation },
  };
}
