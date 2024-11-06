"use client";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogClose } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/shared/date-picker";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";

interface Props<HeadersTypes> {
    className?: string;
    headers: Array<{ key: keyof HeadersTypes; label: string }>;
    text?: string;
    sampleData: HeadersTypes;
  }
  
  export default function AddButton<HeadersTypes>({ className, headers, text = "Добавить элемент", sampleData }: Props<HeadersTypes>) {
    const data = sampleData;

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className={cn("w-full", className)}>
                    <Plus />
                    {text}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
                <DialogHeader className="gap-2">
                    <DialogTitle>Добавление</DialogTitle>
                    <DialogDescription>Создание и добавление элемента</DialogDescription>
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
                                        value={Date.now as Date} 
                                        className="col-span-3 w-full" 
                                    />
                                ) : (
                                    <>
                                        {typeof data[key] === "boolean" ? (
                                            <Select>
                                                <SelectTrigger className="col-span-3">
                                                    <SelectValue placeholder="Да" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="true">Да</SelectItem>
                                                    <SelectItem value="false">Нет</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        ) : (
                                            <Input id={key.toString()} placeholder="Введите значение" className="col-span-3" />
                                        )}
                                    </>
                                )}
                            </div>
                        ) : null
                    )}
                </div>
                <DialogFooter className="justify-between gap-2">
                    <DialogClose asChild>
                        <Button variant="default">Сохранить</Button>
                    </DialogClose>
                    <DialogClose asChild>
                        <Button variant="outline">Отменить</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}