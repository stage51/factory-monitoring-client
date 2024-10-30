"use client";
import { testData } from "./test-data";
import { useState, useEffect, useRef } from "react";
import { DataTable } from "./data-table";
import generateColumns from "./columns";
import { Input } from "@/components/ui/input";
import { ColumnDef } from "@tanstack/react-table";
import { DatePickerWithRange } from "../../date-range-picker";
import { DateRange } from "react-day-picker";

export default function AdminTable() {  
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
            <Input
              placeholder="Поиск по email"
              onChange={(event) =>
                tableRef.current?.getColumn("email")?.setFilterValue(event.target.value)
              }
              className="w-full"
            />
            <Input
              placeholder="Поиск по имени"
              onChange={(event) =>
                tableRef.current?.getColumn("username")?.setFilterValue(event.target.value)
              }
              className="w-full"
            />
          </div>
          <div className="flex flex-col w-full gap-4">
            <DatePickerWithRange
            value={tableRef.current?.getColumn("createdDate")?.getFilterValue() as DateRange | undefined}
            onChange={(newDateRange) => tableRef.current?.getColumn("createdDate")?.setFilterValue(newDateRange)}
            className="w-full"
            placeholder="Дата создания"
            />
            <DatePickerWithRange
            value={tableRef.current?.getColumn("activityDate")?.getFilterValue() as DateRange | undefined}
            onChange={(newDateRange) => tableRef.current?.getColumn("activityDate")?.setFilterValue(newDateRange)}
            className="w-full"
            placeholder="Дата последней активности"
            />
          </div>
        </DataTable>
      </div>
    );
}
