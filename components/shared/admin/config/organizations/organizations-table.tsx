"use client";
import { testData } from "./test-data";
import { useState, useEffect, useRef } from "react";
import { DataTable } from "../../table/data-table";
import generateColumns from "../../table/columns";
import { ColumnDef } from "@tanstack/react-table";
import AddButton from "../../table/add-button";
import InputFilter from "../../table/input-filter";

export default function OrganizationsTable() {  
    const [data, setData] = useState<typeof testData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const tableRef = useRef<any>(null);

    const headers: Array<{ key: keyof HeadersTypes; label: string }> = [
      { key: "id", label: "ID" },
      { key: "name", label: "Название" },
      { key: "email", label: "Email" },
      { key: "phone", label: "Телефон" },
      { key: "state", label: "Страна" },
      { key: "region", label: "Регион" },
      { key: "working", label: "В работе" }
    ];

    const visibleHeaders = [
      "ID",
      "Название",
      "Email"
    ];

    type HeadersTypes = {
      id: number;
      name: string;
      email: string;
      phone: string;
      state: string;
      region: string;
      working: boolean;
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
            <InputFilter placeholder='Поиск по стране' column="state" table={tableRef} />
            <InputFilter placeholder='Поиск по региону' column="region" table={tableRef} />
          </div>
          <div className="flex flex-col w-full gap-4">
            <InputFilter placeholder='Поиск по названию' column="name" table={tableRef} />
            <AddButton headers={headers} sampleData={testData[0]} />
          </div>
        </DataTable>
      </div>
    );
}
