import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";

const protectedBaseRoutes = ["/profile", "/settings", "/my-places"];
const authPages = ["/login", "/signup"];

export async function proxy(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const { pathname } = req.nextUrl;

  const isProtectedPlace = /^\/places\/[^/]+$/.test(pathname);
  const isProtectedBase = protectedBaseRoutes.some((r) => pathname === r);

  if (!token && (isProtectedBase || isProtectedPlace)) {
    return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
  }

  if (token && authPages.includes(pathname)) {
    return NextResponse.redirect(new URL("/profile", req.nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/profile",
    "/settings",
    "/login",
    "/signup",
    "/places/:path*",
    "/my-places",
  ],
};
