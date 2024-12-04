import { useState, useEffect } from "react";
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
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
import { ArrowUpDown, Eye, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "../../date-picker";
import { DateRange } from "react-day-picker";


interface withObjectProps<HeadersTypes, ObjectHeaders> {
    headers: Array<{ key: keyof HeadersTypes; label: string; sortable?: boolean }>;
    editable?: boolean;
    objectHeaders?: Array<{ key: keyof ObjectHeaders; label: string }>;
    handleUpdate?: (id: number | string, data: HeadersTypes) => Promise<HeadersTypes>;
    handleDelete?: (id: number | string) => Promise<void>;
    
}

interface Props<HeadersTypes> {
    headers: Array<{ key: keyof HeadersTypes; label: string, sortable?: boolean }>;
    editable?: boolean;
    handleUpdate?: (id: number | string, data: HeadersTypes) => Promise<HeadersTypes>;
    handleDelete?: (id: number | string) => Promise<void>;
}

function EditDialog<HeadersTypes>({ data, headers, handleUpdate, handleDelete }: { 
    data: HeadersTypes; 
    headers: Array<{ key: keyof HeadersTypes; label: string; sortable?: boolean}> ;
    handleUpdate: (id: number | string, data: HeadersTypes) => Promise<HeadersTypes>;
    handleDelete: (id: number | string) => Promise<void>; 
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [editedData, setEditedData] = useState(data);  // Состояние для редактируемых данных

    // Обновляем состояние, если данные изменяются
    useEffect(() => {
        setEditedData(data);
    }, [data]);

    const handleFieldChange = (key: string, value: string | boolean | Date) => {
        setEditedData(prevData => ({
            ...prevData,
            [key]: value,
        }));
    };

    const updateRow = async (id: number | string, updatedData: HeadersTypes) => {
        try {
            await handleUpdate(id, updatedData);
            window.location.reload()
        } catch (error) {
            console.error("Error updating row:", error);
        }
    };

    const deleteRow = async (id: number | string) => {
        setIsOpen(false);
        try {
            await handleDelete(id);
            window.location.reload()
        } catch (error) {
            console.error("Error deleting row:", error);
        }
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
                        !["id", "product"].includes(key) ? (
                            <div key={key.toString()} className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor={key.toString()} className="text-right">
                                    {label}
                                </Label>
                                {editedData[key] instanceof Date ? (
                                    <DatePicker
                                        value={editedData[key] as Date} 
                                        onChange={(date) => handleFieldChange(key.toString(), date)}  // Обновляем состояние
                                        className="col-span-3 w-full" 
                                    />
                                ) : (
                                    <>
                                        {typeof editedData[key] === "boolean" ? (
                                            <Select 
                                                value={String(editedData[key])}
                                                onValueChange={(value) => handleFieldChange(key.toString(), value === 'true')}
                                            >
                                                <SelectTrigger className="col-span-3">
                                                    <SelectValue placeholder={editedData[key] ? "Да" : "Нет"} />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="true">Да</SelectItem>
                                                    <SelectItem value="false">Нет</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        ) : (
                                            <Input 
                                                id={key.toString()} 
                                                defaultValue={String(editedData[key])} 
                                                className="col-span-3" 
                                                onChange={(e) => handleFieldChange(key.toString(), e.target.value)}  // Обновляем состояние
                                            />
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
                                    <Button variant="destructive" onClick={() => deleteRow(editedData.id)}>Удалить</Button>
                                </DialogClose>
                                <DialogClose asChild>
                                    <Button variant="outline">Отмена</Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                    <DialogClose asChild>
                        <Button variant="default" onClick={() => updateRow(editedData.id, editedData)}>Сохранить</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}


export default function generateColumns<HeadersTypes>({ headers, editable = true, handleUpdate, handleDelete}: Props<HeadersTypes>) {
    const columns = headers.map(({ key, label, sortable }) => ({
        id: key,
        accessorKey: key,
        header: ({ column }) => {
            if (sortable) return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    {label}
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            )
            else return label
        },
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
                    handleUpdate={handleUpdate}
                    handleDelete={handleDelete}
                />
            ) as HeadersTypes[keyof HeadersTypes],
        });
    }


    return columns;
}

export function generateColumnsWithObject<HeadersTypes, ObjectHeaders>({ headers, editable = true,  objectHeaders, handleUpdate, handleDelete}: withObjectProps<HeadersTypes, ObjectHeaders>) {
    const columns = headers.map(({ key, label }) => ({
        id: key,
        accessorKey: key,
        header: label,
        cell: ({ row }) => {
            const original = row.original as HeadersTypes;
            const value = original[key];
            if (typeof value === "boolean") return value ? "Да" : "Нет";
            if (value instanceof Date) return value.toLocaleString();
            if (typeof value === "object") {
                return (
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 group">
                            <span className="sr-only">{label}</span>
                            <Eye className="h-4 w-4 flex group-hover:animate-spin-element" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent align="end">
                            <div className="flex flex-col gap-2">
                            <span className="font-semibold">{label}</span>
                            {objectHeaders?.map(({ key, label }) => {
                                const objectValue = (value as ObjectHeaders)[key];
                                return (
                                    <span key={key.toString()} className="text-sm">
                                        {label}: {String(objectValue)}
                                    </span>
                                );
                            })}
                            </div>
                        </PopoverContent>
                    </Popover>
          );
            }
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
                    handleUpdate={handleUpdate}
                    handleDelete={handleDelete}
                />
            ) as HeadersTypes[keyof HeadersTypes],
        });
    }

    return columns;
}

export function generateColumnsWithCustomActions<HeadersTypes>({
    headers,
    title,
    description,
    renderCustomActions,
}: {
    headers : Array<{ key: keyof HeadersTypes; label: string; sortable?: boolean }>;
    title: string;
    description: string;
    renderCustomActions: (row: HeadersTypes) => React.ReactNode;
}) {
    const columns = generateColumns<HeadersTypes>({headers, editable : false})

    columns.push({
        id: "actions",
        accessorKey: "actions",
        header: "Действия",
        cell: ({ row }) => {
            return (
                <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Открыть диалог</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[600px]">
                            <DialogHeader className="gap-2">
                                <DialogTitle>{title}</DialogTitle>
                                <DialogDescription>{description}</DialogDescription>
                            </DialogHeader>
                            <DialogFooter className="justify-between gap-2">
                                {renderCustomActions(row.original)}
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
            );
        },
    });

    return columns;
}