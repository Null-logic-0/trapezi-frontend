import {
  PatchUserPasswordResponse,
  UpdatePasswordInterface,
} from "@/interfaces/user.interface";
import getCookies from "../cookies";
import { ENDPOINTS } from "../endpoints";

// export async function patchUserPassword(data: UpdatePasswordInterface) {
//   try {
//     const { token, success } = await getCookies();

//     if (!success || !token) return { success: false, message: "No auth token" };

//     const res = await fetch(ENDPOINTS.user.update_password, {
//       method: "PATCH",
//       headers: {
//         "Content-Type": "application/json",
//         Authorization: `Bearer ${token}`,
//       },
//       body: JSON.stringify(data),
//       cache: "no-store",
//     });

//     const body = await res.json();

//     return {
//       success: body.success ?? res.ok,
//       message: body.message ?? "Password updated",
//     };
//   } catch (error) {
//     return {
//       success: false,
//       message: error instanceof Error ? error.message : String(error),
//     };
//   }
// }

export async function patchUserPassword(data: UpdatePasswordInterface) {
  try {
    const { token, success } = await getCookies();

    if (!success || !token) {
      return { success: false, message: "No auth token" };
    }

    const res = await fetch(ENDPOINTS.user.update_password, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    let body: PatchUserPasswordResponse = {};
    try {
      body = await res.json();
    } catch (err) {
      console.error(err);
      body = {};
    }

    return {
      success: body.success ?? res.ok,
      message:
        body.message ??
        (res.ok
          ? "Password updated!"
          : `Error ${res.status}: Failed to update password`),
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : String(error),
    };
  }
}
