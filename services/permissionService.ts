// *? n5-reto-tecnico-ui/services/permissionService.ts

import api from "@/config/api";

export const getPermissions = async () => {
  const response = await api.get("/permission");

  return response.data;
};

export const getPermissionTypes = async () => {
  const response = await api.get("/permissiontype");

  return response.data;
};

export const createPermission = async (
  employeeName: string,
  employeeSurname: string,
  permissionTypeId: number,
  permissionDate: string,
) => {
  const response = await api.post("/permission", {
    employeeName,
    employeeSurname,
    permissionTypeId,
    permissionDate,
  });

  return response.data;
};

export const updatePermission = async (
  id: number,
  employeeName: string,
  employeeSurname: string,
  permissionTypeId: number,
  permissionDate: string,
) => {
  const response = await api.put(`/permission/${id}`, {
    employeeName,
    employeeSurname,
    permissionTypeId,
    permissionDate,
  });

  return response.data;
};
