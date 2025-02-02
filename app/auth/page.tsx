// *? n5-reto-tecnico-ui/app/auth/page.tsx

"use client";

import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Input } from "@heroui/input";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { EyeIcon, EyeSlashIcon } from "@/components/icons";
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/store/authStore";

export default function LoginPage() {
  const { login, loading, error } = useAuth();
  const { token } = useAuthStore();
  const router = useRouter();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const clearInput = (field: "username" | "password") => {
    setCredentials({ ...credentials, [field]: "" });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(credentials.username, credentials.password);
  };

  // Evitar redirección si ya estamos en /auth
  useEffect(() => {
    const storedToken = localStorage.getItem("jwtToken");

    if (token || storedToken) {
      router.push("/");
    }
  }, [token, router]);

  return (
    <Card className="w-full max-w-sm shadow-lg">
      <CardHeader>
        <h2 className="text-center text-xl font-bold">Sign In</h2>
      </CardHeader>
      <CardBody>
        {error && (
          <Alert className="mb-4" color="danger" variant="solid">
            {error}
          </Alert>
        )}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            isClearable
            required
            label="Username"
            name="username"
            placeholder="Enter your username"
            type="text"
            value={credentials.username}
            onChange={handleChange}
            onClear={() => clearInput("username")}
          />
          <Input
            required
            endContent={
              <button
                aria-label="Toggle password visibility"
                className="focus:outline-none"
                type="button"
                onClick={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                {isPasswordVisible ? <EyeSlashIcon /> : <EyeIcon />}
              </button>
            }
            label="Password"
            name="password"
            placeholder="Enter your password"
            type={isPasswordVisible ? "text" : "password"}
            value={credentials.password}
            onChange={handleChange}
          />
          <Button
            className="w-full"
            color="primary"
            isLoading={loading}
            type="submit"
          >
            {loading ? "Signing in..." : "Login"}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
}
