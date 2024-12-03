"use client";
import { useState, useEffect, useRef } from "react";
import { DataTable } from "../../table/data-table";
import generateColumns from "../../table/columns";
import { ColumnDef, ColumnFiltersState, PaginationState, SortingState } from "@tanstack/react-table";
import apiClient from "@/components/shared/services/auth/api-client";
import InputFilter from "../../table/input-filter";
import DateFilter from "../../table/date-filter";

export default function UserRefreshTokens() {  
    const [isLoading, setIsLoading] = useState(true);
    const tableRef = useRef<any>(null);

    const headers: Array<{ key: keyof HeadersTypes; label: string; sortable: boolean }> = [
      { key: "userEmail", label: "Пользователь", sortable: true },
      { key: "token", label: "Токен", sortable: false },
      { key: "issuedAt", label: "Выдан с", sortable: true },
      { key: "expiresAt", label: "Истекает до", sortable: true },
    ];

    const visibleHeaders = [
      "Пользователь",
      "Токен"
    ];

    type HeadersTypes = {
      userEmail: string;
      token: string;
      issuedAt: Date;
      expiresAt: Date;
    };

    const fetchData = async (pagination : PaginationState, sorting : SortingState, columnFilters : ColumnFiltersState) => {
      setIsLoading(true);
      try {
        const response = await apiClient.post(`/auth-server/refresh-tokens/fetch`, {
          size: pagination.pageSize,
          number: pagination.pageIndex,
          sortBy: sorting[0]?.id,
          sortDirection: sorting[0]?.desc ? "DESC" : "ASC",
          filters: Object.fromEntries(
            columnFilters
              .filter(filter => !["activeAt"].includes(filter.id))
              .map(filter => [filter.id, filter.value])
          ),
          dateRanges: Object.fromEntries(
            columnFilters
              .filter(filter => ["activeAt"].includes(filter.id))
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

    return (
      <div className="gap-8 flex flex-col">
        <DataTable
          ref={tableRef}
          columns={generateColumns<HeadersTypes>({ headers, editable: false }) as ColumnDef<unknown, unknown>[]}
          fetchData={fetchData}
          isLoading={isLoading}
          visibleHeaders={visibleHeaders}
          defaultHeaders={headers.map((h) => h.label)}
        >
          <div className="flex flex-col w-full gap-4">
            <InputFilter placeholder='Поиск по email' column="userEmail" table={tableRef} />
          </div>
          <div className="flex flex-col w-full gap-4">
            <DateFilter placeholder="Дата выдачи" column="issuedAt" table={tableRef}/>
            <DateFilter placeholder="Дата истечения" column="expiresAt" table={tableRef}/>
          </div>
        </DataTable>
      </div>
    );
}
