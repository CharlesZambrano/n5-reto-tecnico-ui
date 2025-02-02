// *? n5-reto-tecnico-ui/app/permissionTypes/list/page.tsx

"use client";

import { PermissionTypeTable } from "@/components/permissionTypeTable";

export default function PermissionTypeListPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Permission Types</h1>
      </div>
      <PermissionTypeTable />
    </div>
  );
}
