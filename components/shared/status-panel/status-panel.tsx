"use client";

import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card";
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
import { Building2, CircleAlert, CircleCheck, CircleX, Frown, Smile } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Title from "../title";
import { Separator } from "@/components/ui/separator";
import { ReadableDate } from "../timezone/date";

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
    const [hiddenCard, setHiddenCard] = useState<boolean>(false);
    const [hasProblem, setHasProblem] = useState<boolean>(false)
    const { toast } = useToast();
    
    useEffect(() => {
        if (profile === null) {
            fetchProfile()
        } else if (!profile?.organization || !profile?.organization?.taxpayerNumber) {
            toast({
                title: "Ошибка получения данных",
                variant: "destructive",
                description: "ИИН организации неизвестен",
            });
        } else {
            getData();

            const interval = setInterval(() => {
                getData(false);
            }, 10000);
    
            return () => clearInterval(interval);
        }
     }, [profile]);
    
    const getData = async (withLoading : boolean = true) => {
        withLoading ? setLoading(true) : setLoading(false)
        try {
            const dailyData = await checkLinesForDaily(profile?.organization?.taxpayerNumber)   
            setDailyStatuses(dailyData)
            checkStatuses(dailyData)
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
            checkStatuses(fiveminuteData) 
        } catch (error) {
            console.log("Ошибка загрузки статусов пятиминутных отчетов. " + error)
            toast({
                title: "Ошибка получения данных",
                variant: "destructive",
                description: "Ошибка загрузки статусов пятиминутных отчетов",
            });
        }
        withLoading ? setLoading(false) : setLoading(false);
    } 

    const checkStatuses = (statuses: ReportStatus[]) => {
        for (const status of statuses) {
            if (status.reportStatus === "WARN" || status.reportStatus === "ERROR") {
                setHasProblem(true);
                break;
            }
        }
    };
    

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
        return (<Title title={"Здравствуйте"} subtitle="Добро пожаловать в ЕГАИС Мониторинг. После авторизации вам будут доступен функционал сервиса." />)

    } else if (!profile?.organization || !profile?.organization?.taxpayerNumber){
        return (
            <>
            <Title title={"Здравствуйте, " + profile.firstName + " " + profile.lastName} subtitle="Добро пожаловать в ЕГАИС Мониторинг. Выберите действие." />
            <Container className="flex items-start flex-col p-6 gap-6 animate-slide-element">
                <Card className="flex justify-center items-center gap-8 p-6 border-none shadow-md w-full">
                    <Frown strokeWidth={1.25} className="h-12 w-12 text-muted-foreground" />
                        <div className="p-4">
                            <CardHeader className="p-0 text-center">Ой...</CardHeader>
                            <CardDescription className="text-center">ИНН организации в профиле не указан</CardDescription>
                        </div>
                </Card>
            </Container>
            </>
        )
    } else {
        return (
            <>
            <Title title={"Здравствуйте, " + profile.firstName + " " + profile.lastName} subtitle="Добро пожаловать в ЕГАИС Мониторинг. Выберите действие." />
            <Container className="flex items-start flex-col p-6 gap-6 animate-slide-element">
                <Collapsible className="w-full">
                    <CollapsibleTrigger hidden={hiddenCard} onClick={() => setHiddenCard(true)} className="w-full">
                    {hasProblem ? (
                        <Card className="flex justify-center items-center gap-8 p-6 border-none shadow-md hover:bg-slate-200 hover:shadow-lg transition-all">
                            <CircleAlert strokeWidth={1.25} className="h-12 w-12 text-muted-foreground" />
                            <div className="p-4">
                                <CardHeader className="p-0 text-center">Внимание</CardHeader>
                                <CardDescription className="text-center">С некоторыми отчетами есть проблемы. Нажмите для подробностей</CardDescription>
                            </div>
                        </Card>
                    ) : (
                        <Card className="flex justify-center items-center gap-8 p-6 border-none shadow-md hover:bg-slate-200 hover:shadow-lg transition-all">
                            <Smile strokeWidth={1.25} className="h-12 w-12 text-muted-foreground" />
                            <div className="p-4">
                                <CardHeader className="p-0 text-center">Всё хорошо</CardHeader>
                                <CardDescription className="text-center">По отправке отчетов нет никаких проблем. Нажмите для подробностей</CardDescription>
                            </div>
                        </Card>
                    )}
                    </CollapsibleTrigger>
                    <CollapsibleContent className="w-full">
                    <Tabs defaultValue="five-minute" className="w-full flex flex-col">
                        <div className="flex flex-col gap-2">
                            {/** <h1 className="flex justify-center items-center text-lg font-semibold">Статусы об отчетах</h1> **/}
                            <TabsList className="w-full mb-2">
                                <TabsTrigger className="w-1/2" value="five-minute">Пятиминутные</TabsTrigger>
                                <TabsTrigger className="w-1/2" value="daily">Дневные</TabsTrigger>
                            </TabsList>
                        </div>
                        {isLoading ? (<Skeleton className="rounded-xl w-full h-16"/>) :
                        (<TabsContent className="flex flex-col mt-0 gap-2" value="five-minute">
                                {
                                    fiveminuteStatuses && fiveminuteStatuses.length > 0 ?
                                    Object.entries(groupedStatuses(fiveminuteStatuses)).map(([controllerNumber, reportStatuses]) => (
                                        <Card key={controllerNumber} className="border-none shadow-md">
                                        <CardHeader className="flex flex-row items-center align-middle gap-4 font-bold">
                                            <Building2 className="h-6 w-6" />
                                            Комплекс {controllerNumber}
                                        </CardHeader>
                                        <CardContent className="flex flex-col gap-4">
                                        {reportStatuses.map((status) => (
                                        <Alert className="flex gap-4" variant={status.reportStatus === "OK" ? "ok" : status.reportStatus === "WARN" ? "warning"  : "destructive"}>
                                            <div className="items-center flex">
                                                {status.reportStatus === "OK" ? (<CircleCheck />) : status.reportStatus === "WARN" ? (<CircleAlert />)  : (<CircleX />)}
                                            </div>
                                            <div>
                                                <AlertTitle className="mb-2">
                                                    Линия {status.lineNumber}
                                                </AlertTitle>
                                                <AlertDescription>
                                                    Последний отчет был загружен в {new ReadableDate(new Date (status.lastReportTime)).toReadable()}
                                                </AlertDescription>
                                            </div>
                                        </Alert>
                                        ))}
                                        </CardContent>
                                        </Card>
                                    ))
                                    : (
                                        <Card className="flex justify-center items-center gap-8 p-6 border-none shadow-md">
                                            <Frown strokeWidth={1.25} className="h-12 w-12 text-muted-foreground" />
                                            <div className="p-4">
                                                <CardHeader className="p-0 text-center">Ой...</CardHeader>
                                                <CardDescription className="text-center">По статусам о пятиминутных отчетах нет данных</CardDescription>
                                            </div>
                                        </Card>
                                    )
                                }
                        </TabsContent>
                        )}
                        {isLoading ? (<Skeleton className="rounded-xl w-full h-16" />) :
                        (<TabsContent className="flex flex-col mt-0 gap-2" value="daily">
                                {
                                    dailyStatuses && dailyStatuses.length > 0 ? (
                                    <Card className="border-none shadow-md flex flex-col">
                                    {Object.entries(groupedStatuses(dailyStatuses)).map(([controllerNumber, reportStatuses], index) => (
                                        <div key={controllerNumber} className="flex flex-col p-4 gap-4">
                                            <Separator className={index === 0 ? "hidden" : ""} orientation="horizontal" />
                                            <div className="flex flex-row items-center align-middle gap-4 font-bold">
                                                <Building2 className="h-6 w-6" />
                                                Комплекс {controllerNumber}
                                            </div>
                                            <div className="flex flex-col gap-4">
                                            {reportStatuses.map((status) => (
                                            <Alert className="flex gap-4" variant={status.reportStatus === "OK" ? "ok" : status.reportStatus === "WARN" ? "warning"  : "destructive"}>
                                                <div className="items-center flex">
                                                    {status.reportStatus === "OK" ? (<CircleCheck />) : status.reportStatus === "WARN" ? (<CircleAlert />)  : (<CircleX />)}
                                                </div>
                                                <div>
                                                    <AlertTitle className="mb-2">
                                                        Линия {status.lineNumber}
                                                    </AlertTitle>
                                                    <AlertDescription>
                                                        Последний отчет был загружен в {new ReadableDate(new Date (status.lastReportTime)).toReadable()}
                                                    </AlertDescription>
                                                </div>
                                            </Alert>
                                            ))}
                                            </div>
                                        </div>
                                    ))
                                    }
                                    </Card>
                                    )
                                    : (
                                        <Card className="flex justify-center items-center gap-8 p-6 border-none shadow-md">
                                            <Frown strokeWidth={1.25} className="h-12 w-12 text-muted-foreground" />
                                            <div className="p-4">
                                                <CardHeader className="p-0 text-center">Ой...</CardHeader>
                                                <CardDescription className="text-center">По статусам о дневных отчетах нет данных</CardDescription>
                                            </div>
                                        </Card>
                                    )
                                }
                            </TabsContent>
                            )}
                    </Tabs>
                    </CollapsibleContent>
                </Collapsible>
            </Container>
            </>
        );
    }
});

export default StatusPanel