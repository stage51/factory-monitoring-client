"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useEffect, useState } from "react";
import { checkLines as checkLinesForDaily } from "../services/daily-report/position-service";
import { checkLines as checkLinesForFiveminute } from "../services/five-minute-report/position-service";
import { userStore } from "../stores/user-store";
import { observer } from "mobx-react-lite";
import { useToast } from "@/components/hooks/use-toast";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Skeleton } from "@/components/ui/skeleton";
import Container from "../container";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Building2, CircleX } from "lucide-react";
import { Button } from "@/components/ui/button";

type ReportStatus = {
    controllerNumber : string,
    lineNumber : string;
    lastReportTime : Date;
    reportStatus : string;
}

const StatusPanel = observer(() => {
    const { profile, fetchProfile } = userStore;
    const [isLoading, setLoading] = useState(true);
    const [fiveminuteStatuses, setFiveminuteStatuses] = useState<ReportStatus[] | undefined>();
    const [dailyStatuses, setDailyStatuses] = useState<ReportStatus[] | undefined>();
    const { toast } = useToast();
    
    useEffect(() => {
        setLoading(true)
        if (profile === null) {
            fetchProfile()
        } else if (!profile?.organization || !profile?.organization?.taxpayerNumber) {
            toast({
                title: "Ошибка получения данных",
                variant: "destructive",
                description: "ИИН организации неизвестен",
            });
        } else {
            getData()
        }
     }, [profile]);
    
    const getData = async () => {
        setLoading(true)
        try {
            const dailyData = await checkLinesForDaily(profile?.organization?.taxpayerNumber)   
            setDailyStatuses(dailyData)
        } catch (error) {
            console.log("Ошибка загрузки статусов дневных отчетов. " + error)
            toast({
                title: "Ошибка получения данных",
                variant: "destructive",
                description: "Ошибка загрузки статусов дневных отчетов",
            });
        }
        try {
            const fiveminuteData = await checkLinesForFiveminute(profile?.organization?.taxpayerNumber)
            setFiveminuteStatuses(fiveminuteData)   
        } catch (error) {
            console.log("Ошибка загрузки статусов пятиминутных отчетов. " + error)
            toast({
                title: "Ошибка получения данных",
                variant: "destructive",
                description: "Ошибка загрузки статусов пятиминутных отчетов",
            });
        }
        setLoading(false);
    } 

    const groupedStatuses = (statuses : ReportStatus[]) => statuses?.reduce((acc, status) => {
        if (!acc[status.controllerNumber]) {
            acc[status.controllerNumber] = [];
        }
        if (!acc[status.controllerNumber].includes(status)) {
            acc[status.controllerNumber].push(status);
        }
        return acc;
    }, {} as Record<string, ReportStatus[]>);
    
    if (profile === null) {
        return (<></>)
    } else if (!profile?.organization || !profile?.organization?.taxpayerNumber){
        return (
            <Container className="flex items-start flex-col p-6 gap-6 animate-slide-element">
                <Card className="flex justify-center items-center p-4 w-full rounded-lg border-none shadow-md">
                    <CardHeader>Не указан ИНН организации для загрузки статусов отчетов</CardHeader>
                </Card>
            </Container>
        )
    } else {
        return (
            <Container className="flex items-start flex-col p-6 gap-6 animate-slide-element">
                <Card className="flex flex-col p-4 w-full justify-center rounded-lg border-none shadow-md">
                    <CardHeader className="text-lg">Статусы об отчетах</CardHeader>
                    <CardContent className="flex flex-col justify-center  gap-4">
                    {isLoading ? (<Skeleton className="rounded-xl w-full h-5"/>) :
                    (<Collapsible>
                        <CollapsibleTrigger><div className="max-w-none w-full group cursor-pointer rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:bg-slate-200">Статус о пятиминутных отчетах</div></CollapsibleTrigger>
                        <CollapsibleContent className="py-2">
                            {
                                fiveminuteStatuses &&
                                Object.entries(groupedStatuses(fiveminuteStatuses)).map(([controllerNumber, reportStatuses]) => (
                                <div className="flex flex-col gap-4" key={controllerNumber}>
                                    <Card>
                                        <CardHeader><p className="text-lg font-bold">Комплекс {controllerNumber}</p></CardHeader>
                                        <CardContent className="flex flex-col gap-4">
                                        {reportStatuses.map((status) => (
                                        <Alert variant={status.reportStatus === "OK" ? "default" : status.reportStatus === "WARN" ? "warning"  : "destructive"}>
                                            <CircleX></CircleX>
                                            <AlertTitle>
                                                Линия {status.lineNumber}
                                            </AlertTitle>
                                            <AlertDescription>
                                                Последний отчет был загружен в {new Date (status.lastReportTime).toLocaleString
                                                ("ru-RU", {
                                                    day: "2-digit",
                                                    month: "2-digit",
                                                    year: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit"
                                                  })}
                                            </AlertDescription>
                                        </Alert>
                                        ))}
                                        </CardContent>
                                    </Card>
                                </div>
                                ))
                            }
                        </CollapsibleContent>
                    </Collapsible>
                    )}
                    {isLoading ? (<Skeleton className="rounded-xl w-full h-5" />) :
                    (<Collapsible>
                        <CollapsibleTrigger>
                            <div className="max-w-none w-full group cursor-pointer rounded-lg bg-white p-6 shadow-sm transition-all hover:shadow-lg hover:bg-slate-200">Статус о дневных отчетах</div>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="py-2">
                            {
                                dailyStatuses &&
                                Object.entries(groupedStatuses(dailyStatuses)).map(([controllerNumber, reportStatuses]) => (
                                    <div className="flex flex-col gap-4" key={controllerNumber}>
                                        <Card>
                                        <CardHeader className="flex flex-row items-center align-middle gap-4">
                                            <Building2 className="h-6 w-6" />
                                            <div className="text-lg font-bold">Комплекс {controllerNumber}</div>
                                        </CardHeader>
                                        <CardContent className="flex flex-col gap-4">
                                        {reportStatuses.map((status) => (
                                        <Alert variant={status.reportStatus === "OK" ? "default" : status.reportStatus === "WARN" ? "warning"  : "destructive"}>
                                            <CircleX></CircleX>
                                            <AlertTitle>
                                                Линия {status.lineNumber}
                                            </AlertTitle>
                                            <AlertDescription>
                                                Последний отчет был загружен в {new Date (status.lastReportTime).toLocaleString
                                                ("ru-RU", {
                                                    day: "2-digit",
                                                    month: "2-digit",
                                                    year: "numeric",
                                                    hour: "2-digit",
                                                    minute: "2-digit"
                                                  })}
                                            </AlertDescription>
                                        </Alert>
                                        ))}
                                        </CardContent>
                                    </Card>
                                    </div>
                                ))
                            }
                        </CollapsibleContent>
                    </Collapsible>
                    )}
                    </CardContent>
                </Card>
            </Container>
        );
    }
});

export default StatusPanel