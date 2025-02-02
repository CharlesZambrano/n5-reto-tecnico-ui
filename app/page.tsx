// *? n5-reto-tecnico-ui/app/page.tsx

"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { FullScreenSpinner } from "@/components/fullScreenSpinner";
import { useAuthStore } from "@/store/authStore";

export default function HomePage() {
  const router = useRouter();
  const { token } = useAuthStore();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem("jwtToken");

    if (!token && !storedToken) {
      router.push("/auth");
    } else {
      setIsCheckingAuth(false);
    }
  }, [token, router]);

  if (isCheckingAuth) {
    return <FullScreenSpinner />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        ¡Bienvenido a la Aplicación!
      </h1>
      <p className="text-lg text-gray-600">
        Usa el menú de navegación para gestionar permisos y tipos de permisos.
      </p>
    </div>
  );
}
