import { useState, useEffect } from "react";
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { visibleHeaders, mobileHeaders } from "./columns";
import { getPagePositions } from "../services/five-minute-report/position-service";

export default function AskpTable() {  
    const [data, setData] = useState([]);
    const [isLoading, setLoading] = useState(true);
    const [page, setPage] = useState({ number: 0, size: 10, totalElements: 0, totalPages: 0 });

    useEffect(() => {
      fetchPositions();
    }, [page.number, page.size]);

    const fetchPositions = async () => {
      setLoading(true);
      try {
          const params = {
              size: page.size,
              number: page.number,
              sortBy: sorting[0]?.id || "",
              sortDirection: sorting[0]?.desc ? "desc" : "asc",
              filters: columnFilters.map(filter => ({
                  columnId: filter.id,
                  value: filter.value,
              })),
              dateRanges: dateFilter ? [dateFilter.from, dateFilter.to] : undefined,
          };
          const data = await getPagePositions(params);
          setData(data.content);
          setPage({
              ...page,
              totalElements: data.totalElements,
              totalPages: data.totalPages,
          });
      } catch (error) {
          console.error("Error fetching positions:", error);
      }
      setLoading(false);
  };
  

    return (
        <div className=" gap-8 flex flex-col">
            <DataTable 
                columns={columns}
                data={data}
                isLoading={isLoading}
                visibleHeaders={visibleHeaders}
                mobileHeaders={mobileHeaders}
                onPageChange={handlePageChange}
                onSortChange={handleSortChange}
                onFilterChange={handleFilterChange}
            />
        </div>
    );
}
