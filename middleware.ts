// *? n5-reto-tecnico-ui/middleware.ts

import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

const protectedRoutes = ["/permissions", "/permissionTypes"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("jwtToken")?.value || "";

  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route),
  );

  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/permissions/:path*", "/permissionTypes/:path*"],
};
