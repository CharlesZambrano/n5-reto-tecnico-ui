// *? n5-reto-tecnico-ui/components/permissionTable.tsx

"use client";

import {
  Button,
  Input,
  Pagination,
  Spinner,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { useCallback, useMemo, useState } from "react";
import useSWR from "swr";

import { SearchIcon } from "./icons";
import { PermissionDrawer } from "./permissionDrawer";

import { getPermissions } from "@/services/permissionService";
import { usePermissionDrawerStore } from "@/store/permissionDrawerStore";
import { Permission } from "@/types/permission";

const fetcher = async () => {
  const response = await getPermissions();

  return response;
};

export const PermissionTable = () => {
  const [filterValue, setFilterValue] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;
  const openDrawer = usePermissionDrawerStore((state) => state.openDrawer);

  const { data, isLoading } = useSWR("/permissions", fetcher, {
    keepPreviousData: true,
  });

  const filteredItems = useMemo(() => {
    if (!data) return [];
    if (!filterValue) return data;

    const searchTerm = filterValue.toLowerCase();

    return data.filter(
      (item: Permission) =>
        item.employeeName.toLowerCase().includes(searchTerm) ||
        item.employeeSurname.toLowerCase().includes(searchTerm) ||
        // eslint-disable-next-line prettier/prettier
        item.permissionType.description.toLowerCase().includes(searchTerm)
    );
  }, [data, filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);
  const paginatedItems = useMemo(() => {
    const start = (page - 1) * rowsPerPage;

    return filteredItems.slice(start, start + rowsPerPage);
  }, [filteredItems, page, rowsPerPage]);

  const handleSearchChange = useCallback((value: string) => {
    setFilterValue(value);
    setPage(1);
  }, []);

  const handleClearSearch = useCallback(() => {
    setFilterValue("");
    setPage(1);
  }, []);

  const loadingState = isLoading ? "loading" : "idle";

  return (
    <div className="overflow-x-auto rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <Input
          isClearable
          className="w-full max-w-md"
          placeholder="Search by employee name, surname, or permission type..."
          startContent={<SearchIcon />}
          value={filterValue}
          onClear={handleClearSearch}
          onValueChange={handleSearchChange}
        />
        <Button className="ml-4" color="primary" onPress={() => openDrawer()}>
          Add New Permission
        </Button>
      </div>

      <Table
        aria-label="Permissions Table"
        bottomContent={
          <div className="flex justify-center mt-4">
            <Pagination
              isCompact
              showControls
              color="primary"
              page={page}
              total={pages}
              onChange={setPage}
            />
          </div>
        }
      >
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Employee Name</TableColumn>
          <TableColumn>Employee Surname</TableColumn>
          <TableColumn>Permission Description</TableColumn>
          <TableColumn>Permission Date</TableColumn>
          <TableColumn>Actions</TableColumn>
        </TableHeader>
        <TableBody<Permission>
          emptyContent={"No permissions found."}
          items={paginatedItems}
          loadingContent={<Spinner />}
          loadingState={loadingState}
        >
          {(item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.employeeName}</TableCell>
              <TableCell>{item.employeeSurname}</TableCell>
              <TableCell>{item.permissionType.description}</TableCell>
              <TableCell>
                {new Date(item.permissionDate).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <Button color="secondary" onPress={() => openDrawer(item)}>
                  Edit
                </Button>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <PermissionDrawer />
    </div>
  );
};
