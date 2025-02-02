// *? n5-reto-tecnico-ui/middleware.ts

import type { NextRequest } from "next/server";

import { NextResponse } from "next/server";

// Definimos las rutas protegidas
const protectedRoutes = ["/permissions", "/permissionTypes"];

export function middleware(request: NextRequest) {
  const token = request.cookies.get("jwtToken")?.value || "";

  // Verificamos si la ruta actual es una de las protegidas
  const isProtectedRoute = protectedRoutes.some((route) =>
    request.nextUrl.pathname.startsWith(route),
  );

  // Si la ruta está protegida y no hay token, redirigir al login
  if (isProtectedRoute && !token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Si el usuario está autenticado, continuar con la solicitud
  return NextResponse.next();
}

// Definimos en qué rutas se ejecuta el middleware
export const config = {
  matcher: ["/permissions/:path*", "/permissionTypes/:path*"],
};
