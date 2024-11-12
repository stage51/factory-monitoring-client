import { DataTable } from "./data-table";
import { columns } from "./columns";
import { visibleHeaders, mobileHeaders } from "./columns";

export default function AskpTable() {
    return (
        <div className="gap-8 flex flex-col">
            <DataTable
                columns={columns}
                visibleHeaders={visibleHeaders}
                mobileHeaders={mobileHeaders}
            />
        </div>
    );
}
