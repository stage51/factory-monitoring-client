import { DataTable } from "./data-table";
import { columns } from "./columns";
import { visibleHeaders, mobileHeaders } from "./columns";
import { TableFull } from "@/components/shared/table/table-full"

export default function EgaisTable() {  
      return (
        <div className="gap-8 flex flex-col">
            <DataTable columns={columns}
            visibleHeaders={visibleHeaders} mobileHeaders={mobileHeaders} />
            <TableFull className="2xl:flex hidden">
              <DataTable columns={columns}
              visibleHeaders={visibleHeaders} mobileHeaders={mobileHeaders} />
            </TableFull>
        </div>
      )
}