import { cookies } from "next/headers";
import { AuthResponse } from "@/interfaces/authResponse.interface";

export async function auth<T = unknown>(
  path: string,
  locale: "ka" | "en" = "ka",
  data: T,
  setCookie = true
): Promise<AuthResponse<T>> {
  try {
    const res = await fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept-Language": locale,
      },
      body: JSON.stringify(data),
    });

    const body = await res.json();

    if (!res.ok) {
      return {
        success: false,
        message: body.message || "Request failed",
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

    return { success: true, data: body };
  } catch (error: unknown) {
    return {
      success: false,
      message: error instanceof Error ? error.message : "Unexpected error",
    };
  }
}
