// *? n5-reto-tecnico-ui/components/permissionTypeTable.tsx

"use client";

import { Skeleton } from "@heroui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { useEffect, useState } from "react";

import { getPermissionTypes } from "@/services/permissionTypeService";

interface PermissionType {
  id: number;
  description: string;
  code: string;
}

export const PermissionTypeTable = () => {
  const [permissionTypes, setPermissionTypes] = useState<PermissionType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPermissionTypes = async () => {
      try {
        const data = await getPermissionTypes();

        setPermissionTypes(data);
      } catch (error) {
        console.error("Error fetching permission types", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPermissionTypes();
  }, []);

  return (
    <div className="overflow-x-auto shadow-md rounded-lg">
      <Table isHeaderSticky isStriped aria-label="List of Permission Types">
        <TableHeader>
          <TableColumn>ID</TableColumn>
          <TableColumn>Description</TableColumn>
          <TableColumn>Code</TableColumn>
        </TableHeader>
        <TableBody>
          {loading ? (
            // Aquí nos aseguramos de que cada fila tenga el mismo número de celdas que columnas
            <>
              <TableRow>
                <TableCell>
                  <Skeleton className="h-4 w-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-full" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Skeleton className="h-4 w-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-full" />
                </TableCell>
                <TableCell>
                  <Skeleton className="h-4 w-full" />
                </TableCell>
              </TableRow>
            </>
          ) : permissionTypes.length > 0 ? (
            permissionTypes.map((type) => (
              <TableRow key={type.id}>
                <TableCell>{type.id}</TableCell>
                <TableCell>{type.description}</TableCell>
                <TableCell>{type.code}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell className="text-center text-gray-500" colSpan={3}>
                No permission types found.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};
