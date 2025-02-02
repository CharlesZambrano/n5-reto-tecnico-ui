// *? n5-reto-tecnico-ui/services/permissionTypeService.ts

import api from "@/config/api";

export const getPermissionTypes = async () => {
  const response = await api.get("/permissiontype");

  return response.data;
};

export const createPermissionType = async (
  description: string,
  code: string,
) => {
  const response = await api.post("/permissiontype", { description, code });

  return response.data;
};
