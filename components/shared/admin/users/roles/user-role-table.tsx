"use client";
import { testData } from "./test-data";
import { useState, useEffect, useRef } from "react";
import { DataTable } from "../../table/data-table";
import generateColumns from "../../table/columns";
import { ColumnDef } from "@tanstack/react-table";
import InputFilter from "../../table/input-filter";
import DateFilter from "../../table/date-filter";

export default function UserRoleTable() {  
    const [data, setData] = useState<typeof testData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const tableRef = useRef<any>(null);

    const headers: Array<{ key: keyof HeadersTypes; label: string }> = [
      { key: "id", label: "ID" },
      { key: "name", label: "Название" },
      { key: "active", label: "Активная" },
      { key: "system", label: "Системная" },
    ];

    const visibleHeaders = [
      "ID",
      "Название",
    ];

    type HeadersTypes = {
      id: number;
      name: string;
      active: boolean;
      system: boolean;
    };

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
          columns={generateColumns<HeadersTypes>({ headers }) as ColumnDef<unknown, unknown>[]}
          data={data || []}
          isLoading={isLoading}
          visibleHeaders={visibleHeaders}
          defaultHeaders={headers.map((h) => h.label)}
        >
          <div className="flex flex-col w-full gap-4">
            <InputFilter placeholder='Поиск по названию' column="name" table={tableRef} />
          </div>
        </DataTable>
      </div>
    );
}
