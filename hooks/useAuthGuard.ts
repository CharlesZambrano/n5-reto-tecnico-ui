// *? n5-reto-tecnico-ui/hooks/useAuthGuard.ts

"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useAuthStore } from "@/store/authStore";

export const useAuthGuard = () => {
  const router = useRouter();
  const { token, isAuthenticated } = useAuthStore();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("jwtToken");

    if (!token && !storedToken) {
      router.push("/auth");
    } else {
      setIsCheckingAuth(false);
    }
  }, [token, isAuthenticated, router]);

  return { isCheckingAuth };
};
