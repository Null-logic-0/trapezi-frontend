import {
  PatchUserPasswordResponse,
  UpdatePasswordInterface,
} from "@/interfaces/user.interface";
import getCookies from "../cookies";
import { ENDPOINTS } from "../endpoints";

export async function patchUserPassword(
  data: UpdatePasswordInterface,
  locale: "ka" | "en" = "ka"
) {
  try {
    const { token, success } = await getCookies();

    if (!success || !token) {
      return { success: false, message: "No auth token" };
    }

    const res = await fetch(ENDPOINTS.user.update_password, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": locale,
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const body: PatchUserPasswordResponse = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: body.message || "Request failed",
        errors: body.errors || {},
      };
    }

    return { success: true, data: body };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : String(error),
    };
  }
}
