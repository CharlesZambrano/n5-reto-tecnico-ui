// *? n5-reto-tecnico-ui\components\createPermissionTypeForm.tsx

"use client";

import { Alert } from "@heroui/alert";
import { Button } from "@heroui/button";
import { Card, CardBody, CardHeader } from "@heroui/card";
import { Input } from "@heroui/input";
import { Spacer } from "@heroui/spacer";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { createPermissionType } from "@/services/permissionTypeService";

export const CreatePermissionTypeForm = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({ description: "", code: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await createPermissionType(formData.description, formData.code);
      router.push("/permissionTypes/list");
    } catch (err: any) {
      setError("Error creating permission type " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="max-w-lg mx-auto shadow-lg">
      <CardHeader>
        <h2 className="text-xl font-bold text-center">
          Create Permission Type
        </h2>
      </CardHeader>
      <CardBody>
        {error && <Alert color="danger">{error}</Alert>}
        <form className="space-y-4" onSubmit={handleSubmit}>
          <Input
            required
            label="Description"
            name="description"
            placeholder="Enter permission type description"
            value={formData.description}
            onChange={handleChange}
          />
          <Input
            required
            label="Code"
            name="code"
            placeholder="Enter permission type code"
            value={formData.code}
            onChange={handleChange}
          />
          <Spacer y={4} />
          <Button
            className="w-full"
            color="primary"
            isLoading={loading}
            type="submit"
          >
            {loading ? "Creating..." : "Create"}
          </Button>
        </form>
      </CardBody>
    </Card>
  );
};
