"use server"
import {ENDPOINTS} from "@/lib/endpoints";
import {cookies} from "next/headers";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";

export async function googleOAuth(credential: string): Promise<void> {
    const res = await fetch(ENDPOINTS.auth.google, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({credential}),
    });

    if (!res.ok) throw new Error("Google login failed");

    const body = await res.json();


    const cookieStore = await cookies();
    cookieStore.set("token", body.token, {
        secure: process.env.NODE_ENV === "production",
        httpOnly: true,
        sameSite: "strict",
    });

    revalidatePath('/', 'layout')
    redirect('/')
}