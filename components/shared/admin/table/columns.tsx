import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { DateRange } from "react-day-picker";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "../../date-picker";

interface Props<HeadersTypes> {
    headers: Array<{ key: keyof HeadersTypes; label: string }>;
    editable?: boolean;
}

export default function generateColumns<HeadersTypes>({ headers, editable = true }: Props<HeadersTypes>) {
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
    editable && columns.push({
        id: "actions",
        accessorKey: "acrions",
        header: "Действия",
        cell: ({ row }) => {
            const data = row.original as HeadersTypes;
            const [isOpen, setIsOpen] = useState(false);

            const handleDelete = () => {
                setIsOpen(false);
                console.log("Deleted item:", data);
            };

            return (
                <Dialog open={isOpen} onOpenChange={setIsOpen}>
                    <DialogTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0" onClick={() => setIsOpen(true)}>
                            <span className="sr-only">Открыть диалог</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[600px]">
                        <DialogHeader className="gap-2">
                            <DialogTitle>Редактирование</DialogTitle>
                            <DialogDescription>
                                Редактирование элемента
                            </DialogDescription>
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
                                                value={data[key]}
                                                className="col-span-3 w-full"
                                            />
                                        ) : (<>
                                            {typeof data[key] === "boolean" ? (
                                                <Select>
                                                    <SelectTrigger className="col-span-3">
                                                        <SelectValue placeholder={data[key] == true ? ("Да") : ("Нет")} />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="true">Да</SelectItem>
                                                        <SelectItem value="false">Нет</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            ) :
                                            (<Input
                                                id={key.toString()}
                                                defaultValue={String(data[key])}
                                                className="col-span-3"
                                            />)}
                                        </>)}
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
                                        <DialogDescription>
                                            Вы действительно хотите удалить элемент?
                                        </DialogDescription>
                                    </DialogHeader >
                                    <DialogFooter className="justify-between gap-2">
                                        <DialogClose asChild>
                                            <Button variant="destructive" type="submit" onClick={handleDelete}>Удалить</Button>
                                        </DialogClose>
                                        <DialogClose asChild>
                                            <Button variant="outline">Отмена</Button>
                                        </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                            <DialogClose asChild>
                                <Button variant="default" type="submit">Сохранить</Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            );
        },
    });

    return columns;
}
