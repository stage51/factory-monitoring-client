"use client";
import { testData } from "./test-data";
import { useState, useEffect, useRef } from "react";
import { DataTable } from "../../table/data-table";
import { generateColumnsWithObject } from "../../table/columns";
import { ColumnDef, ColumnFiltersState, PaginationState, SortingState } from "@tanstack/react-table";
import InputFilter from "../../table/input-filter";
import DateFilter from "../../table/date-filter";
import SelectFilter from "../../table/select-filter";
import apiClient from "@/components/shared/services/auth/api-client";

export default function FiveMinuteFilesTable() {  
  const [isLoading, setIsLoading] = useState(true);
  const tableRef = useRef<any>(null);

  const headers: Array<{ key: keyof HeadersTypes; label: string; sortable: boolean }> = [
    { key: "id", label: "ID", sortable: false },
    { key: "taxpayerNumber", label: "ИНН", sortable: false},
    { key: "sensorNumber", label: "Сенсор", sortable: false},
    { key: "controlDate", label: "Дата", sortable: true },
    { key: "vbsControl", label: "Объем спирта", sortable: false },
    { key: "aControl", label: "Объем", sortable: false },
    { key: "percentAlc", label: "Концентрация", sortable: false },
    { key: "bottleCountControl", label: "Кол-во", sortable: false },
    { key: "temperature", label: "Температура", sortable: false },
    { key: "mode", label: "Режим", sortable: false },
    { key: "status", label: "Статус", sortable: false },
    { key: "product", label: "Продукт", sortable: false }
  ];

  const visibleHeaders = [
    "ID",
    "Начало",
    "Конец",
    "Статус"
  ];

  type HeadersTypes = {
    id: number;
    taxpayerNumber: string;
    sensorNumber: string;
    controlDate: Date;
    vbsControl: number;
    aControl: number;
    percentAlc: number;
    bottleCountControl: number;
    temperature: number;
    mode: string;
    status: string;
    product: Product;
  };

  type Product = {
    id: number;
    unitType: string;
    type: string;
    fullName: string;
    shortName: string;
    alcCode: string;
    capacity: number;
    alcVolume: number;
    productVCode: string;
    crotonaldehyde: number;
    toluene: number
  };

  const productHeaders: Array<{ key: keyof Product; label: string }> = [
    { key: "id", label: "ID" },
    { key: "unitType", label: "Тип" },
    { key: "type", label: "Вид" },
    { key: "fullName", label: "Имя" },
    { key: "shortName", label: "Короткое имя" },
    { key: "alcCode", label: "Код" },
    { key: "capacity", label: "Объем" },
    { key: "alcVolume", label: "Алк. объем" },
    { key: "productVCode", label: "Код продукта"},
    { key: "crotonaldehyde", label: "Кротоноальдегид"},
    { key: "toluene", label: "Толуол"}
  ];

  const fetchData = async (pagination : PaginationState, sorting : SortingState, columnFilters : ColumnFiltersState) => {
    setIsLoading(true);
    try {
      const response = await apiClient.post(`/five-minute-report/positions/fetch`, {
        size: pagination.pageSize,
        number: pagination.pageIndex,
        sortBy: sorting[0]?.id,
        sortDirection: sorting[0]?.desc ? "DESC" : "ASC",
        filters: Object.fromEntries(
          columnFilters
            .filter(filter => !["startDate", "endDate"].includes(filter.id))
            .map(filter => [filter.id, filter.value])
        ),
        dateRanges: Object.fromEntries(
          columnFilters
            .filter(filter => ["startDate", "endDate"].includes(filter.id))
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
      const response = await apiClient.put(`/five-minute-report/positions/${id}`, updatedData);
      return response.data;
    } catch (error) {
      console.error("Error updating data:", error);
      throw error;
    }
  };

  const handleDelete = async (id : string | number) => {
    try {
      await apiClient.delete(`/five-minute-report/positions/${id}`);
    } catch (error) {
      console.error("Error deleting data:", error);
      throw error;
    }
  };


  return (
    <div className="gap-8 flex flex-col">
      <DataTable
        ref={tableRef}
        columns={generateColumnsWithObject<HeadersTypes, Product>({ headers, editable: true, objectHeaders: productHeaders, handleUpdate, handleDelete}) as ColumnDef<unknown, unknown>[]}
        fetchData={fetchData}
        isLoading={isLoading}
        visibleHeaders={visibleHeaders}
        defaultHeaders={headers.map((h) => h.label)}
      >
        <div className="flex flex-col w-full gap-4">
          <InputFilter placeholder='Поиск по коду продукта' column="product" table={tableRef} />
          <SelectFilter table={tableRef} column="status" placeholder="Выберите статус" values={["Неизвестно", "Принято в РАР", "Не принято в РАР", "Принято в УТМ", "Не принято в УТМ"]}/>
        </div>
        <div className="flex flex-col w-full gap-4">
          <DateFilter placeholder="Дата" column="controlDate" table={tableRef}/>
        </div>
      </DataTable>
    </div>
  );
}
