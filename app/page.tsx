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
        Welcome to the App!
      </h1>
      <p className="text-lg text-gray-600">
        Use the navigation menu to manage permissions and permission types.
      </p>
    </div>
  );
}
