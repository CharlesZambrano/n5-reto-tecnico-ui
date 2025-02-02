// *? n5-reto-tecnico-ui/store/authStore.ts

import { create } from "zustand";

// Definimos la estructura del estado de autenticación
interface AuthState {
  token: string | null;
  isAuthenticated: boolean;
  setToken: (token: string) => void;
  clearAuth: () => void;
}

// Creamos el store de Zustand para manejar el estado global de autenticación
export const useAuthStore = create<AuthState>((set) => {
  const storedToken =
    typeof window !== "undefined" ? localStorage.getItem("jwtToken") : null;

  return {
    token: storedToken,
    isAuthenticated: !!storedToken,
    setToken: (token) => set({ token, isAuthenticated: true }),
    clearAuth: () => set({ token: null, isAuthenticated: false }),
  };
});
