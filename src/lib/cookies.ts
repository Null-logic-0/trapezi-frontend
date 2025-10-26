"use server";

import {cookies} from "next/headers";

async function getCookies() {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get("token")?.value;

        if (!token) {
            return {success: false, message: "Unauthorized: No token", token: null};
        }

        return {success: true, token};
    } catch (error: unknown) {
        const message =
            error instanceof Error ? error.message : "Failed to read cookies";
        return {success: false, message, token: null};
    }
}

export default getCookies
