"use server";
import {
  PatchUserPasswordResponse,
  ProfileFormState,
  UpdatePasswordInterface,
} from "@/interfaces/user.interface";
import { patchUserPassword } from "../api/patchUserPassword";
import { revalidatePath } from "next/cache";
import { logout } from "./logout";

export async function updatePassword(
  _prevState: ProfileFormState,
  formData: FormData,
  locale: "ka" | "en" = "ka"
) {
  const body: UpdatePasswordInterface = {
    current_password: formData.get("current_password") as string,
    password: formData.get("password") as string,
    password_confirmation: formData.get("password_confirmation") as string,
  };

  const res: PatchUserPasswordResponse = await patchUserPassword(body, locale);

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
      message: res.message || "Update password failed",
      fieldErrors,
      values: body,
    };
  }

  await logout();
  revalidatePath("/settings", "page");
  revalidatePath("/login", "page");

  return { success: true, message: "Password Updated", values: body };
}
