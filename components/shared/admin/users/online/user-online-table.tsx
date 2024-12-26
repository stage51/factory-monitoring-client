"use client";
import { testData } from "./test-data";
import { useState, useEffect, useRef } from "react";
import { DataTable } from "../../table/data-table";
import generateColumns from "../../table/columns";
import { ColumnDef, ColumnFiltersState, PaginationState, SortingState } from "@tanstack/react-table";
import apiClient from "@/components/shared/services/auth/api-client";
import InputFilter from "../../table/input-filter";
import DateFilter from "../../table/date-filter";

export default function UserOnlineTable() {  
    const [data, setData] = useState<typeof testData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const tableRef = useRef<any>(null);

    const headers: Array<{ key: keyof HeadersTypes; label: string; sortable: boolean }> = [
      { key: "email", label: "Электронная почта", sortable: true },
      { key: "ipAddress", label: "IP", sortable: true },
      { key: "activeAt", label: "Дата последней активности", sortable: true },
    ];

    const visibleHeaders = [
      "Электронная почта",
      "IP"
    ];

    type HeadersTypes = {
      email: string;
      ipAddress: string;
      activeAt: Date;
    };

    const fetchData = async (pagination : PaginationState, sorting : SortingState, columnFilters : ColumnFiltersState) => {
      setIsLoading(true);
      try {
        const response = await apiClient.post(`/auth-server/onlines/fetch`, {
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
                const from = (filter.value as any)?.from
                  ? new Date((filter.value as any)?.from).toISOString()
                  : "null";
                const to = (filter.value as any)?.to
                  ? new Date((filter.value as any)?.to).toISOString()
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
            <InputFilter placeholder='Поиск по email' column="email" table={tableRef} />
          </div>
          <div className="flex flex-col w-full gap-4">
            <DateFilter placeholder="Дата активности" column="activeAt" table={tableRef}/>
          </div>
        </DataTable>
      </div>
    );
}
