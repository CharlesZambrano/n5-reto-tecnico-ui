// *? n5-reto-tecnico-ui/components/permissionDrawer.tsx

"use client";

import {
  Button,
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  Form,
  Input,
  Select,
  SelectItem,
} from "@heroui/react";
import { Selection } from "@react-types/shared";
import { useEffect, useState } from "react";
import { useSWRConfig } from "swr";

import {
  createPermission,
  getPermissionTypes,
  updatePermission,
} from "@/services/permissionService";
import { usePermissionDrawerStore } from "@/store/permissionDrawerStore";
import { PermissionType } from "@/types/permission";
import { handleApiResponse } from "@/utils/notificationHandler";

export const PermissionDrawer = () => {
  const { mutate } = useSWRConfig();
  const {
    isOpen,
    selectedPermission,
    formData,
    closeDrawer,
    updateFormData,
    resetForm,
  } = usePermissionDrawerStore();

  const [loading, setLoading] = useState(false);
  const [permissionTypes, setPermissionTypes] = useState<PermissionType[]>([]);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (selectedPermission) {
        updateFormData("employeeName", selectedPermission.employeeName);
        updateFormData("employeeSurname", selectedPermission.employeeSurname);
        updateFormData(
          "permissionTypeId",
          // eslint-disable-next-line prettier/prettier
          selectedPermission.permissionTypeId.toString()
        );
        updateFormData(
          "permissionDate",
          // eslint-disable-next-line prettier/prettier
          selectedPermission.permissionDate.split("T")[0]
        );
      } else {
        resetForm();
      }
      setSubmitted(false);
    }
  }, [isOpen, selectedPermission, updateFormData, resetForm]);

  useEffect(() => {
    const fetchPermissionTypes = async () => {
      const types = await getPermissionTypes();

      setPermissionTypes(types);
    };

    fetchPermissionTypes();
  }, []);

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    updateFormData(name, value);
  };

  const handleSelectChange = (keys: Selection) => {
    const selectedKey = Array.from(keys as Set<string>)[0] || "";

    updateFormData("permissionTypeId", selectedKey);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);

    const { employeeName, employeeSurname, permissionTypeId, permissionDate } =
      formData;

    if (
      !employeeName.trim() ||
      !employeeSurname.trim() ||
      !permissionTypeId.trim() ||
      !permissionDate.trim()
    ) {
      return;
    }

    setLoading(true);

    await handleApiResponse(
      async () => {
        if (selectedPermission) {
          await updatePermission(
            selectedPermission.id,
            employeeName,
            employeeSurname,
            parseInt(permissionTypeId),
            // eslint-disable-next-line prettier/prettier
            permissionDate
          );
        } else {
          await createPermission(
            employeeName,
            employeeSurname,
            parseInt(permissionTypeId),
            // eslint-disable-next-line prettier/prettier
            permissionDate
          );
        }
        mutate("/permissions");
        closeDrawer();
        resetForm();
        setSubmitted(false);
      },
      selectedPermission
        ? "Permission updated successfully!"
        : // eslint-disable-next-line prettier/prettier
          "Permission created successfully!"
    );

    setLoading(false);
  };

  return (
    <Drawer isOpen={isOpen} placement="right" onOpenChange={closeDrawer}>
      <DrawerContent>
        <DrawerHeader>
          {selectedPermission ? "Edit Permission" : "Create Permission"}
        </DrawerHeader>
        <DrawerBody>
          <Form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              errorMessage={
                submitted && !formData.employeeName.trim()
                  ? "Employee name is required"
                  : ""
              }
              isInvalid={submitted && !formData.employeeName.trim()}
              label="Employee Name"
              name="employeeName"
              placeholder="Enter employee name"
              value={formData.employeeName}
              onChange={handleFormChange}
            />
            <Input
              errorMessage={
                submitted && !formData.employeeSurname.trim()
                  ? "Employee surname is required"
                  : ""
              }
              isInvalid={submitted && !formData.employeeSurname.trim()}
              label="Employee Surname"
              name="employeeSurname"
              placeholder="Enter employee surname"
              value={formData.employeeSurname}
              onChange={handleFormChange}
            />
            <Select
              key={`select-${submitted}`}
              errorMessage={
                submitted && !formData.permissionTypeId
                  ? "Permission type is required"
                  : ""
              }
              isInvalid={submitted && !formData.permissionTypeId}
              label="Permission Type"
              name="permissionTypeId"
              placeholder="Select a permission type"
              selectedKeys={
                formData.permissionTypeId
                  ? new Set([formData.permissionTypeId])
                  : new Set()
              }
              onSelectionChange={handleSelectChange}
            >
              {permissionTypes.map((type: PermissionType) => (
                <SelectItem key={type.id.toString()} value={type.id.toString()}>
                  {type.description}
                </SelectItem>
              ))}
            </Select>
            <Input
              errorMessage={
                submitted && !formData.permissionDate.trim()
                  ? "Permission date is required"
                  : ""
              }
              isInvalid={submitted && !formData.permissionDate.trim()}
              label="Permission Date"
              name="permissionDate"
              type="date"
              value={formData.permissionDate}
              onChange={handleFormChange}
            />
            <Button
              className="w-full"
              color="primary"
              isLoading={loading}
              type="submit"
            >
              {loading ? "Saving..." : selectedPermission ? "Update" : "Create"}
            </Button>
          </Form>
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
