import { NextResponse, type NextRequest } from "next/server";
import { cookies } from "next/headers";
import { fetchCurrentUser } from "./lib/api/fetchCurrentUser";

const protectedBaseRoutes = [
  "/profile",
  "/settings",
  "/my-places",
  "/add-new-places",
  "/favorites",
  "/plan",
];
const authPages = ["/login", "/signup"];

export async function proxy(req: NextRequest) {
  const currentUser = await fetchCurrentUser();
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const { pathname } = req.nextUrl;

  const isProtectedPlace = /^\/places\/[^/]+$/.test(pathname);
  const isProtectedBase = protectedBaseRoutes.some((r) => pathname === r);

  if (currentUser?.is_blocked) {
    const res = NextResponse.redirect(new URL("/login", req.nextUrl.origin));
    res.cookies.delete("token");
    return res;
  }

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
    "/add-new-places",
    "/favorites",
    "/plan",
  ],
};
