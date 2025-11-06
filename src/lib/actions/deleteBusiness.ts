"use server";

import { revalidatePath } from "next/cache";
import { destroyMyBusiness } from "../api/destroyMyBusiness";

export async function deleteBusiness(id?: number) {
  await destroyMyBusiness(id);

  revalidatePath("/my-places");
  revalidatePath("/", "layout");

  return { success: true };
}
