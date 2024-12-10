"use client";
import { testData } from "./test-data";
import { useState, useEffect, useRef } from "react";
import { DataTable } from "../../table/data-table";
import { generateColumnsWithObject } from "../../table/columns";
import { ColumnDef, ColumnFiltersState, PaginationState, SortingState } from "@tanstack/react-table";
import InputFilter from "../../table/input-filter";
import DateFilter from "../../table/date-filter";
import apiClient from "@/components/shared/services/auth/api-client";
import SelectFilter from "../../table/select-filter";

export default function SessionsTable() {  
  const [isLoading, setIsLoading] = useState(true);
  const tableRef = useRef<any>(null);

  const headers: Array<{ key: keyof HeadersTypes; label: string; sortable: boolean }> = [
    { key: "id", label: "ID", sortable: false},
    { key: "taxpayerNumber", label: "ИНН", sortable: false},
    { key: "sensorNumber", label: "Сенсор", sortable: false},
    { key: "startDate", label: "Начало", sortable: true },
    { key: "endDate", label: "Конец", sortable: true },
    { key: "vbsStart", label: "Объем безводного спирта в начале", sortable: false },
    { key: "vbsEnd", label: "Объем безводного спирта в конце", sortable: false },
    { key: "aStart", label: "Объем готовой продукции в начале", sortable: false },
    { key: "aEnd", label: "Объем готовой продукции в конце", sortable: false },
    { key: "percentAlc", label: "Концентрация спирта", sortable: false },
    { key: "bottleCountStart", label: "Кол-во в начале", sortable: false },
    { key: "bottleCountEnd", label: "Кол-во в конце", sortable: false},
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
    startDate: Date;
    endDate: Date;
    vbsStart: number;
    vbsEnd: number;
    aStart: number;
    aEnd: number;
    percentAlc: number;
    bottleCountStart: number;
    bottleCountEnd: number;
    temperature: number;
    mode: string;
    status: string;
    product: Product;
  };

  type Product = {
    id: number;
    unitType: string;
    fullName: string;
    alcCode: string;
    productVCode: string;
  };

  const productHeaders: Array<{ key: keyof Product; label: string }> = [
    { key: "id", label: "ID" },
    { key: "unitType", label: "Тип" },
    { key: "fullName", label: "Имя" },
    { key: "alcCode", label: "Код" },
    { key: "productVCode", label: "Код продукта"},
  ];

  const fetchData = async (pagination : PaginationState, sorting : SortingState, columnFilters : ColumnFiltersState) => {
    setIsLoading(true);
    try {
      const response = await apiClient.post(`/mode-report/positions/fetch`, {
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

  const handleUpdate = async (id, updatedData) => {
    try {
      const response = await apiClient.put(`/mode-report/positions/${id}`, updatedData);
      return response.data;
    } catch (error) {
      console.error("Error updating data:", error);
      throw error;
    }
  };

  const handleDelete = async (id) => {
    try {
      await apiClient.delete(`/mode-report/positions/${id}`);
    } catch (error) {
      console.error("Error deleting data:", error);
      throw error;
    }
  };


  return (
    <div className="gap-8 flex flex-col">
      <DataTable
        ref={tableRef}
        columns={generateColumnsWithObject<HeadersTypes, Product>({ headers, editable: false, objectHeaders: productHeaders, handleUpdate, handleDelete}) as ColumnDef<unknown, unknown>[]}
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
          <DateFilter placeholder="Начальная дата" column="startDate" table={tableRef}/>
          <DateFilter placeholder="Конечная дата" column="endDate" table={tableRef}/>
        </div>
      </DataTable>
    </div>
  );
}
