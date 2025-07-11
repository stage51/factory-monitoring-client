"use client"

import * as React from "react"
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
  PaginationState,
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
  visibleHeaders : string[]
  mobileHeaders : string[]
  dataList: any[]
}

export function EmbeddedDataTable<TData, TValue>({
    columns,
    visibleHeaders,
    mobileHeaders,
    dataList
}: DataTableProps<TData, TValue> & { isLoading?: boolean }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [data, setData] = React.useState<TData[]>([]);
  const [isMobile, setIsMobile] = React.useState<boolean>(false);
  const [isLoading, setLoading] = React.useState<boolean>(true);
  const [openRow, setOpenRow] = React.useState<string>()

  React.useEffect(() => {
    setData(dataList as TData[]);
    setLoading(false);
  }, [sorting]);

  const table = useReactTable({
    data,
    columns,
    manualSorting: true,
    manualFiltering: true,
    manualPagination: true,
    state: {
      sorting,
      columnFilters
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  React.useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1600);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div>
      <ScrollArea className="h-[600px]">
      {/* Таблица для мобильных устройств */}
      {isMobile ? (
        isLoading ? (
          <>
            {[...Array(5)].map((_, index) => (
              <div key={index} className="flex flex-col border-b p-4 gap-2">
                {[...Array(visibleHeaders.length)].map((_, cellIndex) => (
                  <Skeleton key={cellIndex} className="h-4 w-full" />
                ))}
              </div>
            ))}
          </>
        ) : (
          <>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <div key={row.id} className="flex flex-col border-b p-4 gap-2">
                  <Collapsible open={openRow === row.id} onOpenChange={() => setOpenRow(openRow === row.id ? null : row.id)}>
                    <CollapsibleTrigger className="w-full group">
                      {row.getVisibleCells().map((cell, index) => {
                        if (visibleHeaders.includes(mobileHeaders[index])) {
                          return (
                            <div key={cell.id} className="flex justify-between">
                              <span className="font-normal text-left">{mobileHeaders[index]}:</span>
                              <span className="font-light text-right">{flexRender(cell.column.columnDef.cell, cell.getContext())}</span>
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
                              <span className="font-normal text-left">{mobileHeaders[index]}:</span>
                              <span className="font-light text-right">{flexRender(cell.column.columnDef.cell, cell.getContext())}</span>
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
          </>
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
      </ScrollArea>
    </div>
  );
}

