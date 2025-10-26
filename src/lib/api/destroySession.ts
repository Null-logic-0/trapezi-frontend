import getCookies from "@/lib/cookies";
import {ENDPOINTS} from "@/lib/endpoints";

export async function destroySession(): Promise<void> {
    const {token, success} = await getCookies()

    if (!success || !token) return;

    const res = await fetch(ENDPOINTS.auth.logout, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    })

    if (!res.ok) {
        throw new Error("Could not destroy session");
    }
}