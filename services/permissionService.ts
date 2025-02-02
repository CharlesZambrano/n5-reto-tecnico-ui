// *? n5-reto-tecnico-ui/services/permissionService.ts

import api from "@/config/api";
import { Permission } from "@/types/permission";

export const getPermissions = async (): Promise<Permission[]> => {
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
): Promise<Permission> => {
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
): Promise<void> => {
  await api.put(`/permission/${id}`, {
    employeeName,
    employeeSurname,
    permissionTypeId,
    permissionDate,
  });
};

// Búsqueda en Elasticsearch
export const getPermissionsByQuery = async (
  query: string,
): Promise<Permission[]> => {
  const response = await api.get(`/permission/search`, { params: { query } });

  return response.data;
};
