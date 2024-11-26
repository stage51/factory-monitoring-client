"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/hooks/use-toast"
import { useEffect, useState } from "react"
import { deleteOrganization, fetchUserProfile, updateOrganization, updateProfile, UserResponse } from "../services/profile/profile-service"
import Link from "next/link"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { OrganizationForm } from "../forms/organization-form"
import { UserLoginForm } from "../forms/user-login-form"
import { UserRegForm } from "../forms/user-reg-form"

export default function Profile() {
  const { toast } = useToast()
  const [data, setData] = useState<UserResponse>()

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetchUserProfile();
        setData(response);
      } catch (error) {
        console.error("Ошибка загрузки профиля:", error);
        toast({
          title: "Ошибка загрузки профиля",
          variant: "destructive",
          description: "Не удалось получить данные для загрузки",
        });
      }
    };
  
    fetchProfile();
  }, []);

  const handleUpdateProfile = async (values: any) => {
    try {
      await updateProfile(values)
      toast({
        title: "Обновление профиля",
        description: "Данные обновлены и страница будет перезагружена через 2 секунды",
      });
      const timer = setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (error) {
      console.error("Ошибка обновления профиля:", error);
        toast({
          title: "Ошибка обновления профиля",
          variant: "destructive",
          description: "Не удалось обновить данные о пользователе",
        });
    }
  }

  const handleUpdateOrganization = async (values: any) => {
    try {
      await updateOrganization(values)
      toast({
        title: "Обновление организации",
        description: "Данные обновлены и страница будет перезагружена через 2 секунды",
      });
      const timer = setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (error) {
      console.error("Ошибка обновления организации:", error);
        toast({
          title: "Ошибка обновления организации",
          variant: "destructive",
          description: "Не удалось обновить данные об организации",
        });
    }
  }

  const handleDeleteOrganization = async () => {
    try {
      await deleteOrganization()
      toast({
        title: "Удаление организации",
        description: "Данные удалены и страница будет перезагружена через 2 секунды",
      });
      const timer = setTimeout(() => {
        window.location.reload()
      }, 2000)
    } catch (error) {
      console.error("Ошибка удаления организации:", error);
        toast({
          title: "Ошибка удаления организации",
          variant: "destructive",
          description: "Не удалось удалить данные об организации",
        });
    }
  }

  return (
    <div className="py-4">
      <Card className="flex flex-col md:flex-row md:gap-6 p-6">
        {/* Left Section: Profile Information */}
        <div className="md:w-1/3 flex flex-col items-center md:items-center">
          {/* Profile Avatar */}
          <Avatar className="w-32 h-32 mb-4">
            <AvatarImage src="/images/user-avatar.png" alt="User Avatar" />
            <AvatarFallback>AB</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">{data?.firstName} {data?.lastName}</h2>
            <p className="text-gray-500 mb-4">{data?.email}</p>
          </div>
        </div>


        {/* Right Section: Profile Details */}
        <div className="md:w-2/3 mt-6 md:mt-0">
          <Tabs defaultValue="profile">
            {/* Tabs Header */}
            <TabsList className="w-full mb-4">
              <TabsTrigger value="profile" className="w-1/2">Профиль</TabsTrigger>
              <TabsTrigger value="organization" className="w-1/2">Организация</TabsTrigger>
            </TabsList>

            <TabsContent value="profile">
              <Card className="shadow-none">
                <CardHeader>
                  <CardTitle className="text-lg">Информация о профиле</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Имя</p>
                      <p className="text-sm text-muted-foreground">{data?.firstName}</p>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Фамилия</p>
                      <p className="text-sm text-muted-foreground">{data?.lastName}</p>
                    </div>
                    {data?.middleName !== null ? (<>
                    <Separator />
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Отчество</p>
                      <p className="text-sm text-muted-foreground">{data?.middleName}</p>
                    </div>
                    </>) : (<></>)}
                    <Separator />
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Электронная почта</p>
                      <p className="text-sm text-muted-foreground">{data?.email}</p>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Часовой пояс</p>
                      <p className="text-sm text-muted-foreground">{data?.timezone}</p>
                    </div>
                  </div>
                  <div className="flex gap-6 flex-col md:flex-row mt-6">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full">Изменить</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader className="hidden">
                          <DialogTitle />
                          <DialogDescription />
                        </DialogHeader>
                        <UserRegForm initialValues={data} onSubmit={handleUpdateProfile}>
                            <Button className="w-full" type="submit" >
                                Изменить
                            </Button>
                        </UserRegForm>
                        <DialogClose asChild>
                          <Button className="" type="button" variant="secondary">
                            Закрыть
                          </Button>
                        </DialogClose>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="organization">
              {data?.organization === null ? (
                <div className="flex flex-col items-center py-6 gap-6">
                  <p className="text-lg text-center">Информации о вашей организации пока что нет в профиле</p>
                  <Button className="w-1/2"><Link href="sign-up/fill-organization-info">Заполнить</Link></Button>
                </div>
              ) : (
              <Card className="shadow-none">
                <CardHeader>
                  <CardTitle className="text-lg">Информация об организации</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Короткое название</p>
                      <p className="text-sm text-muted-foreground">{data?.organization.shortName}</p>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Название</p>
                      <p className="text-sm text-muted-foreground">{data?.organization.name}</p>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Тип</p>
                      <p className="text-sm text-muted-foreground">{data?.organization.type}</p>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Регион</p>
                      <p className="text-sm text-muted-foreground">{data?.organization.region}</p>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <p className="text-sm font-medium">12-значный ИНН</p>
                      <p className="text-sm text-muted-foreground">{data?.organization.taxpayerNumber}</p>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <p className="text-sm font-medium">9-значный КПП</p>
                      <p className="text-sm text-muted-foreground">{data?.organization.reasonCode}</p>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Адрес</p>
                      <p className="text-sm text-muted-foreground">{data?.organization.address}</p>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Экстренная почта</p>
                      <p className="text-sm text-muted-foreground">{data?.organization.specialEmail}</p>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Экстренный телефон</p>
                      <p className="text-sm text-muted-foreground">{data?.organization.specialPhone}</p>
                    </div>
                  </div>
                  <div className="flex gap-6 flex-col md:flex-row mt-6">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full">Изменить</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader className="hidden">
                          <DialogTitle />
                          <DialogDescription />
                        </DialogHeader>
                        <OrganizationForm initialValues={data?.organization} onSubmit={handleUpdateOrganization}>
                            <Button className="w-full" type="submit" >
                                Изменить
                            </Button>
                        </OrganizationForm>
                        <DialogClose asChild>
                          <Button className="" type="button" variant="secondary">
                            Закрыть
                          </Button>
                        </DialogClose>
                      </DialogContent>
                    </Dialog>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full" variant="destructive">Удалить</Button>
                      </DialogTrigger>
                      <DialogContent className="gap-6">
                        <DialogHeader>
                          <DialogTitle>Удаление организации</DialogTitle>
                          <DialogDescription>Вы действительно хотите удалить данные об организации?</DialogDescription>
                        </DialogHeader>
                        <div className="flex gap-2">
                          <Button onClick={() => handleDeleteOrganization()} className="w-full" variant="destructive">
                              Удалить
                          </Button>
                          <DialogClose asChild>
                            <Button className="w-full" type="button" variant="secondary">
                              Закрыть
                            </Button>
                          </DialogClose>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </CardContent>
              </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </div>
  )
}

