"use client"

import * as React from "react"
import { DataTablePagination } from "@/components/shared/table/data-table-pagination";
import { DatePickerWithRange } from "@/components/shared/date-range-picker"
import { DateRange } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
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
  children? : React.ReactNode
  columns: ColumnDef<TData, TValue>[]
  isLoading : boolean
  visibleHeaders : string[]
  defaultHeaders : string[]
  className? : string
  fetchData: (filters: any, dateRanges: any, pagination: { page: number; size: number }) => Promise<any>;
}

export const DataTable = React.forwardRef(function DataTable<TData, TValue>(
  {
    children,
    columns,
    isLoading,
    visibleHeaders,
    defaultHeaders: mobileHeaders,
    className,
    fetchData,
}: DataTableProps<TData, TValue> & { isLoading?: boolean },
  ref: React.Ref<any>) 
  {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [isMobile, setIsMobile] = React.useState<boolean>(false);
  const [openRow, setOpenRow] = React.useState<string | null>(null);
  const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({})
  const [pagination, setPagination] = React.useState<PaginationState>({ pageIndex: 0, pageSize: 10});
  const [totalPages, setTotalPages] = React.useState<number>(0)
  const [totalElements, setTotalElements] = React.useState<number>(0)
  const [data, setData] = React.useState<TData[]>([]);
  
  const table = useReactTable({
    rowCount: totalElements,
    pageCount: totalPages,
    manualSorting: true,
    manualFiltering: true,
    manualPagination: true,
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    //getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    //getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      pagination
    },
    onPaginationChange: setPagination,
    //getPaginationRowModel: getPaginationRowModel(),
  });
  React.useImperativeHandle(ref, () => table, [table]);

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

  const loadData = async () => {
    try {
      const response = await fetchData(pagination, sorting, columnFilters);
      setData(response.content || []);
      setTotalPages(response.totalPages)
      setTotalElements(response.totalElements)
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  React.useEffect(() => {
    loadData();
  }, [pagination.pageIndex, pagination.pageSize, sorting, columnFilters]);

  return (
    <div>
      <div className={cn("flex lg:flex-row flex-col items-start py-4 gap-4", className)}>
        {children}
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
                        if (index > mobileHeaders.length - 1){
                          return (
                            <div className="flex justify-between">
                              <span className="font-normal">Действия:</span>
                              <span className="font-light">{flexRender(cell.column.columnDef.cell, cell.getContext())}</span>
                            </div>
                          );
                        }
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
)

