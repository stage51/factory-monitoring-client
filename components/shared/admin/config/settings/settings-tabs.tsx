"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Container from "@/components/shared/container"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/hooks/use-toast"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function SettingsTabs() {
  const { toast } = useToast()
  return (
    <Container className="items-center flex-col p-6 gap-6 animate-slide-element">
          <Tabs defaultValue="main">
            <TabsList className="flex md:flex-row flex-col h-full w-full mb-4 justify-start">
                <TabsTrigger value="main" className="w-full md:w-[12.5%]">Основные</TabsTrigger>
                <TabsTrigger value="seo" className="w-full md:w-[12.5%]">SEO</TabsTrigger>
                <TabsTrigger value="security" className="w-full md:w-[12.5%]">Безопасность</TabsTrigger>
                <TabsTrigger value="user" className="w-full md:w-[12.5%]">Пользователь</TabsTrigger>
                <TabsTrigger value="date-time" className="w-full md:w-[12.5%]">Дата и время</TabsTrigger>
                <TabsTrigger value="private-messages" className="w-full md:w-[12.5%]">Сообщения</TabsTrigger>
                <TabsTrigger value="timing" className="w-full md:w-[12.5%]">Тайминги</TabsTrigger>
                <TabsTrigger value="reports" className="w-full md:w-[12.5%]">Отчеты</TabsTrigger>
            </TabsList>
            <TabsContent value="main">
              <Card className="shadow-none">
                <CardHeader>
                  <CardTitle className="text-lg">Основные настройки</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Название приложения</Label>
                      <Input id="name" type="text" placeholder="Введите название" defaultValue="ЕГАИС Мониторинг" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="url">URL приложения</Label>
                      <Input id="url" type="text" placeholder="Введите URL" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="ssl-url">SSL URL приложения</Label>
                      <Input id="ssl-url" type="text" placeholder="Введите URL для SSL" />
                    </div>
                    <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <Label htmlFor="ssl">Поддержка SSL</Label>
                      <Switch />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company-name">Название компании</Label>
                      <Input id="company-name" type="text" placeholder="Введите название компании" defaultValue="ООО «Центр ИКТ»" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company-address">Адрес компании</Label>
                      <Input id="company-address" type="text" placeholder="Введите адрес" defaultValue="г. Москва, Остаповский проезд, д. 5, стр. 4, под. 4, офис 121" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company-phone">Телефон компании</Label>
                      <Input id="company-phone" type="phone" placeholder="Введите телефон компании" defaultValue="+7 (499) 653-61-43" />
                    </div>
                    <Button className="mt-4" onClick={() => {
                      toast({
                        title: "Настройки",
                        description: "Настройки сохранены",
                      })}}>Сохранить изменения</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="seo">
              <Card className="shadow-none">
                <CardHeader>
                  <CardTitle className="text-lg">SEO настройки</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="page-header">Заголовки страниц по умолчанию</Label>
                      <Input id="page-header" type="text" placeholder="Введите текст" defaultValue="ЕГАИС Мониторинг" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="keywords">Ключевые слова страниц по умолчанию</Label>
                      <Input id="keywords" type="text" placeholder="Введите текст" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="meta-info">Мета информация страниц по умолчанию</Label>
                      <Input id="meta-info" type="text" placeholder="Введите текст" />
                    </div>
                    <Button className="mt-4" onClick={() => {
                      toast({
                        title: "Настройки",
                        description: "Настройки сохранены",
                      })}}>Сохранить изменения</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="security">
              <Card className="shadow-none">
                <CardHeader>
                  <CardTitle className="text-lg">Настройки безопасности</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="cipher">Ключ шифрования</Label>
                      <Input id="cipher" type="number" placeholder="Введите ключ" />
                    </div>
                    <Button className="mt-4" onClick={() => {
                      toast({
                        title: "Настройки",
                        description: "Настройки сохранены",
                      })}}>Сохранить изменения</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="user">
              <Card className="shadow-none">
                <CardHeader>
                  <CardTitle className="text-lg">Настройки пользотелей</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <Label htmlFor="allow-change-username">Смена имен пользователей</Label>
                      <Switch />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="sign-up-type">Тип регистрации</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue id="sign-up-type" placeholder="Выберите тип"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="admin-approval">Подтверждение администратора</SelectItem>
                                <SelectItem value="email-validation">Подтверждение через почту</SelectItem>
                                <SelectItem value="disable">Нет</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password-type">Хранение паролей</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue id="password-type" placeholder="Выберите тип"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="hashed">Хэш-значение</SelectItem>
                                <SelectItem value="encrypted">Зашифрованное</SelectItem>
                                <SelectItem value="clear">В открытом виде</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password-size">Минимальная длина паролей</Label>
                        <Input id="password-size" type="number" placeholder="Введите число" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password-size">Время жизни ссылки для восстановления пароля, дней</Label>
                        <Input id="password-recovery-lifetime" type="number" placeholder="Введите число" />
                    </div>
                    <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <Label htmlFor="news-subscription">Новостная подписка для пользователей</Label>
                      <Switch />
                    </div>
                    <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <Label htmlFor="send-email">Отправка email на новом личном сообщении</Label>
                      <Switch />
                    </div>
                    <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <Label htmlFor="upload-avatar">Загрузка аватаров</Label>
                      <Switch />
                    </div>
                    <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <Label htmlFor="view-profile">Просмотр профилей пользователей</Label>
                      <Switch />
                    </div>
                    <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <Label htmlFor="fill-company-info">Форма заполнения данных компании при регистрации</Label>
                      <Switch />
                    </div>
                    <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <Label htmlFor="notify-sign-up">Уведомление о новой регистрации пользователя</Label>
                      <Switch />
                    </div>
                    <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <Label htmlFor="notify-sign-up">Согласие с политикой при регистрации</Label>
                      <Switch />
                    </div>
                    <Button className="mt-4" onClick={() => {
                      toast({
                        title: "Настройки",
                        description: "Настройки сохранены",
                      })}}>Сохранить изменения</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="date-time">
              <Card className="shadow-none">
                <CardHeader>
                  <CardTitle className="text-lg">Настройки даты и время</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <Label htmlFor="allow-change-username">Смена часовых поясов</Label>
                        <Switch />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="sign-up-type">Часовой пояс по умолчанию</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue id="sign-up-type" placeholder="Выберите тип"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="UTC-12:00">UTC-12:00</SelectItem>
                                <SelectItem value="UTC-11:00">UTC-11:00</SelectItem>
                                <SelectItem value="UTC-10:00">UTC-10:00 (Hawaii-Aleutian Time)</SelectItem>
                                <SelectItem value="UTC-09:00">UTC-09:00 (Alaska Time)</SelectItem>
                                <SelectItem value="UTC-08:00">UTC-08:00 (Pacific Time)</SelectItem>
                                <SelectItem value="UTC-07:00">UTC-07:00 (Mountain Time)</SelectItem>
                                <SelectItem value="UTC-06:00">UTC-06:00 (Central Time)</SelectItem>
                                <SelectItem value="UTC-05:00">UTC-05:00 (Eastern Time)</SelectItem>
                                <SelectItem value="UTC-04:00">UTC-04:00 (Atlantic Time)</SelectItem>
                                <SelectItem value="UTC-03:00">UTC-03:00</SelectItem>
                                <SelectItem value="UTC-02:00">UTC-02:00</SelectItem>
                                <SelectItem value="UTC-01:00">UTC-01:00</SelectItem>
                                <SelectItem value="UTC+00:00">UTC+00:00 (GMT)</SelectItem>
                                <SelectItem value="UTC+01:00">UTC+01:00 (Central European Time)</SelectItem>
                                <SelectItem value="UTC+02:00">UTC+02:00 (Eastern European Time)</SelectItem>
                                <SelectItem value="UTC+03:00">UTC+03:00 (Moscow Time)</SelectItem>
                                <SelectItem value="UTC+03:30">UTC+03:30 (Iran Standard Time)</SelectItem>
                                <SelectItem value="UTC+04:00">UTC+04:00 (Gulf Standard Time)</SelectItem>
                                <SelectItem value="UTC+04:30">UTC+04:30 (Afghanistan Time)</SelectItem>
                                <SelectItem value="UTC+05:00">UTC+05:00 (Pakistan Standard Time)</SelectItem>
                                <SelectItem value="UTC+05:30">UTC+05:30 (India Standard Time)</SelectItem>
                                <SelectItem value="UTC+05:45">UTC+05:45 (Nepal Time)</SelectItem>
                                <SelectItem value="UTC+06:00">UTC+06:00 (Bangladesh Time)</SelectItem>
                                <SelectItem value="UTC+06:30">UTC+06:30 (Cocos Islands Time)</SelectItem>
                                <SelectItem value="UTC+07:00">UTC+07:00 (Indochina Time)</SelectItem>
                                <SelectItem value="UTC+08:00">UTC+08:00 (China Standard Time)</SelectItem>
                                <SelectItem value="UTC+08:45">UTC+08:45 (Australian Central Western Time)</SelectItem>
                                <SelectItem value="UTC+09:00">UTC+09:00 (Japan Standard Time)</SelectItem>
                                <SelectItem value="UTC+09:30">UTC+09:30 (Australian Central Time)</SelectItem>
                                <SelectItem value="UTC+10:00">UTC+10:00 (Australian Eastern Time)</SelectItem>
                                <SelectItem value="UTC+10:30">UTC+10:30 (Lord Howe Island Time)</SelectItem>
                                <SelectItem value="UTC+11:00">UTC+11:00 (Solomon Islands Time)</SelectItem>
                                <SelectItem value="UTC+12:00">UTC+12:00 (New Zealand Standard Time)</SelectItem>
                                <SelectItem value="UTC+12:45">UTC+12:45 (Chatham Islands Time)</SelectItem>
                                <SelectItem value="UTC+13:00">UTC+13:00 (Tonga Time)</SelectItem>
                                <SelectItem value="UTC+14:00">UTC+14:00 (Line Islands Time)</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                    <Button className="mt-4" onClick={() => {
                      toast({
                        title: "Настройки",
                        description: "Настройки сохранены",
                      })}}>Сохранить изменения</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="private-messages">
              <Card className="shadow-none">
                <CardHeader>
                  <CardTitle className="text-lg">Настройки личных сообщений</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <Label htmlFor="allow-private-messages">Возможность оставлять личные сообщения</Label>
                      <Switch />
                    </div>
                    <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <Label htmlFor="notify-private-messages">Уведомление о личных сообщениях</Label>
                      <Switch />
                    </div>
                    <Button className="mt-4" onClick={() => {
                      toast({
                        title: "Настройки",
                        description: "Настройки сохранены",
                      })}}>Сохранить изменения</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="timing">
              <Card className="shadow-none">
                <CardHeader>
                  <CardTitle className="text-lg">Настройки таймингов</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="space-y-2">
                        <Label htmlFor="green-monitoring-timing">Зеленая дата синхронизации с мониторингом, минуты</Label>
                        <Input id="green-monitoring-timing" type="number" placeholder="Введите число" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="yellow-monitoring-timing">Желтая дата синхронизации с мониторингом, минуты</Label>
                        <Input id="yellow-monitoring-timing" type="number" placeholder="Введите число" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="green-navigation-rar-timing">Зеленая дата синхронизации по навигации с РАР, минуты</Label>
                        <Input id="green-navigation-rar-timing" type="number" placeholder="Введите число" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="yellow-navigation-rar-timing">Желтая дата синхронизации по навигации с РАР, минуты</Label>
                        <Input id="yellow-navigation-rar-timing" type="number" placeholder="Введите число" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="green-daily-rar-timing">Зеленая дата синхронизации по суточным с РАР, минуты</Label>
                        <Input id="green-daily-rar-timing" type="number" placeholder="Введите число" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="green-daily-rar-timing">Желтая дата синхронизации по суточным с РАР, минуты</Label>
                        <Input id="green-daily-rar-timing" type="number" placeholder="Введите число" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="green-tth-rar-timing">Зеленая дата синхронизации по ТТН с РАР, минуты</Label>
                        <Input id="green-tth-rar-timing" type="number" placeholder="Введите число" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="yellow-tth-rar-timing">Желтая дата синхронизации по ТТН с РАР, минуты</Label>
                        <Input id="yellow-tth-rar-timing" type="number" placeholder="Введите число" />
                    </div>
                    <Button className="mt-4" onClick={() => {
                      toast({
                        title: "Настройки",
                        description: "Настройки сохранены",
                      })}}>Сохранить изменения</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="reports">
              <Card className="shadow-none">
                <CardHeader>
                  <CardTitle className="text-lg">Настройки отчетов</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <h2 className="font-semibold text-sm">XML</h2>
                    <div className="space-y-2">
                        <Label htmlFor="xml-resource">Путь к папке хранения XML отчетов</Label>
                        <Input id="xml-resource" type="text" placeholder="Введите текст" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="xml-domain">Домен хранения XML отчетов</Label>
                        <Input id="xml-domain" type="text" placeholder="Введите текст" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="xml-login">Логин ресурса для XML отчетов</Label>
                        <Input id="xml-login" type="login" placeholder="Введите текст" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="xml-password">Пароль ресурса для XML отчетов</Label>
                        <Input id="xml-password" type="password" placeholder="Введите пароль" />
                    </div>
                    <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <Label htmlFor="save-daily-xml-files">Сохранение XML-файлов суточных</Label>
                        <Switch />
                    </div>
                    <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <Label htmlFor="save-tth-xml-files">Сохранение XML-файлов ТТН</Label>
                        <Switch />
                    </div>
                    <Separator />
                    <h2 className="font-semibold text-sm">Excel</h2>
                    <div className="space-y-2">
                        <Label htmlFor="excel-admin-path">Относительный путь к папке файлов Excel для администратора</Label>
                        <Input id="excel-admin-path" type="text" placeholder="Введите текст" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="excel-user-path">Относительный путь к папке файлов Excel для пользователя</Label>
                        <Input id="excel-user-path" type="text" placeholder="Введите текст" />
                    </div>
                    <Button className="mt-4" onClick={() => {
                      toast({
                        title: "Настройки",
                        description: "Настройки сохранены",
                      })}}>Сохранить изменения</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
    </Container>
  )
}

