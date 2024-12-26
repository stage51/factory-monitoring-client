"use client";
import { testData } from "./test-data";
import { useState, useEffect, useRef } from "react";
import { DataTable } from "../../table/data-table";
import generateColumns from "../../table/columns";
import { ColumnDef, ColumnFiltersState, PaginationState, SortingState } from "@tanstack/react-table";
import AddButton from "../../table/add-button";
import InputFilter from "../../table/input-filter";
import apiClient from "@/components/shared/services/auth/api-client";
import SelectFilter from "../../table/select-filter";

export default function OrganizationsTable() {  
    const [isLoading, setIsLoading] = useState(true);
    const tableRef = useRef<any>(null);

    const headers: Array<{ key: keyof HeadersTypes; label: string; sortable: boolean }> = [
      { key: "id", label: "ID", sortable: false},
      { key: "shortName", label: "Кор. название", sortable: true },
      { key: "name", label: "Название", sortable: true },
      { key: "type", label: "Тип", sortable: false },
      { key: "region", label: "Регион", sortable: true },
      { key: "taxpayerNumber", label: "ИНН", sortable: false },
      { key: "reasonCode", label: "КПП", sortable: false },
      { key: "specialEmail", label: "Email", sortable: true},
      { key: "specialPhone", label: "Телефон", sortable: false}
    ];

    const visibleHeaders = [
      "ID",
      "Название",
      "Email"
    ];

    type HeadersTypes = {
      id: number;
      userId: number;
      shortName: string;
      name: string;
      type: string;
      region: string;
      taxpayerNumber: string;
      reasonCode: string;
      address: string;
      specialEmail: string;
      specialPhone: boolean;
    };

    const fetchData = async (pagination : PaginationState, sorting : SortingState, columnFilters : ColumnFiltersState) => {
      setIsLoading(true);
      try {
        const response = await apiClient.post(`/auth-server/organizations/fetch`, {
          size: pagination.pageSize,
          number: pagination.pageIndex,
          sortBy: sorting[0]?.id,
          sortDirection: sorting[0]?.desc ? "DESC" : "ASC",
          filters: Object.fromEntries(
            columnFilters
              .filter(filter => !["DATERANGE"].includes(filter.id))
              .map(filter => [filter.id, filter.value])
          ),
          dateRanges: Object.fromEntries(
            columnFilters
              .filter(filter => ["DATERANGE"].includes(filter.id))
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
  
    const handleUpdate = async (id : string | number, updatedData : any) => {
      try {
        const response = await apiClient.put(`/auth-server/organizations/${id}`, updatedData);
        return response.data;
      } catch (error) {
        console.error("Error updating data:", error);
        throw error;
      }
    };
  
    const handleDelete = async (id : string | number) => {
      try {
        await apiClient.delete(`/auth-server/organizations/${id}`);
      } catch (error) {
        console.error("Error deleting data:", error);
        throw error;
      }
    };

    return (
      <div className="gap-8 flex flex-col">
        <DataTable
          ref={tableRef}
          columns={generateColumns<HeadersTypes>({ headers, editable: true, handleUpdate, handleDelete}) as ColumnDef<unknown, unknown>[]}
          fetchData={fetchData}
          isLoading={isLoading}
          visibleHeaders={visibleHeaders}
          defaultHeaders={headers.map((h) => h.label)}
        >
          <div className="flex flex-col w-full gap-4">
            <InputFilter placeholder='Поиск по названию' column="name" table={tableRef} />
            <InputFilter placeholder='Поиск по ИНН' column="taxpayerNumber" table={tableRef} />
          </div>
          <div className="flex flex-col w-full gap-4">
            <InputFilter placeholder='Поиск по email' column="specialEmail" table={tableRef} />
            <SelectFilter placeholder="Поиск по типу" column="type" table={tableRef} values={[
              "Производство алкогольного сырья", "Ликеро-водочный завод", "Фармацевтическое производство",
              "Пивоваренная компания", "Перевозчик алкогольного сырья", "Перевозчик газового сырья",
              "Другое"]}/>
          </div>
        </DataTable>
      </div>
    );
}
