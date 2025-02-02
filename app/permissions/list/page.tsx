// *? n5-reto-tecnico-ui/app/permissions/list/page.tsx

"use client";

import { PermissionTable } from "@/components/permissionTable";

export default function PermissionListPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-800">Permissions</h1>
      </div>
      <PermissionTable />
    </div>
  );
}
