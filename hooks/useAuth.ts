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
      const { token, user } = await loginService(username, password);

      setToken(token);
      localStorage.setItem("jwtToken", token);
      localStorage.setItem("username", user.username);

      router.push("/permissions/list");
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

  const logout = () => {
    clearAuth();
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("username");
    router.push("/auth");
  };

  return { login, logout, loading, error };
};
