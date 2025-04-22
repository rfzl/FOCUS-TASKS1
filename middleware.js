import { NextResponse } from "next/server";

export function middleware(request) {
  // Ambil cookie auth dari request
  const authCookie = request.cookies.get("auth");
  
  // Jika mengakses halaman dashboard tanpa auth, redirect ke login
  if (!authCookie && request.nextUrl.pathname.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  
  // Jika mengakses halaman login/register dengan auth, redirect ke dashboard
  if (authCookie && (request.nextUrl.pathname.startsWith("/login") || request.nextUrl.pathname.startsWith("/register"))) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/register"],
};