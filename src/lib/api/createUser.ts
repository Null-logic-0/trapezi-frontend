import { ENDPOINTS } from "@/lib/endpoints";
import { SignupInterface } from "@/interfaces/signup.interface";

export async function createUser(
  userData: SignupInterface,
  locale: "ka" | "en" = "ka"
) {
  try {
    const res = await fetch(ENDPOINTS.auth.signup, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": locale,
      },
      body: JSON.stringify(userData),
    });

    const body = await res.json();

    return {
      success: res.ok,
      message: body.message || body.error || "Request failed",
      fieldErrors: body.errors || {},
      values: userData,
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : String(error),
      values: userData,
      fieldErrors: {},
    };
  }
}
