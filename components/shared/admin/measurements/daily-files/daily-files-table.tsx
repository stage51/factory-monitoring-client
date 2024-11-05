"use client";
import { testData } from "./test-data";
import { useState, useEffect, useRef } from "react";
import { DataTable } from "../../table/data-table";
import { generateColumnsWithObject } from "../../table/columns";
import { ColumnDef } from "@tanstack/react-table";
import InputFilter from "../../table/input-filter";
import DateFilter from "../../table/date-filter";
import SelectFilter from "../../table/select-filter";

export default function DailyFilesTable() {  
    const [data, setData] = useState<typeof testData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const tableRef = useRef<any>(null);

    const headers: Array<{ key: keyof HeadersTypes; label: string }> = [
      { key: "id", label: "ID" },
      { key: "organization", label: "Организация" },
      { key: "govNumber", label: "Гос номер" },
      { key: "serialNumber", label: "Серийный номер"},
      { key: "guid", label: "GUID"},
      { key: "line", label: "Линия" },
      { key: "reportDate", label: "Отчетная дата" },
      { key: "utmStatus", label: "Ответ с УТМ"},
      { key: "rarStatus", label: "Ответ из РАР"},
      { key: "details", label: "Детали отчетности" }
    ];

    const visibleHeaders = [
      "ID",
      "Организация",
      "Гос номер",
      "Отчетная дата",
      "Ответ с УТМ",
      "Ответ из РАР"
    ];

    type HeadersTypes = {
      id: number;
      organization: string;
      govNumber: string;
      serialNumber: string;
      guid: string;
      line: string;
      reportDate: Date;
      utmStatus: string;
      rarStatus: string;
      details: Details;
    };

    type Details = {
      id: number;
      utmStatus: string;
      utmStatusDate: Date;
      rarStatus: string;
      rarStatusDate: Date;
      serverDate: Date;
    };

    const detailsHeaders: Array<{ key: keyof Details; label: string }> = [
      { key: "id", label: "ID" },
      { key: "utmStatus", label: "Статус УТМ" },
      { key: "utmStatusDate", label: "Дата оправки на УТМ" },
      { key: "rarStatus", label: "Статус РАР" },
      { key: "rarStatusDate", label: "Дата отправки на РАР" },
      { key: "serverDate", label: "Время принятия данных сервером"},
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
            <DateFilter placeholder="Отчетная дата" column="reportDate" table={tableRef}/>
            <SelectFilter placeholder='Выберите линию' column="line" values={["Приемка", "Отгрузка"]} table={tableRef} />
          </div>
        </DataTable>
      </div>
    );
}
