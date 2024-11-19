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
import { useRouter } from "next/navigation"
import axios from "axios"
import keycloakConfig from "../services/auth/keycloak-config"
import RegisterRedirect from "../services/auth/register-redirect"
import LoginRedirect from "../services/auth/login-redirect"

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
    const handleLogin = async (email: string, password: string) => {
        try {
          const response = await axios.post(
            `${keycloakConfig.baseUrl}/realms/${keycloakConfig.realm}/protocol/openid-connect/token`,
            new URLSearchParams({
              client_id: keycloakConfig.clientId,
              client_secret: keycloakConfig.clientSecret,
              grant_type: "password",
              username: email,
              password: password,
            }),
            {
              headers: { "Content-Type": "application/x-www-form-urlencoded" },
            }
          );
    
          const { access_token, refresh_token } = response.data;
          sessionStorage.setItem("access_token", access_token);
          sessionStorage.setItem("refresh_token", refresh_token);
          alert("Вы успешно вошли!");
        } catch (error) {
          console.error("Ошибка авторизации:", error);
          alert("Ошибка авторизации. Проверьте данные.");
        }
      };

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            handleLogin(values.email, values.password)
            router.push("/");
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
                            <Button className="w-1/2" onClick={() => LoginRedirect} type="submit">Войти</Button>
                            {/*<Link href="/sign-up" className="w-1/2"><Button className="w-full" variant="outline">Регистрация</Button></Link>*/}
                            <Button className="w-full" onClick={() => RegisterRedirect}  variant="outline">Регистрация</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
  )
}
