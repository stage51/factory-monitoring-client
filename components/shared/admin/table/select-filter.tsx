import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { cn } from "@/lib/utils";
import { MutableRefObject } from "react";

interface Props{
    className?: string;
    table: MutableRefObject<any>;
    column: string;
    values: string[];
    placeholder: string;
}
export default function SelectFilter({className, table, column, values, placeholder} : Props) {

  return (
    <Select
          onValueChange={(value) => {
            if (value === "all") {
              table.current?.getColumn(column)?.setFilterValue(undefined);
            } else {
              table.current?.getColumn(column)?.setFilterValue(value);
            }
          }
        }
        >
          <SelectTrigger>
            <SelectValue className={cn("w-full", className)} placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Все</SelectItem>
            {values.map((value) => (
                <SelectItem value={value}>{value}</SelectItem>
            ))}
          </SelectContent>
    </Select>
  )
}