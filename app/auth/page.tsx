// *? n5-reto-tecnico-ui/app/auth/page.tsx

"use client";

import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Input } from "@heroui/input";
import { useState } from "react";

import { useAuth } from "@/hooks/useAuth";

export default function LoginPage() {
  const { login, loading, error } = useAuth();
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(credentials.username, credentials.password);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <Card className="w-full max-w-sm shadow-lg">
        <CardHeader>
          <h2 className="text-center text-xl font-bold">Sign In</h2>
        </CardHeader>
        <CardBody>
          {error && (
            <Alert color="danger" variant="solid">
              {error}
            </Alert>
          )}
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              required
              label="Username"
              name="username"
              placeholder="Enter your username"
              type="text"
              value={credentials.username}
              onChange={handleChange}
            />
            <Input
              required
              label="Password"
              name="password"
              placeholder="Enter your password"
              type="password"
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
    </div>
  );
}
