"use client";
import { testData } from "./test-data";
import { useState, useEffect, useRef } from "react";
import { DataTable } from "../../table/data-table";
import generateColumns from "../../table/columns";
import { ColumnDef, ColumnFilter, ColumnFiltersState, PaginationState, SortingState } from "@tanstack/react-table";
import InputFilter from "../../table/input-filter";
import DateFilter from "../../table/date-filter";
import AddButton from "../../table/add-button";
import apiClient from "@/components/shared/services/auth/api-client";


export default function UserListTable() {  
    const [data, setData] = useState<typeof testData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const tableRef = useRef<any>(null);

    const headers: Array<{ key: keyof HeadersTypes; label: string; sortable: boolean }> = [
      { key: "id", label: "ID", sortable: false },
      { key: "email", label: "Email", sortable: true },
      { key: "firstName", label: "Имя", sortable: false },
      { key: "lastName", label: "Фамилия", sortable: false },
      { key: "middleName", label: "Отчество", sortable: false },
      { key: "timezone", label: "Часовой пояс", sortable: false },
      { key: "role", label: "Роль", sortable: false },
      { key: "active", label: "Активен", sortable: false },
      { key: "createdAt", label: "Дата создания", sortable: true },
      { key: "updatedAt", label: "Дата обновления", sortable: true }
    ];

    const visibleHeaders = [
      "ID",
      "Email"
    ];

    type HeadersTypes = {
      id: number;
      email: string;
      firstName: string;
      lastName: string;
      middleName: string;
      timezone: string;
      role: string;
      active: boolean;
      createdAt: Date;
      updatedAt: Date;
    };

    const fetchData = async (pagination : PaginationState, sorting : SortingState, columnFilters : ColumnFiltersState) => {
      setIsLoading(true);
      try {
        const response = await apiClient.post(`/auth-server/users/fetch`, {
          size: pagination.pageSize,
          number: pagination.pageIndex,
          sortBy: sorting[0]?.id,
          sortDirection: sorting[0]?.desc ? "DESC" : "ASC",
          filters: Object.fromEntries(
            columnFilters
              .filter(filter => !["createdAt", "updatedAt"].includes(filter.id))
              .map(filter => [filter.id, filter.value])
          ),
          dateRanges: Object.fromEntries(
            columnFilters
              .filter(filter => ["createdAt", "updatedAt"].includes(filter.id))
              .map(filter => {
                const from = filter.value?.from
                  ? new Date(filter.value.from).toISOString()
                  : "null";
                const to = filter.value?.to
                  ? new Date(filter.value.to).toISOString()
                  : "null";
                return [filter.id, `${from},${to}`];
              })
          )
        });
        setIsLoading(false);
        return response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    };
  
    const handleCreate = async (newUser) => {
      try {
        const response = await apiClient.post(`/auth-server/users`, newUser);
        return response.data;
      } catch (error) {
        console.error("Error creating user:", error);
        throw error;
      }
    };
  
    const handleUpdate = async (id, updatedUser) => {
      try {
        const response = await apiClient.put(`/auth-server/users/${id}`, updatedUser);
        return response.data;
      } catch (error) {
        console.error("Error updating user:", error);
        throw error;
      }
    };
  
    const handleDelete = async (id) => {
      try {
        await apiClient.delete(`/auth-server/users/${id}`);
      } catch (error) {
        console.error("Error deleting user:", error);
        throw error;
      }
    };

    return (
      <div className="gap-8 flex flex-col">
        <DataTable
          ref={tableRef}
          columns={generateColumns<HeadersTypes>({ headers, handleUpdate, handleDelete }) as ColumnDef<unknown, unknown>[]}
          data={data || []}
          isLoading={isLoading}
          visibleHeaders={visibleHeaders}
          defaultHeaders={headers.map((h) => h.label)}
          fetchData={fetchData}
        >
          <div className="flex flex-col w-full gap-4">
            <InputFilter placeholder='Поиск по email' column="email" table={tableRef} />
            <InputFilter placeholder='Поиск по имени' column="firstName" table={tableRef} />
          </div>
          <div className="flex flex-col w-full gap-4">
            <DateFilter placeholder="Дата создания" column="createdAt" table={tableRef}/>
            <DateFilter placeholder="Дата обновления" column="updatedAt" table={tableRef}/>
            <AddButton headers={headers} sampleData={testData[0]} handleCreate={handleCreate}/>
          </div>
        </DataTable>
      </div>
    );
}
