// *? n5-reto-tecnico-ui/app/permissions/create/page.tsx

"use client";

import { Alert } from "@heroui/react";
import { useEffect, useState } from "react";

import api from "@/config/api";
import { useAuthGuard } from "@/hooks/useAuthGuard";

export default function PermissionCreatePage() {
  useAuthGuard(); // Protección de la ruta

  const [permissions, setPermissions] = useState([]);

  useEffect(() => {
    const fetchPermissions = async () => {
      try {
        const response = await api.get("/permission");

        setPermissions(response.data);
      } catch (error) {
        <Alert
          description={String(error)}
          title={"Error fetching permissions:"}
        />;
      }
    };

    fetchPermissions();
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Permissions List</h1>
      <ul>
        {permissions.map((permission: any) => (
          <li key={permission.id}>
            {permission.employeeName} {permission.employeeSurname} -{" "}
            {permission.permissionType.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
