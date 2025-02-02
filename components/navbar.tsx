// *? n5-reto-tecnico-ui/components/navbar.tsx

// *? n5-reto-tecnico-ui/components/navbar.tsx

"use client";

import { Link } from "@heroui/link";
import {
  Avatar,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
  Navbar as HeroNavbar,
  Input,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

import { SearchIcon } from "./icons";

import { useAuth } from "@/hooks/useAuth";

export const Navbar = () => {
  const { logout } = useAuth();
  const router = useRouter();
  const [username, setUsername] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const searchParams = useSearchParams();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");

    setUsername(storedUsername);
  }, []);

  useEffect(() => {
    const query = searchParams.get("query");

    if (query) setSearchQuery(query);
  }, [searchParams]);

  const handleSearchSubmit = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim() !== "") {
      router.push(`/?query=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <HeroNavbar isBordered className="bg-white shadow-md">
      <NavbarContent justify="start">
        <NavbarBrand
          className="text-xl font-bold text-blue-600 cursor-pointer"
          onClick={() => router.push("/")}
        >
          N5 App
        </NavbarBrand>

        <NavbarContent className="hidden md:flex gap-4">
          <NavbarItem>
            <Link
              className="text-gray-700 hover:text-blue-600"
              href="/permissions/list"
            >
              Permissions
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              className="text-gray-700 hover:text-blue-600"
              href="/permissionTypes/list"
            >
              Permission Types
            </Link>
          </NavbarItem>
        </NavbarContent>
      </NavbarContent>

      <NavbarContent as="div" className="items-center" justify="end">
        <Input
          classNames={{
            base: "max-w-full sm:max-w-[20rem] h-10",
            mainWrapper: "h-full",
            input: "text-small",
            inputWrapper:
              "h-full font-normal text-default-500 bg-default-400/20 dark:bg-default-500/20",
          }}
          placeholder="Search Permissions..."
          size="sm"
          startContent={<SearchIcon size={18} />}
          type="search"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearchSubmit}
        />

        <Dropdown placement="bottom-end">
          <DropdownTrigger>
            <Avatar
              isBordered
              as="button"
              className="transition-transform"
              color="default"
              name={username || "User"}
              size="sm"
              src="https://img.icons8.com/comic/100/user.png"
            />
          </DropdownTrigger>
          <DropdownMenu aria-label="Opciones de Perfil" variant="flat">
            <DropdownItem key="profile" className="h-14 gap-2">
              <p className="font-semibold">Logged in as</p>
              <p className="font-semibold">{username}</p>
            </DropdownItem>
            <DropdownItem key="logout" color="danger" onPress={logout}>
              Close Session
            </DropdownItem>
          </DropdownMenu>
        </Dropdown>
      </NavbarContent>
    </HeroNavbar>
  );
};
