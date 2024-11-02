"use client";
import { testData } from "./test-data";
import { useState, useEffect, useRef } from "react";
import { DataTable } from "../../table/data-table";
import generateColumns from "../../table/columns";
import { ColumnDef } from "@tanstack/react-table";
import InputFilter from "../../table/input-filter";
import DateFilter from "../../table/date-filter";

export default function UserOnlineTable() {  
    const [data, setData] = useState<typeof testData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const tableRef = useRef<any>(null);

    const headers: Array<{ key: keyof HeadersTypes; label: string }> = [
      { key: "id", label: "ID" },
      { key: "username", label: "Имя пользователя" },
      { key: "ip", label: "IP" },
      { key: "location", label: "Расположение" },
      { key: "activityDate", label: "Дата последней активности" },
    ];

    const visibleHeaders = [
      "ID",
      "Имя пользователя",
      "IP"
    ];

    type HeadersTypes = {
      id: number;
      username: string;
      ip: string;
      location: string;
      activityDate: Date;
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
          columns={generateColumns<HeadersTypes>({ headers, editable: false }) as ColumnDef<unknown, unknown>[]}
          data={data || []}
          isLoading={isLoading}
          visibleHeaders={visibleHeaders}
          defaultHeaders={headers.map((h) => h.label)}
        >
        </DataTable>
      </div>
    );
}
