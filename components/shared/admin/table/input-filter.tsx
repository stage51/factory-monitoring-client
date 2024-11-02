import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { MutableRefObject } from "react";

interface Props{
    className?: string;
    table: MutableRefObject<any>;
    column: string;
    placeholder: string;
}
export default function InputFilter({className, table, column, placeholder} : Props) {

  return (
    <Input
        placeholder={placeholder}
        onChange={(event) =>
            table.current?.getColumn(column)?.setFilterValue(event.target.value)
        }
        className={cn("w-full", className)}
    />
  )
}