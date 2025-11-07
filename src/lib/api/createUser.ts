import { ENDPOINTS } from "@/lib/endpoints";
import { SignupInterface } from "@/interfaces/signup.interface";
import { auth } from "@/lib/helpers/auth";
import { CreateUserResponse } from "@/interfaces/authResponse.interface";

export async function createUser(
  userData: SignupInterface,
  locale: "ka" | "en" = "ka"
): Promise<CreateUserResponse> {
  return await auth<SignupInterface>(ENDPOINTS.auth.signup, locale, userData);
}
