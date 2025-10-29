"use server";

import { revalidatePath } from "next/cache";
import { destroyUserAccount } from "../api/destroyUserAccount";
import { logout } from "./logout";

export async function deleteAccount() {
  await destroyUserAccount();
  await logout();

  revalidatePath("/settings", "page");
  revalidatePath("/login", "page");

  return { success: true };
}
