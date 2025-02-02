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

  const login = async (username: string, password: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await loginService(username, password);

      if (response.token) {
        setToken(response.token);
        localStorage.setItem("jwtToken", response.token);

        // Asignamos el nombre de usuario de forma estática
        if (username.toLowerCase() === "admin") {
          localStorage.setItem("username", "Administrador");
        } else if (username.toLowerCase() === "user") {
          localStorage.setItem("username", "Usuario");
        } else {
          localStorage.setItem("username", username);
        }

        router.push("/permissions/list");
      } else {
        setError("Token not provided in the response.");
      }
    } catch (err: any) {
      if (err.response && err.response.data) {
        setError(err.response.data.detail || "Username or password incorrect.");
      } else if (err.message) {
        setError(`Login failed: ${err.message}`);
      } else {
        setError("An unexpected error occurred.");
      }
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    clearAuth();
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("username");
    router.push("/auth");
  };

  return { login, logout, loading, error };
};
