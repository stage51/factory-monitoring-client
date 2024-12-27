"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/hooks/use-toast";
import { UserLoginForm } from "../forms/user-login-form";
import { login } from "../services/auth/auth-serivce";

export default function SignIn() {
  const { toast } = useToast();
  const router = useRouter();

  const onSubmit = async (values: { email: string; password: string }) => {
    try {
      await login(values.email, values.password);
      toast({
        title: "Авторизация",
        description: "Вход выполнен под логином " + values.email,
      });
      router.replace("/");
    } catch (error) {
      console.error("Ошибка авторизации:", error);
      toast({
        title: "Ошибка авторизации",
        variant: "destructive",
        description: "Неверный логин или пароль",
      });
    }
  };

  return (
    <Card className="shadow-none md:w-1/2 w-full">
      <CardHeader className="flex items-center"></CardHeader>
      <CardContent>
        <UserLoginForm onSubmit={onSubmit}>
          <div className="flex justify-center pt-8 gap-8">
            <Button className="w-1/2" type="submit">Войти</Button>
            <Link href="/sign-up" className="w-1/2">
              <Button className="w-full" variant="outline">
                Регистрация
              </Button>
            </Link>
          </div>
          <div className="w-full flex justify-center">
            <Link href="/forgot">Забыл пароль?</Link>
          </div>
        </UserLoginForm>
      </CardContent>
    </Card>
  );
}
