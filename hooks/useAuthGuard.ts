// *? n5-reto-tecnico-ui/hooks/useAuthGuard.ts

"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { useAuthStore } from "@/store/authStore";

// Hook para proteger componentes que requieren autenticación
export const useAuthGuard = () => {
  const router = useRouter();
  const { token, isAuthenticated } = useAuthStore();

  useEffect(() => {
    const storedToken = localStorage.getItem("jwtToken");

    // Verificamos si hay un token en el store o en localStorage
    if (!token && !storedToken) {
      router.push("/auth");
    }
  }, [token, isAuthenticated, router]);
};
