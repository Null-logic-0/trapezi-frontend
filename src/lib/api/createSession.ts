import { auth } from "@/lib/helpers/auth";
import { ENDPOINTS } from "@/lib/endpoints";
import { LoginInterface } from "@/interfaces/login.interface";
import { CreateUserResponse } from "@/interfaces/authResponse.interface";

export async function createSession(
  userData: LoginInterface,
  locale: "ka" | "en" = "ka"
): Promise<CreateUserResponse> {
  return await auth<LoginInterface>(ENDPOINTS.auth.login, locale, userData);
}
