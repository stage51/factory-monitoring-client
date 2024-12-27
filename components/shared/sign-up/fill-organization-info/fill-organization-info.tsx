"use client"

import { useToast } from "@/components/hooks/use-toast"
import { useRouter } from "next/navigation"
import { OrganizationForm } from "../../forms/organization-form"
import { createOrganization } from "../../services/profile/profile-service"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function FillOrganizationInfo() {
  const { toast } = useToast()
  const router = useRouter()

  const handleSubmit = async (values: any) => {
    try {
      await createOrganization(values)
      toast({
        title: "Создание организации",
        description: "Организация успешно добавлена к вам в профиль",
      })
      router.replace("/sign-up/complete")
    } catch (error) {
      console.error("Ошибка авторизации:", error)
      toast({
        title: "Ошибка регистрации",
        variant: "destructive",
        description: "Проверьте правильность заполненных форм и попробуйте ещё раз",
      })
    }
  }

  return (
    <div className="rounded-lg bg-card text-card-foreground w-full">
      <div className="flex md:flex-row flex-col">
        <OrganizationForm onSubmit={handleSubmit}>
            <div className="flex md:flex-row flex-col justify-center p-6 md:gap-12 gap-4">
                <Button className="md:w-1/3 w-full" type="submit">Завершить регистрацию</Button>
                <Link href="/sign-up" className="md:w-1/3 w-full"><Button className="w-full" variant="outline">Назад</Button></Link>
                <Link href="/sign-up/complete" className="md:w-1/3 w-full"><Button className="w-full" variant="outline">Заполнить позже</Button></Link>
            </div>
        </OrganizationForm>
      </div>
    </div>
  )
}
