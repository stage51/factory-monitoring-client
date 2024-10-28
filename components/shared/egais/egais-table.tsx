"use client";
import { testData } from "@/components/shared/table/test-data"
import { useState, useEffect } from "react"
import { DataTable } from "../table/data-table";
import { columns } from "./columns";
import { visibleHeaders, mobileHeaders } from "./columns";

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
         <DataTable columns={columns} data={data || []} isLoading={isLoading}
         visibleHeaders={visibleHeaders} mobileHeaders={mobileHeaders} />
      )
}