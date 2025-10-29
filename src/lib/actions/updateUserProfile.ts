"use server";
import { ProfileFormState } from "@/interfaces/user.interface";
import { patchUserProfile } from "../api/patchUserProfile";
import { revalidatePath } from "next/cache";

export async function updateProfile(
  _prevState: ProfileFormState,
  formData: FormData
) {
  const name = formData.get("name") as string;
  const last_name = formData.get("last_name") as string;
  const avatar = formData.get("avatar") as File;
  const hasImage = avatar && avatar.size > 0;

  const res = await patchUserProfile({
    name,
    last_name,
    ...(hasImage && { avatar }),
  });

  if (!res.success) {
    return { success: false, message: res.message };
  }

  revalidatePath("/profile", "layout");

  return { success: true, message: "Profile updated!" };
}
