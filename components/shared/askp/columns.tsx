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
    crotonaldehyde: number
    toluene: number
}

export type askpReport = {
    id: number
    product: Product
    controlDate: Date
    vbsControl: number
    aControl: number
    percentAlc: number
    bottleCountControl: number
    temperature: number
    mode: "Промывка АСИиУ" | "Калибровка АСИиУ" | "Технологический прогон" | "Производство продукции" | 
    "Остановка АСИиУ" | "Прием (возврат)" | "Прием (закупка)" | "Внутреннее перемещение" | "Отгрузка (покупателю)" | "Отгрузка (возврат)"
    status: "Неизвестно" | "Принято в РАР" | "Не принято в РАР" | "Принято в УТМ" | "Не принято в УТМ"
}

export const mobileHeaders = [
    "Дата/время",
    "Объем спирта",
    "Объем",
    "Концентрация",
    "Кол-во",
    "Температура",
    "Код режима",
    "Статус",
    "Продукт"
  ];
export const visibleHeaders = ["Дата/время", "Объем", "Код режима", "Статус"];


export const columns: ColumnDef<askpReport>[] = [
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
            const date = new Date(row.original.controlDate);
            return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
        }
    },
    {
        accessorKey: "vbsControl",
        header: "Объем спирта",
    },
    {
        accessorKey: "aControl",
        header: "Объем",
    },
    {
        accessorKey: "percentAlc",
        header: "Концентрация",
    },
    {
        accessorKey: "bottleCountControl",
        header: "Кол-во",
    },
    {
        accessorKey: "temperature",
        header: "Температура",
    },
    {
        accessorKey: "mode",
        header: "Код режима",
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
          const report = row.original
          const product = report.product
     
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
                    <span className="text-sm">Кротоноальдегид: {product.crotonaldehyde} %</span>
                    <span className="text-sm">Толуол: {product.toluene} %</span>
                    </div>
                </PopoverContent>
            </Popover>
          );
        },
    }
]
