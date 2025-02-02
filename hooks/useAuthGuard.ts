// *? n5-reto-tecnico-ui/hooks/useAuthGuard.ts

"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useAuthStore } from "@/store/authStore";

// Hook para proteger componentes que requieren autenticación
export const useAuthGuard = () => {
  const router = useRouter();
  const { token, isAuthenticated } = useAuthStore();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("jwtToken");

    if (!token && !storedToken) {
      router.push("/auth");
    } else {
      setIsCheckingAuth(false); // Deja de verificar si el token es válido
    }
  }, [token, isAuthenticated, router]);

  return { isCheckingAuth }; // Retornamos el estado de la verificación
};
