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
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import Link from "next/link"
import keycloak from "../services/auth/keycloak"
import { useRouter } from "next/navigation"

const formSchema = z.object({
    email: z.string().email({
        message: "Введите корректный email",
    }
    ),
    password: z.string().min(8, {
        message: "Пароль должен быть от 8 символов",
    }).max(20, {
        message: "Пароль должен быть до 20 символов ",
    }
    ),
})

export default function SignIn() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "",
          password: ""
        },
      })
      const router = useRouter();

      const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
          // Входим через Keycloak
          await keycloak.login({
            username: values.email,
            password: values.password,
          });
          // После успешной авторизации редиректим на главную страницу
          router.push("/dashboard");
        } catch (error) {
          console.error("Ошибка авторизации:", error);
          alert("Неверный логин или пароль");
        }
      };
    return (
        <Card className="shadow-none md:w-1/2 w-full">
            <CardHeader className="flex items-center">
                {/* <CardTitle className="text-md text-muted-foreground">Для входа в аккаунт введите вашу почту и пароль</CardTitle> */}
            </CardHeader>  
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                        <div className="flex justify-center pt-8 gap-8">
                            <Button className="w-1/2" type="submit">Войти</Button>
                            <Link href="/sign-up" className="w-1/2"><Button className="w-full" variant="outline">Регистрация</Button></Link>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
  )
}
