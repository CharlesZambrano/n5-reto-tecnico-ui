// *? n5-reto-tecnico-ui/config/api.ts

import axios from "axios";

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5215/api",
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar el token JWT en las solicitudes
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("jwtToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default api;
