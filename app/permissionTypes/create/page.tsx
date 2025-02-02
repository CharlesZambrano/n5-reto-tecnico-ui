// *? n5-reto-tecnico-ui/app/permissionTypes/create/page.tsx

"use client";

import { CreatePermissionTypeForm } from "@/components/createPermissionTypeForm";

export default function CreatePermissionTypePage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <CreatePermissionTypeForm />
    </div>
  );
}
