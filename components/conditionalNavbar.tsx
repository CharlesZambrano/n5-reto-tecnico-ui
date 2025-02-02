// *? n5-reto-tecnico-ui/components/conditionalNavbar.tsx

"use client";

import { usePathname } from "next/navigation";

import { Navbar } from "./navbar";

export const ConditionalNavbar = () => {
  const pathname = usePathname();
  const isAuthPage = pathname.startsWith("/auth");

  if (isAuthPage) {
    return null;
  }

  return <Navbar />;
};
