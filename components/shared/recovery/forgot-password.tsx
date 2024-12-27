"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/hooks/use-toast";
import { forgotPassword } from "../services/auth/auth-serivce";
import { ForgotPasswordForm } from "../forms/forgot-password-form";

export default function ForgotPassword() {
    const { toast } = useToast();
    const router = useRouter();
  
    const onSubmit = async (values: { email: string }) => {
      try {
        await forgotPassword(values.email)
        toast({
          title: "Код отправлен",
          description: "Код успешно отправлен на почту " + values.email,
        });
        router.replace("/recovery");
      } catch (error) {
        console.error("Ошибка авторизации:", error);
        toast({
          title: "Ошибка восстановления",
          variant: "destructive",
          description: "Неправильный email адрес",
        });
      }
    };
  
    return (
      <Card className="shadow-none md:w-1/2 w-full">
        <CardHeader className="flex items-center"></CardHeader>
        <CardContent>
          <ForgotPasswordForm onSubmit={onSubmit}>
            <div className="flex justify-center pt-8 gap-8">
              <Button className="w-1/2" type="submit">Отправить</Button>
              <Link href="/sign-in" className="w-1/2">
                <Button className="w-full" variant="outline">
                  Вход в аккаунт
                </Button>
              </Link>
            </div>
          </ForgotPasswordForm>
        </CardContent>
      </Card>
    );
  }
  