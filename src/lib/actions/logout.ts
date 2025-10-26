"use server"
import {destroySession} from "@/lib/api/destroySession";
import {cookies} from "next/headers";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

export async function logout() {
    const cookieStore = await cookies();
    cookieStore.delete("token");

    await destroySession()

    revalidatePath("/login", "page");
    redirect("/login");
}