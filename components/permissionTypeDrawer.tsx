// *? n5-reto-tecnico-ui/components/permissionTypeDrawer.tsx

"use client";

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Input,
} from "@heroui/react";
import { useState } from "react";
import { useSWRConfig } from "swr";

import { createPermissionType } from "@/services/permissionTypeService";
import { usePermissionTypeDrawerStore } from "@/store/permissionTypeDrawerStore";
import { handleApiResponse } from "@/utils/notificationHandler";

export const PermissionTypeDrawer = () => {
  const { mutate } = useSWRConfig();
  const { isOpen, formData, closeDrawer, updateFormData, resetForm } =
    usePermissionTypeDrawerStore();
  const [loading, setLoading] = useState(false);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateFormData(e.target.name, e.target.value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    await handleApiResponse(async () => {
      await createPermissionType(formData.description, formData.code);
      mutate("/permissiontype");
      closeDrawer();
      resetForm();
    }, "Permission type created successfully!");

    setLoading(false);
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onOpenChange={closeDrawer}>
      <DrawerContent>
        <DrawerHeader>Create Permission Type</DrawerHeader>
        <DrawerBody>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              required
              label="Description"
              name="description"
              placeholder="Enter description"
              value={formData.description}
              onChange={handleFormChange}
            />
            <Input
              required
              label="Code"
              name="code"
              placeholder="Enter code"
              value={formData.code}
              onChange={handleFormChange}
            />
            <Button
              className="w-full"
              color="primary"
              isLoading={loading}
              type="submit"
            >
              {loading ? "Creating..." : "Create"}
            </Button>
          </form>
        </DrawerBody>
        <DrawerFooter>
          <Button color="danger" variant="flat" onPress={closeDrawer}>
            Cancel
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
