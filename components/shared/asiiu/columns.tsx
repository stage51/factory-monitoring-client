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

export type Sensor = {
    id: number
    taxpayerNumber: string
    sensorNumber: string
}

export type FiveMinuteReport = {
    id: number
    sensor: Sensor
    position: Position
    createdAt: Date
    updatedAt: Date
    status: "Неизвестно" | "Принято в РАР" | "Не принято в РАР" | "Принято в УТМ" | "Не принято в УТМ"
}

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

export type Position = {
    id: number
    product: Product
    controlDate: Date
    vbsControl: number
    aControl: number
    percentAlc: number
    bottleCountControl: number
    temperature: number
    mode: "Промывка" | "Калибровка" | "Тех. прогон" | "Производство" | 
    "Остановка" | "Прием (возврат)" | "Прием" | "Внутреннее перемещение" | "Отгрузка" | "Отгрузка (возврат)" | "Другие цели"
}

export const mobileHeaders = [
    "Дата/время",
    "Сенсор",
    "Объем спирта",
    "Объем",
    "Концентрация",
    "Кол-во",
    "Температура",
    "Код режима",
    "Статус",
    "Продукт"
  ];
export const visibleHeaders = ["Дата/время", "Сенсор", "Объем", "Код режима", "Статус"];


export const columns: ColumnDef<FiveMinuteReport>[] = [
    {
        accessorKey: "controlDate",
        header: ({ column }) => {
            return (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Дата/время
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
            )
        },
        cell: ({ row }) => {
            const date = new Date(row.original.position.controlDate);
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
        accessorKey: "vbsControl",
        header: "Объем спирта",
        cell: ({ row }) => {
            return row.original.position.vbsControl
        }
    },
    {
        accessorKey: "aControl",
        header: "Объем",
        cell: ({ row }) => {
            return row.original.position.aControl
        }
    },
    {
        accessorKey: "percentAlc",
        header: "Концентрация",
        cell: ({ row }) => {
            return row.original.position.percentAlc
        }
    },
    {
        accessorKey: "bottleCountControl",
        header: "Кол-во",
        cell: ({ row }) => {
            return row.original.position.bottleCountControl
        }
    },
    {
        accessorKey: "temperature",
        header: "Температура",
        cell: ({ row }) => {
            return row.original.position.temperature
        }
    },
    {
        accessorKey: "mode",
        header: "Режим",
        cell: ({ row }) => {
            return row.original.position.mode
        }
    },
    {
        accessorKey: "status",
        header: "Статус",
        cell: ({ row }) => {
            return row.original.status
        }
    },
    {
        id: "product",
        accessorKey: "product",
        header: "Продукт",
        cell: ({ row }) => {
          const report = row.original
          const product = report.position.product
     
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
                    <span className="text-sm text-muted-foreground">{product.shortName}</span>
                    <span className="text-sm">Код: {product.alcCode}</span>
                    <span className="text-sm">Объем: {product.capacity} L</span>
                    <span className="text-sm">Алк. объем: {product.alcVolume} L</span>
                    <span className="text-sm">Тип: {product.unitType}</span>
                    <span className="text-sm">Вид: {product.type}</span>
                    <span className="text-sm">Код продукта: {product.productVCode}</span>
                    </div>
                </PopoverContent>
            </Popover>
          );
        },
    }
]
