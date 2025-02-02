// *? n5-reto-tecnico-ui/app/page.tsx

"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAuthStore } from "@/store/authStore";

export default function HomePage() {
  const router = useRouter();
  const { token } = useAuthStore();

  useEffect(() => {
    const storedToken = localStorage.getItem("jwtToken");

    // Si el usuario está autenticado, redirigir al listado de permisos
    if (token || storedToken) {
      router.push("/permissions/list");
    } else {
      // Si no está autenticado, redirigir al login
      router.push("/auth");
    }
  }, [token, router]);

  // Mientras redirige, no muestra nada en pantalla
  return null;
}
