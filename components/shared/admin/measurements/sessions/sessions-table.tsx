"use client";
import { testData } from "./test-data";
import { useState, useEffect, useRef } from "react";
import { DataTable } from "../../table/data-table";
import { generateColumnsWithObject } from "../../table/columns";
import { ColumnDef } from "@tanstack/react-table";
import InputFilter from "../../table/input-filter";
import DateFilter from "../../table/date-filter";

export default function SessionsTable() {  
  const [data, setData] = useState<typeof testData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const tableRef = useRef<any>(null);

  const headers: Array<{ key: keyof HeadersTypes; label: string }> = [
    { key: "id", label: "ID" },
    { key: "organization", label: "Организация" },
    { key: "govNumber", label: "Гос номер" },
    { key: "line", label: "Линия" },
    { key: "startDate", label: "Начало" },
    { key: "endDate", label: "Конец" },
    { key: "aqueousAlcohol", label: "Водный спирт, дал" },
    { key: "anhydrousAlcohol", label: "Безводный спирт, дал"},
    { key: "alcoholStrength", label: "Ср крепость, %"},
    { key: "utmStatus", label: "Ответ с УТМ"},
    { key: "rarStatus", label: "Ответ из РАР"},
    { key: "product", label: "Продукт" }
  ];

  const visibleHeaders = [
    "ID",
    "Организация",
    "Гос номер",
    "Начало",
    "Конец"
  ];

  type HeadersTypes = {
    id: number;
    organization: string;
    govNumber: string;
    line: string;
    startDate: Date;
    endDate: Date;
    aqueousAlcohol: number;
    anhydrousAlcohol: number;
    alcoholStrength: number;
    utmStatus: string;
    rarStatus: string;
    product: Product;
  };

  type Product = {
    id: number;
    temperature: string;
    density: number;
    strength: number;
    deltaAqueousAlcohol: number;
    deltaAnhydrousAlcohol: number;
  };

  const productHeaders: Array<{ key: keyof Product; label: string }> = [
    { key: "id", label: "ID" },
    { key: "temperature", label: "Температура" },
    { key: "density", label: "Плотность" },
    { key: "strength", label: "Плотность" },
    { key: "deltaAqueousAlcohol", label: "Дельта водного спирта, дал" },
    { key: "deltaAnhydrousAlcohol", label: "Дельта безводного спирта, дал"},
  ];

  useEffect(() => {
    setTimeout(() => {
      setData(testData);
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div className="gap-8 flex flex-col">
      <DataTable
        ref={tableRef}
        columns={generateColumnsWithObject<HeadersTypes, Product>({ headers, editable: false, objectHeaders: productHeaders}) as ColumnDef<unknown, unknown>[]}
        data={data || []}
        isLoading={isLoading}
        visibleHeaders={visibleHeaders}
        defaultHeaders={headers.map((h) => h.label)}
      >
        <div className="flex flex-col w-full gap-4">
          <InputFilter placeholder='Поиск по организации' column="organization" table={tableRef} />
          <InputFilter placeholder='Поиск по госномеру' column="govNumber" table={tableRef} />
        </div>
        <div className="flex flex-col w-full gap-4">
          <DateFilter placeholder="Начальная дата" column="startDate" table={tableRef}/>
          <DateFilter placeholder="Конечная дата" column="endDate" table={tableRef}/>
        </div>
      </DataTable>
    </div>
  );
}
