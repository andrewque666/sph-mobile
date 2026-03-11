import NextAuth from "next-auth";
import authConfig from "@/auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;
  const user = req.auth?.user;
  const pathname = nextUrl.pathname;

  // Public routes — redirect authenticated users to dashboard
  const publicRoutes = ["/login", "/register"];
  if (publicRoutes.some((r) => pathname.startsWith(r))) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL("/dashboard", nextUrl));
    }
    return NextResponse.next();
  }

  // All other routes require authentication
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  // Admin routes — admin only
  if (pathname.startsWith("/admin")) {
    if (user?.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/dashboard", nextUrl));
    }
    return NextResponse.next();
  }

  // Doctor directory — not accessible to pending patients
  if (pathname.startsWith("/doctors")) {
    if (user?.role === "PATIENT" && user?.status !== "APPROVED") {
      return NextResponse.redirect(new URL("/dashboard", nextUrl));
    }
    return NextResponse.next();
  }

  // Patient list — not accessible to patients (except own via /patients/[id])
  if (pathname === "/patients") {
    if (user?.role === "PATIENT") {
      return NextResponse.redirect(new URL("/dashboard", nextUrl));
    }
    return NextResponse.next();
  }

  // Patient detail — patients can only view their own
  if (pathname.startsWith("/patients/") && user?.role === "PATIENT") {
    if (user?.status !== "APPROVED") {
      return NextResponse.redirect(new URL("/dashboard", nextUrl));
    }
    return NextResponse.next();
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
