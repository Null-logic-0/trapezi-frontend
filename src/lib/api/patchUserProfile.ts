import { UpdateProfileInterface } from "@/interfaces/user.interface";
import getCookies from "../cookies";
import { ENDPOINTS } from "../endpoints";

export async function patchUserProfile({
  name,
  last_name,
  business_owner,
  avatar,
}: UpdateProfileInterface) {
  try {
    const { token, success } = await getCookies();

    if (!success || !token) return { success: false, message: "No auth token" };

    const formData = new FormData();
    formData.append("name", name);
    formData.append("business_owner", business_owner ? "1" : "0");
    formData.append("last_name", last_name);
    if (avatar && avatar instanceof File && avatar.size > 0) {
      formData.append("avatar", avatar);
    }

    const res = await fetch(ENDPOINTS.user.update_profile, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const body = await res.json();

    return {
      success: body.success ?? res.ok,
      message: body.message ?? "Profile updated",
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : String(error),
    };
  }
}
