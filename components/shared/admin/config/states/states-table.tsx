"use client";
import { testData } from "./test-data";
import { useState, useEffect, useRef } from "react";
import { DataTable } from "../../table/data-table";
import generateColumns from "../../table/columns";
import { ColumnDef } from "@tanstack/react-table";
import InputFilter from "../../table/input-filter";
import DateFilter from "../../table/date-filter";
import AddButton from "../../table/add-button";

export default function StatesTable() {  
    const [data, setData] = useState<typeof testData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const tableRef = useRef<any>(null);

    const headers: Array<{ key: keyof HeadersTypes; label: string }> = [
      { key: "id", label: "ID" },
      { key: "name", label: "Название" },
      { key: "iso", label: "Код ISO" },
      { key: "regions", label: "Регионы" },
      { key: "number", label: "Порядковый номер" }
    ];

    const visibleHeaders = [
      "ID",
      "Название",
    ];

    type HeadersTypes = {
      id: number;
      name: string;
      iso: number;
      regions: number;
      number: number;
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
          columns={generateColumns<HeadersTypes>({ headers, editable: true}) as ColumnDef<unknown, unknown>[]}
          data={data || []}
          isLoading={isLoading}
          visibleHeaders={visibleHeaders}
          defaultHeaders={headers.map((h) => h.label)}
        >
          <div className="flex flex-col w-full gap-4">
            
          </div>
          <div className="flex flex-col w-full gap-4">
            <AddButton headers={headers} sampleData={testData[0]} />
          </div>
        </DataTable>
      </div>
    );
}
