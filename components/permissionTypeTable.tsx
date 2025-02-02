// *? n5-reto-tecnico-ui/components/permissionTypeTable.tsx

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

import { SearchIcon } from "@/components/icons";
import { getPermissionTypes } from "@/services/permissionTypeService";
import { PermissionType } from "@/types/permissionType";

const fetcher = async () => {
  const response = await getPermissionTypes();

  return response;
};

export const PermissionTypeTable = () => {
  const [filterValue, setFilterValue] = useState("");
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const { data, isLoading } = useSWR("/permissiontype", fetcher, {
    keepPreviousData: true,
  });

  // Filtrado por descripción y código
  const filteredItems = useMemo(() => {
    if (!data) return [];
    if (!filterValue) return data;

    return data.filter((item: PermissionType) => {
      const searchTerm = filterValue.toLowerCase();

      return (
        item.description.toLowerCase().includes(searchTerm) ||
        (item.code && item.code.toLowerCase().includes(searchTerm))
      );
    });
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

  // Ajustamos loadingState a solo "loading" o "idle"
  const loadingState = isLoading ? "loading" : "idle";

  return (
    <div className="overflow-x-auto rounded-lg">
      {/* Ajustamos la separación entre el input y el botón */}
      <div className="flex justify-between items-center mb-4">
        <Input
          isClearable
          className="w-full max-w-md"
          placeholder="Search by description or code..."
          startContent={<SearchIcon />}
          value={filterValue}
          onClear={handleClearSearch}
          onValueChange={handleSearchChange}
        />
        {/* Agregamos margen izquierdo para separar el botón del input */}
        <Button className="ml-4" color="primary" onPress={() => setPage(1)}>
          Add New Type
        </Button>
      </div>

      <Table
        aria-label="Permission Types Table"
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
          <TableColumn>Description</TableColumn>
          <TableColumn>Code</TableColumn>
        </TableHeader>
        <TableBody<PermissionType>
          emptyContent={"No permission types found."}
          items={paginatedItems}
          loadingContent={<Spinner />}
          loadingState={loadingState}
        >
          {(item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>{item.description}</TableCell>
              <TableCell>{item.code || "N/A"}</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
