"use client";
import { testData } from "./test-data";
import { useState, useEffect, useRef } from "react";
import { DataTable } from "../../table/data-table";
import { generateColumnsWithObject } from "../../table/columns";
import { ColumnDef } from "@tanstack/react-table";
import InputFilter from "../../table/input-filter";
import DateFilter from "../../table/date-filter";
import SelectFilter from "../../table/select-filter";

export default function LogsTable() {  
  const [data, setData] = useState<typeof testData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const tableRef = useRef<any>(null);

  const headers: Array<{ key: keyof HeadersTypes; label: string }> = [
    { key: "level", label: "Уровень" },
    { key: "shortText", label: "Краткая информация" },
    { key: "logDate", label: "Дата" },
    { key: "details", label: "Детали" }
  ];

  const visibleHeaders = [
    "Уровень",
    "Краткая информация",
    "Дата"
  ];

  type HeadersTypes = {
    level: string;
    shortText: string;
    logDate: Date;
    details: Details;
  };

  type Details = {
    level: string;
    shortText: string;
    fullText: string;
    ip: string;
    user: string;
    page: string;
    refer: string;
    logDate: Date;
  };

  const detailsHeaders: Array<{ key: keyof Details; label: string }> = [
    { key: "level", label: "Уровень" },
    { key: "shortText", label: "Краткая информация" },
    { key: "fullText", label: "Полная информация" },
    { key: "ip", label: "IP" },
    { key: "user", label: "Пользователь" },
    { key: "page", label: "Страница" },
    { key: "refer", label: "Рефер" },
    { key: "logDate", label: "Дата" },
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
        columns={generateColumnsWithObject<HeadersTypes, Details>({ headers, editable: false, objectHeaders: detailsHeaders}) as ColumnDef<unknown, unknown>[]}

        isLoading={isLoading}
        visibleHeaders={visibleHeaders}
        defaultHeaders={headers.map((h) => h.label)}
      >
        <div className="flex flex-col w-full gap-4">
          <SelectFilter placeholder='Выберите уровень' column="level" values={["info", "warning", "error"]} table={tableRef} />
        </div>
        <div className="flex flex-col w-full gap-4">
          <DateFilter placeholder="Дата" column="logDate" table={tableRef}/>
        </div>
      </DataTable>
    </div>
  );
}
