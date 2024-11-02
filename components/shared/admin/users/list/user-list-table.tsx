"use client";
import { testData } from "./test-data";
import { useState, useEffect, useRef } from "react";
import { DataTable } from "../../table/data-table";
import generateColumns from "../../table/columns";
import { ColumnDef } from "@tanstack/react-table";
import InputFilter from "../../table/input-filter";
import DateFilter from "../../table/date-filter";

export default function UserListTable() {  
    const [data, setData] = useState<typeof testData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const tableRef = useRef<any>(null);

    const headers: Array<{ key: keyof HeadersTypes; label: string }> = [
      { key: "id", label: "ID" },
      { key: "username", label: "Имя пользователя" },
      { key: "email", label: "Email" },
      { key: "fullName", label: "ФИО" },
      { key: "role", label: "Роль" },
      { key: "isActive", label: "Активен" },
      { key: "createdDate", label: "Дата создания" },
      { key: "activityDate", label: "Дата последней активности" }
    ];

    const visibleHeaders = [
      "ID",
      "Имя пользователя",
      "Email"
    ];

    type HeadersTypes = {
      id: number;
      username: string;
      email: string;
      fullName: string;
      role: string;
      isActive: boolean;
      createdDate: Date;
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
          columns={generateColumns<HeadersTypes>({ headers }) as ColumnDef<unknown, unknown>[]}
          data={data || []}
          isLoading={isLoading}
          visibleHeaders={visibleHeaders}
          defaultHeaders={headers.map((h) => h.label)}
        >
          <div className="flex flex-col w-full gap-4">
            <InputFilter placeholder='Поиск по email' column="email" table={tableRef} />
            <InputFilter placeholder='Поиск по имени' column="username" table={tableRef} />
          </div>
          <div className="flex flex-col w-full gap-4">
            <DateFilter placeholder="Дата создания" column="createdDate" table={tableRef}/>
            <DateFilter placeholder="Дата последней активности" column="activityDate" table={tableRef}/>
          </div>
        </DataTable>
      </div>
    );
}
