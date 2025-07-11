"use client"
import { DataTable } from "./data-table";
import { columns } from "./columns";
import { mobileHeaders } from "./columns";
import { TableFull } from "@/components/shared/table/table-full";
import { observer } from "mobx-react-lite";
import { userStore } from "../stores/user-store";
import { useToast } from "@/components/hooks/use-toast";
import { useEffect, useState } from "react";

const EgaisTable = observer(() => {
  const { profile, isLoading, fetchProfile } = userStore;
  const { toast } = useToast();

  useEffect(() => {
    if (profile === null) {
      fetchProfile()
    }
    if (profile && !profile?.organization || !profile?.organization?.taxpayerNumber) {
        toast({
          title: "Ошибка получения данных",
          variant: "destructive",
          description: "ИИН организации неизвестен",
        });
    }
   }, [profile]);


  if (isLoading || !profile) {
    return <p>Получаем данные профиля, подождите...</p>;
  }

  return (
    <div className="gap-8 flex flex-col">
      <DataTable
        columns={columns}
        mobileHeaders={mobileHeaders}
        taxpayerNumber={profile?.organization?.taxpayerNumber}
      />
    </div>
  );
});

export default EgaisTable;
