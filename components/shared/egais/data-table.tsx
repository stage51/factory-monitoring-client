"use client"

import * as React from "react"
import { DataTablePagination } from "../table/data-table-pagination";
import { DatePickerWithRange } from "../date-range-picker"
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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
  VisibilityState,
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
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { ScrollArea } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton";


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  isLoading : boolean
  visibleHeaders : string[]
  mobileHeaders : string[]
}

export function DataTable<TData, TValue>({
    columns,
    data,
    isLoading,
    visibleHeaders,
    mobileHeaders,
}: DataTableProps<TData, TValue> & { isLoading?: boolean }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [isMobile, setIsMobile] = React.useState<boolean>(false);
  const [openRow, setOpenRow] = React.useState<string | null>(null);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
    },
    getPaginationRowModel: getPaginationRowModel(),
  });

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <div className="flex lg:flex-row flex-col items-center py-4 gap-4">
        <Input
          placeholder="Код продукта"
          value={(table.getColumn("product")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("product")?.setFilterValue(event.target.value)
          }
          className="w-full"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="hidden md:flex lg:max-w-[250px] w-full">
              Колонки
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter(
                (column) => column.getCanHide()
              )
              .map((column, index) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {mobileHeaders.at(index)}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex lg:flex-row flex-col items-center pb-4 gap-4">
        {/* Селекторы для фильтров */}
        <Select
          onValueChange={(value) => {
            if (value === "all") {
              table.getColumn("mode")?.setFilterValue(undefined);
            } else {
              table.getColumn("mode")?.setFilterValue(value);
            }
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Режим" />
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
        <Select
          onValueChange={(value) => {
            if (value === "all") {
              table.getColumn("status")?.setFilterValue(undefined);
            } else {
              table.getColumn("status")?.setFilterValue(value);
            }
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Статус" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все</SelectItem>
            <SelectItem value="Неизвестно">Неизвестно</SelectItem>
            <SelectItem value="Принято в УТМ">Принято в УТМ</SelectItem>
            <SelectItem value="Не принято в УТМ">Не принято в УТМ</SelectItem>
            <SelectItem value="Принято в РАР">Принято в РАР</SelectItem>
            <SelectItem value="Не принято в РАР">Не принято в РАР</SelectItem>
          </SelectContent>
        </Select>
        <DatePickerWithRange
          value={table.getColumn("startDate")?.getFilterValue() as DateRange | undefined}
          onChange={(newDateRange) => table.getColumn("startDate")?.setFilterValue(newDateRange)}
          className="lg:max-w-sm max-w-none w-full"
          placeholder="Начальная дата"
        />
        <DatePickerWithRange
          value={table.getColumn("endDate")?.getFilterValue() as DateRange | undefined}
          onChange={(newDateRange) => table.getColumn("endDate")?.setFilterValue(newDateRange)}
          className="lg:max-w-sm max-w-none w-full"
          placeholder="Конечная дата"
        />
      </div>

      {/* Таблица для мобильных устройств */}
      {isMobile ? (
        isLoading ? (
          <ScrollArea className="h-[400px]">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex flex-col border-b p-4 gap-2">
                {[...Array(visibleHeaders.length)].map((_, cellIndex) => (
                  <Skeleton key={cellIndex} className="h-4 w-full" />
                ))}
              </div>
            ))}
          </ScrollArea>
        ) : (
          <ScrollArea className="h-[400px]">
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <div key={row.id} className="flex flex-col border-b p-4 gap-2">
                  <Collapsible open={openRow === row.id} onOpenChange={() => setOpenRow(openRow === row.id ? null : row.id)}>
                    <CollapsibleTrigger className="w-full group">
                      {row.getVisibleCells().map((cell, index) => {
                        if (visibleHeaders.includes(mobileHeaders[index])) {
                          return (
                            <div key={cell.id} className="flex justify-between">
                              <span className="font-normal">{mobileHeaders[index]}:</span>
                              <span className="font-light">{flexRender(cell.column.columnDef.cell, cell.getContext())}</span>
                            </div>
                          );
                        }
                        return null;
                      })}
                      {openRow !== row.id && (
                        <p className="font-light text-center mt-2 group-hover:animate-spin-element">
                          Развернуть
                        </p>
                      )}
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
              ))
            ) : (
              <div className="flex items-center justify-center h-full">
                <p className="font-light text-gray-500">Нет данных</p>
              </div>
            )}
          </ScrollArea>
        )
      ) : (
        <div className="rounded-md border">
          {isLoading ? (
            <Table>
              <TableHeader>
                <TableRow>
                  {columns.map((_, index) => (
                    <TableHead key={index}>
                      <Skeleton className="h-4 w-24" />
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {[...Array(5)].map((_, rowIndex) => (
                  <TableRow key={rowIndex}>
                    {columns.map((_, colIndex) => (
                      <TableCell key={colIndex}>
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          ) : (
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
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
          )}
        </div>
      )}

      <DataTablePagination className="mt-4" table={table} />
    </div>
  );
}

