"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Separator } from "@/components/ui/separator"
import { useEffect, useState } from "react"
import Link from "next/link"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { OrganizationForm } from "../forms/organization-form"
import { UserRegForm } from "../forms/user-reg-form"
import { observer } from "mobx-react-lite"
import { userStore } from "../stores/user-store"
import { SettingForm } from "../forms/setting-form"

const Profile: React.FC = observer(() => {
  const { profile, isLoading, error, fetchProfile, updateProfile, updateSetting, updateOrganization, deleteOrganization } =
  userStore;

  useEffect(() => {
    if (profile === null) {
      fetchProfile()
    }
  }, []);

  return (
    <div className="py-4">
      <Card className="flex flex-col md:flex-row md:gap-6 p-6">
        {/* Left Section: Profile Information */}
        <div className="md:w-1/3 flex flex-col items-center md:items-center">
          {/* Profile Avatar */}
          <Avatar className="w-32 h-32 mb-4">
            <AvatarImage src={profile?.setting.avatarUrl} alt="User Avatar" />
            <AvatarFallback>{profile?.firstName.charAt(0)}{profile?.lastName.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="text-center">
            <h2 className="text-2xl font-bold mb-2">{profile?.firstName} {profile?.lastName}</h2>
            <p className="text-gray-500 mb-4">{profile?.email}</p>
          </div>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full">Изменить настройки</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Настройки пользователя</DialogTitle>
                          <DialogDescription>Изменение настроек пользователя</DialogDescription>
                        </DialogHeader>
                        <SettingForm initialValues={profile?.setting} onSubmit={updateSetting}>
                            <Button className="w-full" type="submit" >
                                Изменить
                            </Button>
                        </SettingForm>
                        <DialogClose asChild>
                          <Button className="" type="button" variant="secondary">
                            Закрыть
                          </Button>
                        </DialogClose>
                      </DialogContent>
                    </Dialog>
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
                      <p className="text-sm text-muted-foreground">{profile?.firstName}</p>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Фамилия</p>
                      <p className="text-sm text-muted-foreground">{profile?.lastName}</p>
                    </div>
                    {!!profile?.middleName === true ? (<>
                    <Separator />
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Отчество</p>
                      <p className="text-sm text-muted-foreground">{profile?.middleName}</p>
                    </div>
                    </>) : (<></>)}
                    <Separator />
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Электронная почта</p>
                      <p className="text-sm text-muted-foreground">{profile?.email}</p>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Часовой пояс</p>
                      <p className="text-sm text-muted-foreground">{profile?.setting.timezone}</p>
                    </div>
                  </div>
                  <div className="flex gap-6 flex-col md:flex-row mt-6">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full">Изменить</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>Профиль пользователя</DialogTitle>
                          <DialogDescription>Изменение профиля пользователя</DialogDescription>
                        </DialogHeader>
                        <UserRegForm initialValues={profile} onSubmit={updateProfile}>
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
              {profile?.organization === null ? (
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
                      <p className="text-sm text-muted-foreground">{profile?.organization.shortName}</p>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Название</p>
                      <p className="text-sm text-muted-foreground">{profile?.organization.name}</p>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Тип</p>
                      <p className="text-sm text-muted-foreground">{profile?.organization.type}</p>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Регион</p>
                      <p className="text-sm text-muted-foreground">{profile?.organization.region}</p>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <p className="text-sm font-medium">12-значный ИНН</p>
                      <p className="text-sm text-muted-foreground">{profile?.organization.taxpayerNumber}</p>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <p className="text-sm font-medium">9-значный КПП</p>
                      <p className="text-sm text-muted-foreground">{profile?.organization.reasonCode}</p>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Адрес</p>
                      <p className="text-sm text-muted-foreground">{profile?.organization.address}</p>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Экстренная почта</p>
                      <p className="text-sm text-muted-foreground">{profile?.organization.specialEmail}</p>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Экстренный телефон</p>
                      <p className="text-sm text-muted-foreground">{profile?.organization.specialPhone}</p>
                    </div>
                  </div>
                  <div className="flex gap-6 flex-col md:flex-row mt-6">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-full">Изменить</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>JОрганизация пользователя</DialogTitle>
                          <DialogDescription>Изменение организации пользователя</DialogDescription>
                        </DialogHeader>
                        <OrganizationForm initialValues={profile?.organization} onSubmit={updateOrganization}>
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
                          <Button onClick={() => deleteOrganization()} className="w-full" variant="destructive">
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
});

export default Profile

