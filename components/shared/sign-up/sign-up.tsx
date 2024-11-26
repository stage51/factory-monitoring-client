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
import { useRouter } from "next/navigation";
import { register } from "../services/auth/auth-serivce"
import { useToast } from "@/components/hooks/use-toast"
import { UserRegForm } from "../forms/user-reg-form"

const formSchema = z.object({
    email: z.string().email({
      message: "Введите корректный email",
    }),
    repeatPassword: z.string(),
    password: z.string()
      .min(8, { message: "Пароль должен быть от 8 символов" })
      .max(20, { message: "Пароль должен быть до 20 символов " }),
    firstName: z.string().min(1, { message: "Имя обязательно" }),
    lastName: z.string().min(1, { message: "Фамилия обязательна" }),
    middleName: z.string().optional(),
    timezone: z.string(),
    subscribe: z.boolean(),
    policy: z.boolean().refine(val => val, { message: "" })
  });
  
export default function SignUp() {
    const router = useRouter();
    const { toast } = useToast()
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
      try{
        await register(values)
        toast({
          title: "Регистрация",
          description: "Регистрация пользователя прошла успешно",
        })
        router.push("/sign-up/fill-organization-info")
      } catch (error) {
        console.error("Ошибка авторизации:", error);
        toast({
          title: "Ошибка регистрации",
          variant: "destructive",
          description: "Проверьте правильность заполненных форм и попробуйте ещё раз",
        })
      }
    };

  return (
    <UserRegForm onSubmit={onSubmit}>
        <div className="flex md:flex-row flex-col justify-center p-6 md:gap-12 gap-4">
            <Button className="md:w-1/2 w-full" type="submit">Зарегистрироваться</Button>
            <Link href="/sign-in" className="md:w-1/2 w-full"><Button className="w-full" variant="outline">Вход в аккаунт</Button></Link>
        </div>
    </UserRegForm>
  );
}