// proxy.ts
import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";

const protectedRoutes = ["/profile", "/settings"];
const authPages = ["/login", "/signup"];

export async function proxy(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const { pathname } = req.nextUrl;

  if (!token && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
  }
  if (token && authPages.includes(pathname)) {
    return NextResponse.redirect(new URL("/profile", req.nextUrl.origin));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/settings", "/login", "/signup"],
};
