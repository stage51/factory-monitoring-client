"use client";
import { testData } from "./test-data";
import { useState, useEffect, useRef } from "react";
import { DataTable } from "../../table/data-table";
import generateColumns from "../../table/columns";
import { ColumnDef } from "@tanstack/react-table";
import InputFilter from "../../table/input-filter";
import DateFilter from "../../table/date-filter";

export default function EventsTable() {  
    const [data, setData] = useState<typeof testData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const tableRef = useRef<any>(null);

    const headers: Array<{ key: keyof HeadersTypes; label: string }> = [
      { key: "id", label: "ID" },
      { key: "organization", label: "Организация" },
      { key: "imei", label: "IMEI" },
      { key: "govNumber", label: "Гос номер" },
      { key: "type", label: "Тип" },
      { key: "eventDate", label: "Дата события" },
      { key: "serverDate", label: "Дата события на сервере" }
    ];

    const visibleHeaders = [
      "ID",
      "Организация",
      "IMEI",
      "Гос номер",
    ];

    type HeadersTypes = {
      id: number;
      organization: string;
      imei: string;
      govNumber: string;
      type: string;
      eventDate: Date;
      serverDate: Date;
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
          columns={generateColumns<HeadersTypes>({ headers, editable: false}) as ColumnDef<unknown, unknown>[]}
          isLoading={isLoading}
          visibleHeaders={visibleHeaders}
          defaultHeaders={headers.map((h) => h.label)}
        >
          <div className="flex flex-col w-full gap-4">
            <InputFilter placeholder='Поиск по организации' column="organization" table={tableRef} />
            <InputFilter placeholder='Поиск по госномеру' column="govNumber" table={tableRef} />
          </div>
          <div className="flex flex-col w-full gap-4">
            <DateFilter placeholder="Дата события" column="eventDate" table={tableRef}/>
            <DateFilter placeholder="Дата события на сервере" column="serverDate" table={tableRef}/>
          </div>
        </DataTable>
      </div>
    );
}
