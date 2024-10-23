"use client"

import * as React from "react"
import { DataTablePagination } from "./data-table-pagination";
import { DatePickerWithRange } from "../date-range-picker"
import { DateRange } from "react-day-picker";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  SortingState,
  getSortedRowModel,
  ColumnFiltersState,
  getFilteredRowModel,
  getPaginationRowModel,
} from "@tanstack/react-table"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { ScrollArea } from "@/components/ui/scroll-area"


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [isMobile, setIsMobile] = React.useState<boolean>(false)

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
    getPaginationRowModel: getPaginationRowModel(),
  })

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize() // Проверяем размер при монтировании
    window.addEventListener("resize", handleResize)

    return () => {
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  const mobileHeaders = [
    "Дата/время",
    "Объем спирта",
    "Объем",
    "Концентрация",
    "Кол-во",
    "Температура",
    "Код режима",
    "Продукт"
  ];
  var visibleHeaders = [
    "Дата/время",
    "Объем",
    "Код режима",
  ]

  return (
    <div>
      <div className="flex items-center py-4 gap-4">
          <Select onValueChange={(value) => {
              if (value == "all") { 
                  table.getColumn("mode")?.setFilterValue(undefined) 
              } else { table.getColumn("mode")?.setFilterValue(value) }
            }
          }>
            <SelectTrigger>
              <SelectValue placeholder="Выберите режим"></SelectValue>
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Все</SelectItem>
              <SelectItem value="Промывка АСИиУ">Промывка АСИиУ</SelectItem>
              <SelectItem value="Калибровка АСИиУ">Калибровка АСИиУ</SelectItem>
              <SelectItem value="Технологический прогон">Технологический прогон</SelectItem>
              <SelectItem value="Производство продукции">Производство продукции</SelectItem>
              <SelectItem value="Остановка АСИиУ">Остановка АСИиУ</SelectItem>
              <SelectItem value="Прием (возврат)">Прием (возврат)</SelectItem>
              <SelectItem value="Прием (закупка)">Прием (закупка)</SelectItem>
              <SelectItem value="Внутреннее перемещение">Внутреннее перемещение</SelectItem>
              <SelectItem value="Отгрузка (покупателю)">Отгрузка (покупателю)</SelectItem>
              <SelectItem value="Отгрузка (возврат)">Отгрузка (возврат)</SelectItem>
            </SelectContent>
          </Select>
          <DatePickerWithRange
            value={table.getColumn("controlDate")?.getFilterValue() as DateRange | undefined}
            onChange={(newDateRange) =>
              table.getColumn("controlDate")?.setFilterValue(newDateRange)
            }
            className="max-w-sm"
          />
      </div>
      
      {/* Отображение списка для мобильных устройств */}
      {isMobile ? (
        <ScrollArea className="h-[400px]">
          {table.getRowModel().rows.map((row) => (
            <div key={row.id} className="flex flex-col border-b p-4 gap-2">
              <Collapsible>
                <CollapsibleTrigger className="w-full">
                  {row.getVisibleCells().map((cell, index) => {
                    if (visibleHeaders.includes(mobileHeaders[index])) {
                      return (
                        <div>
                          <div key={cell.id} className="flex justify-between">
                            <span className="font-normal">{mobileHeaders[index]}:</span>
                            <span className="font-light">{flexRender(cell.column.columnDef.cell, cell.getContext())}</span>
                          </div>
                          <span className="font-light text-center">Развернуть</span>
                        </div>
                      );
                    }
                    return null;
                  })}
                </CollapsibleTrigger>
                <CollapsibleContent>
                  {row.getVisibleCells().map((cell, index) => {
                    if (!visibleHeaders.includes(mobileHeaders[index])) {
                      return (
                        <div key={cell.id} className="flex justify-between">
                          <span className="font-normal">{mobileHeaders[index]}:</span>
                          <span className="font-light">{flexRender(cell.column.columnDef.cell, cell.getContext())}</span>
                        </div>
                      );
                    }
                    return null;
                  })}
                </CollapsibleContent>
              </Collapsible>
            </div>
          ))}
        </ScrollArea>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    )
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    Нет данных
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      <DataTablePagination className="mt-4" table={table} />
    </div>
  )
}
