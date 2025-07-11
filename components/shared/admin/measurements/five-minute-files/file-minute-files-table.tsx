"use client";
import { testData } from "./test-data";
import { useState, useEffect, useRef } from "react";
import { DataTable } from "../../table/data-table";
import generateColumns, { generateColumnsWithObject } from "../../table/columns";
import { ColumnDef, ColumnFiltersState, PaginationState, SortingState } from "@tanstack/react-table";
import InputFilter from "../../table/input-filter";
import DateFilter from "../../table/date-filter";
import SelectFilter from "../../table/select-filter";
import apiClient from "@/components/shared/services/auth/api-client";

export default function FiveMinuteFilesTable() {  
  const [isLoading, setIsLoading] = useState(true);
  const tableRef = useRef<any>(null);

  const headers: Array<{ key: keyof FiveMinuteReport; label: string; sortable: boolean }> = [
    { key: "id", label: "ID", sortable: false },
    { key: "createdAt", label: "Создан в", sortable: false},
    { key: "updatedAt", label: "Изменен в", sortable: false},
    { key: "status", label: "Статус", sortable: false }
  ];

  const visibleHeaders = [
    "ID",
    "Создан в",
    "Статус"
  ];

  type Sensor = {
      id: number
      taxpayerNumber: string
      sensorNumber: string
  }

  type FiveMinuteReport = {
      id: number
      sensor: Sensor
      position: Position
      createdAt: Date
      updatedAt: Date
      status: "Неизвестно" | "Принято в РАР" | "Не принято в РАР" | "Принято в УТМ" | "Не принято в УТМ"
  }

  type Product = {
      id: number
      unitType: "Фасованная" | "Нефасованная"
      type: "Алкогольная продукция" | "Спиртосодержащая пищевая продукция" | "Спиртосодержащая непищевая продукция" | "Этиловый спирт"
      fullName: string
      shortName: string
      alcCode: string
      capacity: number
      alcVolume: number
      productVCode: string
  }

  type Position = {
      id: number
      product: Product
      controlDate: Date
      vbsControl: number
      aControl: number
      percentAlc: number
      bottleCountControl: number
      temperature: number
      mode: "Промывка" | "Калибровка" | "Тех. прогон" | "Производство" | 
      "Остановка" | "Прием (возврат)" | "Прием" | "Внутреннее перемещение" | "Отгрузка" | "Отгрузка (возврат)" | "Другие цели"
  }

  const productHeaders: Array<{ key: keyof Product; label: string }> = [
    { key: "id", label: "ID" },
    { key: "unitType", label: "Тип" },
    { key: "type", label: "Вид" },
    { key: "fullName", label: "Имя" },
    { key: "shortName", label: "Короткое имя" },
    { key: "alcCode", label: "Код" },
    { key: "capacity", label: "Объем" },
    { key: "alcVolume", label: "Алк. объем" },
    { key: "productVCode", label: "Код продукта"}
  ];

  const fetchData = async (pagination : PaginationState, sorting : SortingState, columnFilters : ColumnFiltersState) => {
    setIsLoading(true);
    try {
      const response = await apiClient.post(`/factory-monitoring/five-minute-report/fetch`, {
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
      const response = await apiClient.put(`/factory-monitoring/five-minute-report/${id}`, updatedData);
      return response.data;
    } catch (error) {
      console.error("Error updating data:", error);
      throw error;
    }
  };

  const handleDelete = async (id : string | number) => {
    try {
      await apiClient.delete(`/factory-monitoring/five-minute-report/${id}`);
    } catch (error) {
      console.error("Error deleting data:", error);
      throw error;
    }
  };


  return (
    <div className="gap-8 flex flex-col">
      <DataTable
        ref={tableRef}
        columns={generateColumns<FiveMinuteReport>({ headers, editable: false}) as ColumnDef<unknown, unknown>[]}
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
