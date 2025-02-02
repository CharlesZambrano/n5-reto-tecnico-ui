// *? n5-reto-tecnico-ui/store/permissionDrawerStore.ts

import { create } from "zustand";

import { Permission } from "@/types/permission";

interface PermissionDrawerState {
  isOpen: boolean;
  selectedPermission: Permission | null;
  formData: {
    employeeName: string;
    employeeSurname: string;
    permissionTypeId: string;
    permissionDate: string;
  };
  openDrawer: (permission?: Permission) => void;
  closeDrawer: () => void;
  updateFormData: (field: string, value: string) => void;
  resetForm: () => void;
}

export const usePermissionDrawerStore = create<PermissionDrawerState>(
  (set) => ({
    isOpen: false,
    selectedPermission: null,
    formData: {
      employeeName: "",
      employeeSurname: "",
      permissionTypeId: "",
      permissionDate: "",
    },
    openDrawer: (permission) =>
      set({
        isOpen: true,
        selectedPermission: permission || null,
      }),
    closeDrawer: () => set({ isOpen: false, selectedPermission: null }),
    updateFormData: (field, value) =>
      set((state) => ({
        formData: { ...state.formData, [field]: value },
      })),
    resetForm: () =>
      set({
        formData: {
          employeeName: "",
          employeeSurname: "",
          permissionTypeId: "",
          permissionDate: "",
        },
      }),
  }),
);
