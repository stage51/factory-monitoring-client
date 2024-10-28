"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

export default function Profile() {
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
            <h2 className="text-2xl font-bold mb-2">Иван Петров</h2>
            <p className="text-gray-500 mb-4">+7 (999) 123-45-67</p>
          </div>
        </div>


        {/* Right Section: Profile Details */}
        <div className="md:w-2/3 mt-6 md:mt-0">
          <Tabs defaultValue="profile">
            {/* Tabs Header */}
            <TabsList className="w-full mb-4">
              <TabsTrigger value="profile" className="w-1/2">Профиль</TabsTrigger>
              <TabsTrigger value="settings" className="w-1/2">Настройки</TabsTrigger>
            </TabsList>

            {/* Tab Content: Profile */}
            <TabsContent value="profile">
              <Card className="shadow-none">
                <CardHeader>
                  <CardTitle className="text-lg">Информация о профиле</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Имя</p>
                      <p className="text-sm text-muted-foreground">Иван</p>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Фамилия</p>
                      <p className="text-sm text-muted-foreground">Петров</p>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Отчество</p>
                      <p className="text-sm text-muted-foreground">Сергеевич</p>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Телефон</p>
                      <p className="text-sm text-muted-foreground">+7 (999) 123-45-67</p>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <p className="text-sm font-medium">Часовой пояс</p>
                      <p className="text-sm text-muted-foreground">UTC+3</p>
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <p className="text-sm font-medium">О себе</p>
                      <p className="text-sm text-muted-foreground">Опытный разработчик с страстью к созданию инновационных решений. Люблю путешествовать и изучать новые технологии.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Tab Content: Settings */}
            <TabsContent value="settings">
              <Card className="shadow-none">
                <CardHeader>
                  <CardTitle className="text-lg">Настройки аккаунта</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name">Имя</Label>
                      <Input id="first-name" type="text" placeholder="Введите имя" defaultValue="Иван" />
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <Label htmlFor="last-name">Фамилия</Label>
                      <Input id="last-name" type="text" placeholder="Введите фамилию" defaultValue="Петров" />
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <Label htmlFor="middle-name">Отчество</Label>
                      <Input id="middle-name" type="text" placeholder="Введите отчество" defaultValue="Сергеевич" />
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <Label htmlFor="phone">Телефон</Label>
                      <Input id="phone" type="text" placeholder="Введите телефон" defaultValue="+7 (999) 123-45-67" />
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <Label htmlFor="timezone">Часовой пояс</Label>
                      <Input id="timezone" type="text" placeholder="Введите часовой пояс" defaultValue="UTC+3" />
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <Label htmlFor="about">О себе</Label>
                      <Textarea id="about" placeholder="Расскажите о себе" defaultValue="Опытный разработчик с страстью к созданию инновационных решений. Люблю путешествовать и изучать новые технологии." />
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <Label htmlFor="password">Новый пароль</Label>
                      <Input id="password" type="password" placeholder="Введите новый пароль" />
                    </div>
                    <Separator />
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Подтвердите пароль</Label>
                      <Input id="confirm-password" type="password" placeholder="Подтвердите новый пароль" />
                    </div>
                    <Button className="mt-4">Сохранить изменения</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </Card>
    </div>
  )
}

