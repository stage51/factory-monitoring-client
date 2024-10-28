"use client";
import { testData } from "./test-data"
import { useState, useEffect } from "react"
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { visibleHeaders, mobileHeaders } from "./columns";
import { TableFull } from "@/components/shared/table/table-full"

export default function EgaisTable() {  
    const [data, setData] = useState<typeof testData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
  
    useEffect(() => {
      setTimeout(() => {
        setData(testData);
        setIsLoading(false);
      }, 2000)
    }, []);
  
      return (
        <div className="gap-8 flex flex-col">
            <DataTable columns={columns} data={data || []} isLoading={isLoading}
            visibleHeaders={visibleHeaders} mobileHeaders={mobileHeaders} />
            <TableFull className="2xl:flex hidden">
              <DataTable columns={columns} data={data || []} isLoading={isLoading}
              visibleHeaders={visibleHeaders} mobileHeaders={mobileHeaders} />
            </TableFull>
        </div>
      )
}