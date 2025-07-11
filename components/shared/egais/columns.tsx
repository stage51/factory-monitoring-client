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
    type: "Алкогольная продукция" | "Спиртосодержащая пищевая продукция" | "Спиртосодержащая непищевая продукция" | "Этиловый спирт"
    fullName: string
    shortName: string
    alcCode: string
    capacity: number
    alcVolume: number
    productVCode: string
}

export type Sensor = {
    id: number
    taxpayerNumber: string
    sensorNumber: string
}

export type DailyReport = {
    id: number
    sensor: Sensor
    positions: Position[]
    createdAt: Date
    updatedAt: Date
    status: "Неизвестно" | "Принято в РАР" | "Не принято в РАР" | "Принято в УТМ" | "Не принято в УТМ"
}

export type Position = {
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

export const mobileHeaders = [
    "Создан в",
    "Изменен в",
    "Сенсор",
    "Статус"
  ];

export const columns: ColumnDef<DailyReport>[] = [
    {
        accessorKey: "createdAt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Создан в
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const date = new Date(row.original.createdAt);
            return new ReadableDate(date.getTime()).toReadable();
        }
    },
    {
        accessorKey: "updatedAt",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    Изменен в
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const date = new Date(row.original.updatedAt);
            return new ReadableDate(date.getTime()).toReadable();
        }
    },
    {
        accessorKey: "sensorNumber",
        header: "Сенсор",
        cell: ({ row }) => {
            return row.original.sensor.sensorNumber
        }
    },
    {
        accessorKey: "status",
        header: "Статус",
    }
];
