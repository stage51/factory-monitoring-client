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
import axios from "axios"
import { useRouter } from "next/router"

const formSchema = z.object({
    shortName: z.string().min(1, { message: "Краткое наименование обязательно" }),
    name: z.string().min(1, { message: "Полное наименование обязательно" }),
    type: z.string().min(1, { message: "Выберите тип предприятия" }),
    region: z.string().min(1, { message: "Регион обязателен" }),
    taxpayerNumber: z.string()
      .regex(/^\d{12}$/, { message: "ИНН должен содержать 12 цифр" }),
    reasonCode: z.string()
      .regex(/^\d{9}$/, { message: "КПП должен содержать 9 цифр" }),
    address: z.string().min(1, { message: "Адрес обязателен" }),
    specialEmail: z.string().email({ message: "Введите корректный email" }),
    specialPhone: z.string().min(7, { message: "Введите корректный телефон" }),
  });
  
export default function FillOrganizationInfo() {
    const [isMobile, setIsMobile] = useState<boolean>(false);
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
      resolver: zodResolver(formSchema),
      defaultValues: {
        shortName: "",
        name: "",
        type: "",
        region: "",
        taxpayerNumber: "",
        reasonCode: "",
        address: "",
        specialEmail: "",
        specialPhone: "",
      },
    });

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

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const response = await axios.post("/api/organization-sign-up", values);
            console.log("Данные успешно отправлены:", response.data);
            router.push("sign-up/fill-organization-info");
        } catch (error) {
            console.error("Ошибка при отправке данных:", error);
            alert("Ошибка при отправке формы. Попробуйте еще раз.");
        }
    };

    return (
        <div className="rounded-lg border bg-card text-card-foreground w-full">
            <div className="flex md:flex-row flex-col">
            <Card className="shadow-none border-none w-full">
            <CardHeader className="">
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
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Выберите тип"/>
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
                        <FormField 
                        control={form.control}
                        name="taxpayerNumber"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>12-значный ИНН</FormLabel>
                            <FormControl>
                                <Input placeholder="Введите 12-значный ИНН" type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField 
                        control={form.control}
                        name="reasonCode"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>9-значный КПП</FormLabel>
                            <FormControl>
                                <Input placeholder="Введите 9-значный КПП" type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField 
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Адрес</FormLabel>
                            <FormControl>
                                <Input placeholder="Введите адрес" type="number" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField 
                        control={form.control}
                        name="specialEmail"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Экстренная почта</FormLabel>
                            <FormControl>
                                <Input placeholder="Введите экстренную почту" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField 
                        control={form.control}
                        name="specialPhone"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Экстренный телефон</FormLabel>
                            <FormControl>
                                <Input placeholder="Введите экстренный телефон" type="phone" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <div className="flex justify-center p-6 gap-12">
                            <Button className="w-1/2" type="submit" onClick={() => onSubmit}>Завершить регистрацию</Button>
                            <Link href="/sign-up" className="w-1/2"><Button className="w-full" variant="outline">Назад</Button></Link>
                        </div>
                    </form>
                </Form>
            </CardContent>
            </Card>
            </div>
        </div>
  )
}