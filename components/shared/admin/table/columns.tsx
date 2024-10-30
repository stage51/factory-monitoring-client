"use client";

import { ColumnDef } from "@tanstack/react-table";
import { DateRange } from "react-day-picker";
import { MoreHorizontal } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

interface Props<HeadersTypes> {
    headers: Array<{ key: keyof HeadersTypes; label: string }>;
}

export default function generateColumns<HeadersTypes>({ headers }: Props<HeadersTypes>) {
    const columns: ColumnDef<HeadersTypes>[] = headers.map(({ key, label }) => ({
        accessorKey: key,
        header: label,
        cell: ({ row }) => {
            const original = row.original as HeadersTypes;
            const value = original[key];

            if (typeof value === "boolean") {
                return value ? "Да" : "Нет";
            } else if (value instanceof Date) {
                return value.toLocaleString();
            } else {
                return value;
            }
        },
        filterFn: (row, columnId, filterValue) => {
            const value = row.getValue(columnId);
            if (value instanceof Date) {
                const date = value as Date;
                const { from, to } = filterValue as DateRange;

                return (!from || date >= from) && (!to || date <= to);
            } else if (typeof value === "string") {
                const filterStr = filterValue as string;
                return filterStr ? value.toLowerCase().includes(filterStr.toLowerCase()) : true;
            }
            return false; 
        },
    }));
    columns.push(
        {
            id: "actions",
            cell: ({ row }) => {
              const data = row.original as HeadersTypes
         
              return (
                <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Открыть диалог</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader>
                            <DialogTitle>Редактирование</DialogTitle>
                            <DialogDescription>
                                Make changes to your profile here. Click save when you're done.
                            </DialogDescription>
                            </DialogHeader>
                            <div className="grid gap-4 py-4">
                                {headers.map(({key, label}) => (
                                    (key != "id") ? (
                                        <div className="grid grid-cols-4 items-center gap-4">
                                            <Label htmlFor={key.toString()} className="text-right">
                                                {label}
                                            </Label>
                                            <Input
                                            id={key.toString()}
                                            defaultValue={data[key] as string}
                                            className="col-span-3"
                                            />
                                        </div>
                                    ) : (<></>)
                                ))}
                            </div>
                            <DialogFooter className="justify-between">
                                <Button variant="default">Сохранить</Button>
                                <Button variant="destructive">Удалить</Button>
                            </DialogFooter>
                        </DialogContent>
                </Dialog>
              )
            },
        },
    )

    return columns;
}
