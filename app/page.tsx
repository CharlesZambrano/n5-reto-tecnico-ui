// *? n5-reto-tecnico-ui/app/page.tsx

"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";

import { FullScreenSpinner } from "@/components/fullScreenSpinner";
import { getPermissionsByQuery } from "@/services/permissionService";
import { useAuthStore } from "@/store/authStore";
import { Permission } from "@/types/permission";

export default function HomePage() {
  const router = useRouter();
  const { token } = useAuthStore();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);
  const searchParams = useSearchParams();
  const query = searchParams.get("query");

  useEffect(() => {
    const storedToken = localStorage.getItem("jwtToken");

    if (!token && !storedToken) {
      router.push("/auth");
    } else {
      setIsCheckingAuth(false);
    }
  }, [token, router]);

  const fetcher = async () => {
    if (!query) return [];

    return await getPermissionsByQuery(query);
  };

  const { data, isLoading } = useSWR<Permission[]>(
    query ? `/permission/search?query=${query}` : null,
    // eslint-disable-next-line prettier/prettier
    fetcher
  );

  if (isCheckingAuth) {
    return <FullScreenSpinner />;
  }

  return (
    <div className="flex flex-col items-center justify-center h-full space-y-6">
      <h1 className="text-3xl font-bold text-gray-800">
        Welcome to the Application!
      </h1>
      <p className="text-lg text-gray-600">
        Use the navigation menu to manage permissions and permission types.
      </p>

      {query && (
        <>
          <h2 className="text-2xl font-semibold text-gray-700 mt-4">
            Search Results for: &quot;{query}&quot;
          </h2>
          {isLoading ? (
            <FullScreenSpinner />
          ) : data && data.length > 0 ? (
            <div className="w-full max-w-4xl mt-4">
              <Table aria-label="Search Results Table">
                <TableHeader>
                  <TableColumn>ID</TableColumn>
                  <TableColumn>Employee Name</TableColumn>
                  <TableColumn>Employee Surname</TableColumn>
                  <TableColumn>Permission Description</TableColumn>
                  <TableColumn>Permission Date</TableColumn>
                </TableHeader>
                <TableBody>
                  {data.map((permission: Permission) => (
                    <TableRow key={permission.id}>
                      <TableCell>{permission.id}</TableCell>
                      <TableCell>{permission.employeeName}</TableCell>
                      <TableCell>{permission.employeeSurname}</TableCell>
                      <TableCell>
                        {permission.permissionType.description}
                      </TableCell>
                      <TableCell>
                        {new Date(
                          // eslint-disable-next-line prettier/prettier
                          permission.permissionDate
                        ).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          ) : (
            <p className="text-gray-500 mt-4">No results found.</p>
          )}
        </>
      )}
    </div>
  );
}
