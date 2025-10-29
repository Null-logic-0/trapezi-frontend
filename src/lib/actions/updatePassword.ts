"use server";
import { ProfileFormState } from "@/interfaces/user.interface";
import { patchUserPassword } from "../api/patchUserPassword";
import { revalidatePath } from "next/cache";
import { logout } from "./logout";

export async function updatePassword(
  _prevState: ProfileFormState,
  formData: FormData
) {
  const current_password = formData.get("current_password") as string;
  const password = formData.get("password") as string;
  const password_confirmation = formData.get("password_confirmation") as string;

  const res = await patchUserPassword({
    current_password,
    password,
    password_confirmation,
  });

  console.log("🔍 patchUserPassword response:", res);

  if (!res.success) {
    return { success: false, message: res.message };
  }

  await logout();
  revalidatePath("/settings", "page");
  revalidatePath("/login", "page");

  return { success: true, message: "Password updated!" };
}
