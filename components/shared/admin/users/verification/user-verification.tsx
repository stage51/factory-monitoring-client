"use client";
import { useState, useEffect, useRef } from "react";
import { DataTable } from "../../table/data-table";
import generateColumns, { generateColumnsWithCustomActions as generateColumnsWithCustomDialogActions } from "../../table/columns";
import { ColumnDef, ColumnFilter, ColumnFiltersState, PaginationState, SortingState } from "@tanstack/react-table";
import InputFilter from "../../table/input-filter";
import DateFilter from "../../table/date-filter";
import AddButton from "../../table/add-button";
import apiClient from "@/components/shared/services/auth/api-client";
import { DialogClose } from "@radix-ui/react-dialog";
import { Button } from "@/components/ui/button";


export default function UserVerification() {  
    const [isLoading, setIsLoading] = useState(true);
    const tableRef = useRef<any>(null);

    const headers: Array<{ key: keyof HeadersTypes; label: string; sortable: boolean }> = [
      { key: "id", label: "ID", sortable: false },
      { key: "email", label: "Email", sortable: true },
      { key: "firstName", label: "Имя", sortable: false },
      { key: "lastName", label: "Фамилия", sortable: false },
      { key: "middleName", label: "Отчество", sortable: false },
      { key: "role", label: "Роль", sortable: false },
      { key: "active", label: "Активен", sortable: false },
      { key: "createdAt", label: "Дата создания", sortable: true },
      { key: "updatedAt", label: "Дата обновления", sortable: true }
    ];

    const visibleHeaders = [
      "ID",
      "Email"
    ];

    type HeadersTypes = {
      id: number;
      email: string;
      firstName: string;
      lastName: string;
      middleName: string;
      role: string;
      active: boolean;
      createdAt: Date;
      updatedAt: Date;
    };

    const fetchData = async (pagination : PaginationState, sorting : SortingState, columnFilters : ColumnFiltersState) => {
      setIsLoading(true);
      try {
        const response = await apiClient.post(`/auth-server/users/verification/fetch`, {
          size: pagination.pageSize,
          number: pagination.pageIndex,
          sortBy: sorting[0]?.id,
          sortDirection: sorting[0]?.desc ? "DESC" : "ASC",
          filters: Object.fromEntries(
            columnFilters
              .filter(filter => !["createdAt", "updatedAt"].includes(filter.id))
              .map(filter => [filter.id, filter.value])
          ),
          dateRanges: Object.fromEntries(
            columnFilters
              .filter(filter => ["createdAt", "updatedAt"].includes(filter.id))
              .map(filter => {
                const from = (filter.value as any)?.from
                  ? new Date((filter.value as any)?.from).toISOString()
                  : "null";
                const to = (filter.value as any)?.to
                  ? new Date((filter.value as any)?.to).toISOString()
                  : "null";
                return [filter.id, `${from},${to}`];
              })
          )
        });
        setIsLoading(false);
        return response.data;
      } catch (error) {
        console.error("Error fetching data:", error);
        throw error;
      }
    };

    const handleApprove = async (id : string | number) => {
      try {
        await apiClient.get(`/auth-server/users/${id}/approve`);
        window.location.reload()
      } catch (error) {
        console.error("Error approving user:", error);
        throw error;
      }
    };

    const handleDisapprove = async (id : string | number) => {
      try {
        await apiClient.get(`/auth-server/users/${id}/disapprove`);
        window.location.reload()
      } catch (error) {
        console.error("Error disapproving user:", error);
        throw error;
      }
    };

    const customActions = (data : any) => (
      <>
        <DialogClose asChild>
          <Button onClick={() => handleApprove(data.id)}>Одобрить</Button>
        </DialogClose>
        <DialogClose asChild>
          <Button variant="destructive" onClick={() => handleDisapprove(data.id)}>Отклонить</Button>
        </DialogClose>
      </>
  );

    return (
      <div className="gap-8 flex flex-col">
        <DataTable
          ref={tableRef}
          columns={generateColumnsWithCustomDialogActions<HeadersTypes>({ headers, title : "Верификация пользователя", description : "Одобрить заявку на регистрацию пользователя?", renderCustomActions : customActions }) as ColumnDef<unknown, unknown>[]}
          isLoading={isLoading}
          visibleHeaders={visibleHeaders}
          defaultHeaders={headers.map((h) => h.label)}
          fetchData={fetchData}
        >
          <div className="flex flex-col w-full gap-4">
            <InputFilter placeholder='Поиск по email' column="email" table={tableRef} />
            <InputFilter placeholder='Поиск по имени' column="firstName" table={tableRef} />
          </div>
          <div className="flex flex-col w-full gap-4">
            <DateFilter placeholder="Дата создания" column="createdAt" table={tableRef}/>
            <DateFilter placeholder="Дата обновления" column="updatedAt" table={tableRef}/>
          </div>
        </DataTable>
      </div>
    );
}
