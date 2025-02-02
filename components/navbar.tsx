// *? n5-reto-tecnico-ui/components/navbar.tsx

"use client";

import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import {
  Navbar as HeroNavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/navbar";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { useAuth } from "@/hooks/useAuth";

export const Navbar = () => {
  const { logout } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);

  useEffect(() => {
    // Aquí asumimos que el nombre de usuario está almacenado en localStorage (puedes ajustar esto según tu backend)
    const storedUsername = localStorage.getItem("username");

    setUsername(storedUsername);
  }, []);

  return (
    <HeroNavbar className="bg-white shadow-md">
      <NavbarBrand
        className="text-xl font-bold text-blue-600 cursor-pointer"
        onClick={() => router.push("/")}
      >
        MyApp
      </NavbarBrand>

      <NavbarContent className="hidden md:flex gap-4">
        <NavbarItem>
          <Link
            className="text-gray-700 hover:text-blue-600"
            href="/permissions/list"
          >
            Permisos
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link
            className="text-gray-700 hover:text-blue-600"
            href="/permissionTypes/list"
          >
            Tipos de Permisos
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="flex items-center gap-4">
        {username && <span className="text-gray-600">Hola, {username}</span>}
        <Button color="danger" onPress={logout}>
          Cerrar Sesión
        </Button>
      </NavbarContent>
    </HeroNavbar>
  );
};
