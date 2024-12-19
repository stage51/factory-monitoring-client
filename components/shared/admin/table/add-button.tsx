"use client";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DatePicker } from "@/components/shared/date-picker";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { da } from "date-fns/locale";

interface Props<HeadersTypes> {
  className?: string;
  headers: Array<{ key: keyof HeadersTypes; label: string; sortable?: boolean }>;
  text?: string;
  sampleData: HeadersTypes;
  handleCreate: (data: HeadersTypes) => Promise<HeadersTypes>;
}

export default function AddButton<HeadersTypes>({
  className,
  headers,
  text = "Добавить элемент",
  sampleData,
  handleCreate,
}: Props<HeadersTypes>) {
  const [data, setData] = useState(sampleData);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const createRow = async () => {
    try {
      const updatedData = {
        ...data,
        // Обновляем объект с выбранной датой
        ...(selectedDate ? { dateField: selectedDate } : {}),
      };
      await handleCreate(updatedData);
      window.location.reload();
    } catch (error) {
      console.error("Error creating row:", error);
    }
  };

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
                    value={selectedDate}
                    onChange={(date) => setSelectedDate(date)}
                    className="col-span-3 w-full"
                  />
                ) : (
                  <>
                    {typeof data[key] === "boolean" ? (
                      <Select
                        onValueChange={(value) =>
                          setData((prev) => ({ ...prev, [key]: value === "true" }))
                        }
                      >
                        <SelectTrigger className="col-span-3">
                          <SelectValue placeholder="Да" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="true">Да</SelectItem>
                          <SelectItem value="false">Нет</SelectItem>
                        </SelectContent>
                      </Select>
                    ) : (
                      <Input
                        id={key.toString()}
                        placeholder="Введите значение"
                        className="col-span-3"
                        value={data[key] === undefined ? "" : data[key]} 
                        onChange={(e) =>
                          setData((prev) => ({ ...prev, [key]: e.target.value }))
                        }
                      />
                    )}
                  </>
                )}
              </div>
            ) : null
          )}
        </div>
        <DialogFooter className="justify-between gap-2">
          <DialogClose asChild>
            <Button variant="default" onClick={createRow}>
              Сохранить
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button variant="outline">Отменить</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
