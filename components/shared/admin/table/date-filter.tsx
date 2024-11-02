import { cn } from "@/lib/utils";
import { DatePickerWithRange } from "../../date-range-picker";
import { DateRange } from "react-day-picker";
import { MutableRefObject } from "react";

interface Props{
    className?: string;
    table: MutableRefObject<any>;
    column: string;
    placeholder: string;
}
export default function DateFilter({className, table, column, placeholder} : Props) {

  return (
    <DatePickerWithRange
            value={table.current?.getColumn(column)?.getFilterValue() as DateRange | undefined}
            onChange={(newDateRange) => table.current?.getColumn(column)?.setFilterValue(newDateRange)}
            className={cn("w-full", className)}
            placeholder={placeholder}
            />
  )
}