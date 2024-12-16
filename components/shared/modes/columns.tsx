"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import { DateRange } from "react-day-picker";

import { Package } from "lucide-react"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { ReadableDate } from "../timezone/date";

export type Product = {
    id: number
    unitType: "Фасованная" | "Нефасованная"
    fullName: string
    alcCode: string
    productVCode: string
}

export type modesReport = {
    id: number
    sensorNumber: string
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
    mode: "Промывка АСИиУ" | "Калибровка АСИиУ" | "Технологический прогон" | "Производство продукции" | 
    "Остановка АСИиУ" | "Прием (возврат)" | "Прием (закупка)" | "Внутреннее перемещение" | "Отгрузка (покупателю)" | "Отгрузка (возврат)",
    status: "Неизвестно" | "Принято в РАР" | "Не принято в РАР" | "Принято в УТМ" | "Не принято в УТМ"
}

export const mobileHeaders = [
    "Начало измерений",
    "Конец измерений",
    "Объем безводнового спирта в начале",
    "Объем безводного спирта в конце",
    "Объем готовой продукции в начале",
    "Объем готовой продукции в конце",
    "Концентрация спирта",
    "Кол-во в начале",
    "Кол-во в конце",
    "Температура",
    "Код режима",
    "Статус",
    "Продукт"
  ];
export const visibleHeaders = ["Начало измерений", "Конец измерений", "Код режима", "Статус"];


export const columns: ColumnDef<modesReport>[] = [
    {
        accessorKey: "startDate",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Начало измерений
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const date = new Date(row.original.startDate);
            return new ReadableDate(date.getTime()).toReadable();
        }
    },
    {
        accessorKey: "endDate",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Конец измерений
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const date = new Date(row.original.endDate);
            return new ReadableDate(date.getTime()).toReadable();
        }
    },
    {
        accessorKey: "sensorNumber",
        header: "Сенсор",
    },
    {
        accessorKey: "vbsStart",
        header: "Объем безводного спирта в начале",
    },
    {
        accessorKey: "vbsEnd",
        header: "Объем безводного спирта в конце",
    },
    {
        accessorKey: "aStart",
        header: "Объем готовой продукции в начале",
    },
    {
        accessorKey: "aEnd",
        header: "Объем готовой продукции в конце",
    },
    {
        accessorKey: "percentAlc",
        header: "Концентрация спирта",
    },
    {
        accessorKey: "bottleCountStart",
        header: "Кол-во в начале",
    },
    {
        accessorKey: "bottleCountEnd",
        header: "Кол-во в конце",
    },
    {
        accessorKey: "temperature",
        header: "Температура",
    },
    {
        accessorKey: "mode",
        header: "Режим",
    },
    {
        accessorKey: "status",
        header: "Статус",
    },
    {
        id: "product",
        accessorKey: "product",
        header: "Продукт",
        cell: ({ row }) => {
            const report = row.original;
            const product = report.product;

            return (
                <Popover>
                    <PopoverTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 group">
                            <span className="sr-only">Продукт</span>
                            <Package className="h-4 w-4 flex group-hover:animate-spin-element" />
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent align="end">
                        <div className="flex flex-col gap-2">
                            <span className="font-semibold">{product.fullName}</span>
                            <span className="text-sm">Код: {product.alcCode}</span>
                            <span className="text-sm">Тип: {product.unitType}</span>
                            <span className="text-sm">Код продукта: {product.productVCode}</span>
                        </div>
                    </PopoverContent>
                </Popover>
            );
        },
    },
];
