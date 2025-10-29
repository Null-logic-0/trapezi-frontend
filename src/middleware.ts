import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

// Routes that require authentication
const protectedRoutes = ["/profile", "/settings"];

// Routes that should be inaccessible if user is logged in
const authPages = ["/login", "/signup"];

export async function middleware(req: NextRequest) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  const { pathname } = req.nextUrl;

  // Redirect unauthenticated users from protected routes
  if (!token && protectedRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
  }

  // Redirect authenticated users away from login/signup pages
  if (token && authPages.includes(pathname)) {
    return NextResponse.redirect(new URL("/profile", req.nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/profile", "/settings", "/login", "/signup"],
};
