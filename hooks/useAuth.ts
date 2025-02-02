// *? n5-reto-tecnico-ui/hooks/useAuth.ts

"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { loginService } from "@/services/authService";
import { useAuthStore } from "@/store/authStore";

export const useAuth = () => {
  const router = useRouter();
  const { setToken, clearAuth } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Función para iniciar sesión
  const login = async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const { token } = await loginService(username, password);

      setToken(token);
      localStorage.setItem("jwtToken", token); // Guardamos el token en localStorage

      router.push("/permissions/list"); // Redirigimos al listado de permisos tras el login
    } catch (err: any) {
      if (err.response && err.response.data) {
        setError(err.response.data.detail || "Login failed.");
      } else {
        setError("Login failed.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    clearAuth();
    localStorage.removeItem("jwtToken");
    router.push("/auth"); // Redirigimos al login tras el logout
  };

  return { login, logout, loading, error };
};
