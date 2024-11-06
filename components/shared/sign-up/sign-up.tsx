"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { z } from "zod"
import { useForm } from "react-hook-form"
import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Switch } from "@/components/ui/switch"
import Link from "next/link"

const formSchema = z.object({
    email: z.string().email({
        message: "Введите корректный email",
    }
    ),
    repeatPassword: z.string(),
    password: z.string().min(8, {
        message: "Пароль должен быть от 8 символов",
    }).max(20, {
        message: "Пароль должен быть до 20 символов ",
    }
    ),
    firstName: z.string(),
    lastName: z.string(),
    middleName: z.string(),
    timezone: z.string(),
    subscribe: z.boolean(),
    policy: z.boolean()
})

export default function SignUp() {
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "",
          repeatPassword: "",
          password: "",
          firstName: "",
          lastName: "",
          middleName: "",
          timezone: "UTC+03:00",
          subscribe: false,
          policy: false
        },
    })

    useEffect(() => {
        const handleResize = () => {
          setIsMobile(window.innerWidth < 768);
        };
    
        handleResize();
        window.addEventListener("resize", handleResize);
    
        return () => {
          window.removeEventListener("resize", handleResize);
        };
      }, []);

    return (
        <div className="rounded-lg border bg-card text-card-foreground w-full">
            <div className="flex md:flex-row flex-col">
            <Card className="shadow-none border-none md:w-1/2 w-full">
            <CardHeader className="">
                <CardTitle className="text-md text-muted-foreground">Пользователь</CardTitle>
            </CardHeader>  
            <CardContent className="flex justify-between gap-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
                        <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Электронная почта</FormLabel>
                            <FormControl>
                                <Input placeholder="Введите имя" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Пароль</FormLabel>
                            <FormControl>
                                <Input placeholder="Введите пароль" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="repeatPassword"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Повторите пароль</FormLabel>
                            <FormControl>
                                <Input placeholder="Введите пароль повторно" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Имя</FormLabel>
                            <FormControl>
                                <Input placeholder="Введите имя" type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Фамилия</FormLabel>
                            <FormControl>
                                <Input placeholder="Введите фамилию" type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="middleName"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Отчество (при наличии)</FormLabel>
                            <FormControl>
                                <Input placeholder="Введите отчество" type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="timezone"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Часовой пояс</FormLabel>
                            <FormControl>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue {...field} placeholder="Выберите тип"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="UTC-12:00">UTC-12:00</SelectItem>
                                        <SelectItem value="UTC-11:00">UTC-11:00</SelectItem>
                                        <SelectItem value="UTC-10:00">UTC-10:00 (Hawaii-Aleutian Time)</SelectItem>
                                        <SelectItem value="UTC-09:00">UTC-09:00 (Alaska Time)</SelectItem>
                                        <SelectItem value="UTC-08:00">UTC-08:00 (Pacific Time)</SelectItem>
                                        <SelectItem value="UTC-07:00">UTC-07:00 (Mountain Time)</SelectItem>
                                        <SelectItem value="UTC-06:00">UTC-06:00 (Central Time)</SelectItem>
                                        <SelectItem value="UTC-05:00">UTC-05:00 (Eastern Time)</SelectItem>
                                        <SelectItem value="UTC-04:00">UTC-04:00 (Atlantic Time)</SelectItem>
                                        <SelectItem value="UTC-03:00">UTC-03:00</SelectItem>
                                        <SelectItem value="UTC-02:00">UTC-02:00</SelectItem>
                                        <SelectItem value="UTC-01:00">UTC-01:00</SelectItem>
                                        <SelectItem value="UTC+00:00">UTC+00:00 (GMT)</SelectItem>
                                        <SelectItem value="UTC+01:00">UTC+01:00 (Central European Time)</SelectItem>
                                        <SelectItem value="UTC+02:00">UTC+02:00 (Eastern European Time)</SelectItem>
                                        <SelectItem value="UTC+03:00">UTC+03:00 (Moscow Time)</SelectItem>
                                        <SelectItem value="UTC+03:30">UTC+03:30 (Iran Standard Time)</SelectItem>
                                        <SelectItem value="UTC+04:00">UTC+04:00 (Gulf Standard Time)</SelectItem>
                                        <SelectItem value="UTC+04:30">UTC+04:30 (Afghanistan Time)</SelectItem>
                                        <SelectItem value="UTC+05:00">UTC+05:00 (Pakistan Standard Time)</SelectItem>
                                        <SelectItem value="UTC+05:30">UTC+05:30 (India Standard Time)</SelectItem>
                                        <SelectItem value="UTC+05:45">UTC+05:45 (Nepal Time)</SelectItem>
                                        <SelectItem value="UTC+06:00">UTC+06:00 (Bangladesh Time)</SelectItem>
                                        <SelectItem value="UTC+06:30">UTC+06:30 (Cocos Islands Time)</SelectItem>
                                        <SelectItem value="UTC+07:00">UTC+07:00 (Indochina Time)</SelectItem>
                                        <SelectItem value="UTC+08:00">UTC+08:00 (China Standard Time)</SelectItem>
                                        <SelectItem value="UTC+08:45">UTC+08:45 (Australian Central Western Time)</SelectItem>
                                        <SelectItem value="UTC+09:00">UTC+09:00 (Japan Standard Time)</SelectItem>
                                        <SelectItem value="UTC+09:30">UTC+09:30 (Australian Central Time)</SelectItem>
                                        <SelectItem value="UTC+10:00">UTC+10:00 (Australian Eastern Time)</SelectItem>
                                        <SelectItem value="UTC+10:30">UTC+10:30 (Lord Howe Island Time)</SelectItem>
                                        <SelectItem value="UTC+11:00">UTC+11:00 (Solomon Islands Time)</SelectItem>
                                        <SelectItem value="UTC+12:00">UTC+12:00 (New Zealand Standard Time)</SelectItem>
                                        <SelectItem value="UTC+12:45">UTC+12:45 (Chatham Islands Time)</SelectItem>
                                        <SelectItem value="UTC+13:00">UTC+13:00 (Tonga Time)</SelectItem>
                                        <SelectItem value="UTC+14:00">UTC+14:00 (Line Islands Time)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="subscribe"
                        render={({ field }) => (
                            <FormItem className="space-y-0 flex flex-row items-center justify-between rounded-lg border p-4">
                            <FormLabel>Подписаться на рассылку</FormLabel>
                            <FormControl>
                                <Switch {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="policy"
                        render={({ field }) => (
                            <FormItem className="space-y-0 flex flex-row items-center justify-between rounded-lg border p-4">
                            <FormLabel>Принять соглашение на обработку персональных данных</FormLabel>
                            <FormControl>
                                <Switch {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </form>
                </Form>
            </CardContent>
            </Card>
            {!isMobile ? (<Separator orientation="vertical" />) : (<></>)}
            <Card className="shadow-none border-none md:w-1/2 w-full">
            <CardHeader className="">
                <CardTitle className="text-md text-muted-foreground">Организация</CardTitle>
            </CardHeader>  
            <CardContent className="flex justify-between gap-4">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
                        <FormField
                        control={form.control}
                        name="shortName"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Краткое наименование</FormLabel>
                            <FormControl>
                                <Input placeholder="Введите краткое наименование" type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Полное наименование</FormLabel>
                            <FormControl>
                                <Input placeholder="Введите полное наименование" type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="type"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Тип предприятия</FormLabel>
                            <FormControl>
                                <Select>
                                    <SelectTrigger>
                                        <SelectValue {...field} placeholder="Выберите тип"/>
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Производство алкогольного сырья">Производство алкогольного сырья</SelectItem>
                                        <SelectItem value="Ликеро-водочный завод">Ликеро-водочный завод</SelectItem>
                                        <SelectItem value="Фармацевтическое производство">Фармацевтическое производство</SelectItem>
                                        <SelectItem value="Пивоваренная компания">Пивоваренная компания</SelectItem>
                                        <SelectItem value="Перевозчик алкогольного сырья">Перевозчик алкогольного сырья</SelectItem>
                                        <SelectItem value="Перевозчик газового сырья">Перевозчик газового сырья</SelectItem>
                                        <SelectItem value="Другое">Другое</SelectItem>
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="region"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Регион</FormLabel>
                            <FormControl>
                                <Input placeholder="Введите регион" type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                    </form>
                </Form>
            </CardContent>
            </Card>
            </div>
            <div className="flex justify-center p-6 gap-12">
                <Button className="w-1/2" type="submit">Зарегистрироваться</Button>
                <Link href="/sign-in" className="w-1/2"><Button className="w-full" variant="outline">Вход в аккаунт</Button></Link>
            </div>
        </div>
  )
}

function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
}
