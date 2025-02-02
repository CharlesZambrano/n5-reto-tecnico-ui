// *? n5-reto-tecnico-ui/services/authService.ts

import api from "@/config/api";

// Servicio para manejar la autenticación
export const loginService = async (username: string, password: string) => {
  const response = await api.post("/auth/login", {
    username,
    password,
  });

  return response.data;
};
