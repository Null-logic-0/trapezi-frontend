import { ENDPOINTS } from "../endpoints";

export async function resetPasswordRequest(
  email: string,
  locale: "ka" | "en" = "ka"
) {
  try {
    const res = await fetch(ENDPOINTS.auth.reset_password_request, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": locale,
      },
      body: JSON.stringify({ email }),
    });

    const body = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: body.error || body.message || "Request failed",
        fieldErrors: body.error || {},
        values: { email },
        errors: body.errors || {},
      };
    }

    return {
      success: true,
      message: body.message || "Instructions sent",
      values: { email },
      fieldErrors: {},
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : String(error),
      values: { email },
      fieldErrors: {},
    };
  }
}

export async function resetPassword(
  password: string,
  password_confirmation: string,
  locale: "ka" | "en" = "ka",
  token: string
) {
  try {
    const res = await fetch(ENDPOINTS.auth.reset_password, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": locale,
      },
      body: JSON.stringify({ password, password_confirmation, token }),
    });

    const body = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: body.error || body.message || "Request failed",
        fieldErrors: body.error || {},
        values: { password, password_confirmation },
        errors: body.errors || {},
      };
    }

    return {
      success: true,
      message: body.message || "Password Updated",
      values: { password, password_confirmation },
      fieldErrors: {},
    };
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : String(error),
      values: { password, password_confirmation },
      fieldErrors: {},
    };
  }
}
