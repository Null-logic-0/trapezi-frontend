"use server";
import { destroySession } from "@/lib/api/destroySession";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

export async function logout() {
  const cookieStore = await cookies();
  cookieStore.delete("token");

  await destroySession();

  revalidatePath("/login", "page");
  revalidatePath("/", "layout");

  return { success: true };
}
