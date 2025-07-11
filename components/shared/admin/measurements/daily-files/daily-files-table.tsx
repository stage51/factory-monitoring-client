"use client";
import { testData } from "./test-data";
import { useState, useEffect, useRef } from "react";
import { DataTable } from "../../table/data-table";
import generateColumns, { generateColumnsWithCustomActions, generateColumnsWithObject } from "../../table/columns";
import { ColumnDef, ColumnFiltersState, PaginationState, SortingState } from "@tanstack/react-table";
import InputFilter from "../../table/input-filter";
import DateFilter from "../../table/date-filter";
import SelectFilter from "../../table/select-filter";
import apiClient from "@/components/shared/services/auth/api-client";
import { DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/hooks/use-toast";
import { Download } from "lucide-react";

export default function DailyFilesTable() {  
  const [isLoading, setIsLoading] = useState(true);
  const tableRef = useRef<any>(null);
  const { toast } = useToast();

  const headers: Array<{ key: keyof CustomDailyReport; label: string; sortable: boolean }> = [
    { key: "id", label: "ID", sortable: false },
    { key: "createdAt", label: "Создан в", sortable: false},
    { key: "updatedAt", label: "Изменен в", sortable: false},
    { key: "taxpayerNumber", label: "ИНН", sortable: false},
    { key: "sensorNumber", label: "Сенсор", sortable: false},
    { key: "status", label: "Статус", sortable: false }
  ];

  const visibleHeaders = [
    "ID",
    "Создан в",
    "Статус"
  ];

  type Product = {
      id: number
      unitType: "Фасованная" | "Нефасованная"
      type: "Алкогольная продукция" | "Спиртосодержащая пищевая продукция" | "Спиртосодержащая непищевая продукция" | "Этиловый спирт"
      fullName: string
      shortName: string
      alcCode: string
      capacity: number
      alcVolume: number
      productVCode: string
  }

 type Sensor = {
      id: number
      taxpayerNumber: string
      sensorNumber: string
  }

  type DailyReport = {
      id: number
      sensor: Sensor
      positions: Position[]
      createdAt: Date
      updatedAt: Date
      status: "Неизвестно" | "Принято в РАР" | "Не принято в РАР" | "Принято в УТМ" | "Не принято в УТМ"
  }

  type CustomDailyReport = {
      id: number
      positions: Position[]
      createdAt: Date
      updatedAt: Date
      taxpayerNumber: string
      sensorNumber: string
      status: "Неизвестно" | "Принято в РАР" | "Не принято в РАР" | "Принято в УТМ" | "Не принято в УТМ"
  }

  type Position = {
      id: number
      product: Product
      startDate: Date
      endDate: Date
      vbsStart: number
      vbsEnd: number
      aStart: number
      aEnd: number
      percentAlc: number
      bottleCountStart: number
      bottleCountEnd: number
      temperature: number
      mode: "Промывка" | "Калибровка" | "Тех. прогон" | "Производство" | 
      "Остановка" | "Прием (возврат)" | "Прием" | "Внутреннее перемещение" | "Отгрузка" | "Отгрузка (возврат)" | "Другие цели",
  }

  const productHeaders: Array<{ key: keyof Product; label: string }> = [
    { key: "id", label: "ID" },
    { key: "unitType", label: "Тип" },
    { key: "type", label: "Вид" },
    { key: "fullName", label: "Имя" },
    { key: "shortName", label: "Короткое имя" },
    { key: "alcCode", label: "Код" },
    { key: "capacity", label: "Объем" },
    { key: "alcVolume", label: "Алк. объем" },
    { key: "productVCode", label: "Код продукта"},
  ];

  const positionHeaders: Array<{ key: keyof Position; label: string }> = [
    { key: "id", label: "ID"},
    { key: "startDate", label: "Начало" },
    { key: "endDate", label: "Конец" },
    { key: "vbsStart", label: "Объем безводного спирта в начале" },
    { key: "vbsEnd", label: "Объем безводного спирта в конце" },
    { key: "aStart", label: "Объем готовой продукции в начале" },
    { key: "aEnd", label: "Объем готовой продукции в конце"},
    { key: "percentAlc", label: "Концентрация спирта" },
    { key: "bottleCountStart", label: "Кол-во в начале"},
    { key: "bottleCountEnd", label: "Кол-во в конце" },
    { key: "temperature", label: "Температура" },
    { key: "mode", label: "Режим"},
    { key: "product", label: "Продукт"}
  ];
  
  const positionVisibleHeaders = [
    "ID",
    "Начало",
    "Конец",
  ];

  const fetchData = async (pagination : PaginationState, sorting : SortingState, columnFilters : ColumnFiltersState) => {
    setIsLoading(true);
    try {
      const response = await apiClient.post(`/factory-monitoring/daily-report/fetch`, {
        size: pagination.pageSize,
        number: pagination.pageIndex,
        sortBy: sorting[0]?.id,
        sortDirection: sorting[0]?.desc ? "DESC" : "ASC",
        filters: Object.fromEntries(
          columnFilters
            .filter(filter => !["startDate", "endDate"].includes(filter.id))
            .map(filter => [filter.id, filter.value])
        ),
        dateRanges: Object.fromEntries(
          columnFilters
            .filter(filter => ["startDate", "endDate"].includes(filter.id))
            .map(filter => {
              const from = (filter.value as any)?.from
                ? new Date((filter.value as any)?.from).toISOString()
                : "null";
              const to = (filter.value as any)?.to
                ? new Date((filter.value as any)?.to).toISOString()
                : "null";
              return [filter.id, `${from},${to}`];
            })
        )
      });
      setIsLoading(false);
      return {
        ...response.data,
        content: map(response.data.content)
      };
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  const map = (dailyReports: DailyReport[]): CustomDailyReport[] => {
    return dailyReports.map((dailyReport) => ({
      id: dailyReport.id,
      positions: dailyReport.positions,
      createdAt: dailyReport.createdAt,
      updatedAt: dailyReport.updatedAt,
      taxpayerNumber: dailyReport.sensor.taxpayerNumber,
      sensorNumber: dailyReport.sensor.sensorNumber,
      sensor: dailyReport.sensor,
      status: dailyReport.status
    }));
  };


  const handleUpdate = async (id : string | number, updatedData : any) => {
    try {
      const response = await apiClient.put(`/factory-monitoring/daily-report/${id}`, updatedData);
      return response.data;
    } catch (error) {
      console.error("Error updating data:", error);
      throw error;
    }
  };

  const handleDelete = async (id : string | number) => {
    try {
      await apiClient.delete(`/factory-monitoring/daily-report/${id}`);
    } catch (error) {
      console.error("Error deleting data:", error);
      throw error;
    }
  };

  const handleDownload = async (id: string | number) => {
    try {
      const response = await apiClient.get(`/factory-monitoring/daily-report/${id}/download`, {
        responseType: 'blob',
      });

      const contentDisposition = response.headers['content-disposition'];
      let filename = 'report.xml';
      if (contentDisposition && contentDisposition.includes('filename=')) {
        filename = contentDisposition.split('filename=')[1].split(';')[0].replace(/"/g, '');
      }

      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error: any) {
      if (error.response?.status === 500) {
        toast({
          title: "Ошибка скачивания файла",
          variant: "destructive",
          description: "Ошибка скачивания XML-отчета",
        });
      } else {
        toast({
          title: "Произошла ошибка",
          variant: "destructive",
          description: "Не удалось загрузить отчет",
        });
        console.error("Ошибка при скачивании отчета:", error);
      }
    }
  }

  const customActions = (data : any) => (
      <>
        <DialogClose asChild>
          <Button onClick={() => handleDownload(data.id)}>Скачать</Button>
        </DialogClose>
      </>
  );

  const customIcon = () => (
    <Download className="h-4 w-4"/>
  )


  return (
    <div className="gap-8 flex flex-col">
      <DataTable
        ref={tableRef}
        columns={generateColumnsWithCustomActions<CustomDailyReport>({ headers, title : "Скачивание файла", description : "Вы ходите звгрузить XML-файл отчета?", renderCustomActions : customActions, columnName : "Скачать файл", columnIcon : customIcon}) as ColumnDef<unknown, unknown>[]}
        fetchData={fetchData}
        isLoading={isLoading}
        visibleHeaders={visibleHeaders}
        defaultHeaders={headers.map((h) => h.label)}
        isEmbedded={true}
        embeddedColumns={generateColumnsWithObject<Position, Product>({ headers : positionHeaders, objectHeaders : productHeaders, editable : false })}
        embeddedVisibleHeaders={positionVisibleHeaders}
        embeddedMobileHeaders={positionHeaders.map((h) => h.label)}
      >
        <div className="flex flex-col w-full gap-4">
          <InputFilter placeholder='Поиск по коду продукта' column="product" table={tableRef} />
          <SelectFilter table={tableRef} column="status" placeholder="Выберите статус" values={["Неизвестно", "Принято в РАР", "Не принято в РАР", "Принято в УТМ", "Не принято в УТМ"]}/>
        </div>
        <div className="flex flex-col w-full gap-4">
          <DateFilter placeholder="Начальная дата" column="startDate" table={tableRef}/>
          <DateFilter placeholder="Конечная дата" column="endDate" table={tableRef}/>
        </div>
      </DataTable>
    </div>
  );
}
