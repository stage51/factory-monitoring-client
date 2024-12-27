"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useToast } from "@/components/hooks/use-toast";
import { RecoveryPasswordForm } from "../forms/recovery-password-form";
import { forgotPassword, recoveryPassword } from "../services/auth/auth-serivce";

export default function RecoveryPassword() {
    const { toast } = useToast();
    const router = useRouter();
  
    const onSubmit = async (values: { code: string }) => {
      try {
        await recoveryPassword(values.code)
        toast({
          title: "Успешное восстановление",
          description: "Зайдите в аккаунт и смените пароль в профиле",
        });
        router.replace("/sign-in");
      } catch (error) {
        console.error("Ошибка авторизации:", error);
        toast({
          title: "Ошибка восстановления",
          variant: "destructive",
          description: "Код неправильный или недействительный",
        });
      }
    };
  
    return (
      <Card className="shadow-none md:w-1/2 w-full">
        <CardHeader className="flex items-center"></CardHeader>
        <CardContent>
          <RecoveryPasswordForm onSubmit={onSubmit}>
            <div className="flex justify-center pt-8 gap-8">
              <Button className="w-1/2" type="submit">Отправить</Button>
              <Link href="/forgot" className="w-1/2">
                <Button className="w-full" variant="outline">
                  Назад
                </Button>
              </Link>
            </div>
          </RecoveryPasswordForm>
        </CardContent>
      </Card>
    );
  }
  