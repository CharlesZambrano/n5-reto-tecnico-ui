// *? n5-reto-tecnico-ui/types/permission.ts

export interface PermissionType {
  id: number;
  description: string;
  code: string | null;
}

export interface Permission {
  id: number;
  employeeName: string;
  employeeSurname: string;
  permissionTypeId: number;
  permissionDate: string;
  permissionType: PermissionType;
}
