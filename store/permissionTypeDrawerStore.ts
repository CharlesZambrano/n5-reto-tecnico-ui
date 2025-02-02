// *? n5-reto-tecnico-ui/store/permissionTypeDrawerStore.ts

import { create } from "zustand";

interface PermissionTypeDrawerState {
  isOpen: boolean;
  formData: {
    description: string;
    code: string;
  };
  openDrawer: () => void;
  closeDrawer: () => void;
  updateFormData: (field: string, value: string) => void;
  resetForm: () => void;
}

export const usePermissionTypeDrawerStore = create<PermissionTypeDrawerState>(
  (set) => ({
    isOpen: false,
    formData: { description: "", code: "" },
    openDrawer: () => set({ isOpen: true }),
    closeDrawer: () => set({ isOpen: false }),
    updateFormData: (field, value) =>
      set((state) => ({
        formData: { ...state.formData, [field]: value },
      })),
    resetForm: () =>
      set({
        formData: { description: "", code: "" },
      }),
  }),
);
