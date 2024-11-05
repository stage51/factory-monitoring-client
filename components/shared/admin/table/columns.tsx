import { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose
} from "@/components/ui/dialog";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "../../date-picker";
import { DateRange } from "react-day-picker";

interface Props<HeadersTypes> {
    headers: Array<{ key: keyof HeadersTypes; label: string }>;
    editable?: boolean;
}

function EditDialog<HeadersTypes>({ data, headers }: { data: HeadersTypes; headers: Array<{ key: keyof HeadersTypes; label: string }> }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleDelete = () => {
        setIsOpen(false);
        console.log("Deleted item:", data);
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                    <span className="sr-only">Открыть диалог</span>
                    <MoreHorizontal className="h-4 w-4" />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader className="gap-2">
                    <DialogTitle>Редактирование</DialogTitle>
                    <DialogDescription>Редактирование элемента</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    {headers.map(({ key, label }) =>
                        key !== "id" ? (
                            <div key={key.toString()} className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor={key.toString()} className="text-right">
                                    {label}
                                </Label>
                                {data[key] instanceof Date ? (
                                    <DatePicker
                                        value={data[key] as Date} 
                                        className="col-span-3 w-full" 
                                    />
                                ) : (
                                    <>
                                        {typeof data[key] === "boolean" ? (
                                            <Select>
                                                <SelectTrigger className="col-span-3">
                                                    <SelectValue placeholder={data[key] ? "Да" : "Нет"} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="true">Да</SelectItem>
                                                    <SelectItem value="false">Нет</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        ) : (
                                            <Input id={key.toString()} defaultValue={String(data[key])} className="col-span-3" />
                                        )}
                                    </>
                                )}
                            </div>
                        ) : null
                    )}
                </div>
                <DialogFooter className="justify-between gap-2">
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="destructive">Удалить</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader className="gap-2">
                                <DialogTitle>Удаление</DialogTitle>
                                <DialogDescription>Вы действительно хотите удалить элемент?</DialogDescription>
                            </DialogHeader>
                            <DialogFooter className="justify-between gap-2">
                                <DialogClose asChild>
                                    <Button variant="destructive" onClick={handleDelete}>Удалить</Button>
                                </DialogClose>
                                <DialogClose asChild>
                                    <Button variant="outline">Отмена</Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <DialogClose asChild>
                        <Button variant="default">Сохранить</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}


export default function generateColumns<HeadersTypes>({ headers, editable = true }: Props<HeadersTypes>) {
    const columns = headers.map(({ key, label }) => ({
        id: key,
        accessorKey: key,
        header: label,
        cell: ({ row }) => {
            const original = row.original as HeadersTypes;
            const value = original[key];
            if (typeof value === "boolean") return value ? "Да" : "Нет";
            if (value instanceof Date) return value.toLocaleString();
            return value;
        },
        filterFn: (row, columnId, filterValue) => {
            const value = row.getValue(columnId);
            if (value instanceof Date) {
                const { from, to } = filterValue as DateRange;
                return (!from || value >= from) && (!to || value <= to);
            } else if (typeof value === "string") {
                return filterValue ? value.toLowerCase().includes(filterValue.toLowerCase()) : true;
            }
            return false;
        },
    }));

    if (editable) {
        columns.push({
            id: "actions",
            accessorKey: "actions",
            header: "Действия",
            cell: ({ row }) => (
                <EditDialog 
                    data={row.original as HeadersTypes} 
                    headers={headers}
                    onChange={(key, value) => {
                        row.original[key] = value;
                    }}
                />
            ) as HeadersTypes[keyof HeadersTypes],
        });
    }

    return columns;
}
