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
import apiClient from "@/components/shared/services/auth/api-client"
import { useEffect, useState } from "react"
import { se } from "date-fns/locale"

export default function SettingsTabs() {
  type Seo = {
    pageTitle: string;
    pageDescription: string;
    keywords: string;
    metaInfo: string;
  };
  type Security = {
    accessTokenSecretKey: string;
    apiTokenSecretKey: string;
    accessExpiration: number | string;
    refreshExpiration: number | string;
  };
  type DateTime = {
    defaultValue: string;
  };
  type Timing = {
    greenMonitoringTiming: number;
    yellowMonitoringTiming: number;
    redMonitoringTiming: number;
    greenFiveminuteTiming: number;
    yellowFiveminuteTiming: number;
    redFiveminuteTiming: number;
    greenDailyTiming: number;
    yellowDailyTiming: number;
    redDailyTiming: number;
  };

  const [security, setSecurity] = useState<Security>({
    accessTokenSecretKey: "",
    apiTokenSecretKey: "",
    accessExpiration: 0,
    refreshExpiration: 0,
  });
  const [dateTime, setDateTime] = useState<DateTime>({ defaultValue: "" });
  const [timing, setTiming] = useState<Timing>({
    greenMonitoringTiming: 0,
    yellowMonitoringTiming: 0,
    redMonitoringTiming: 0,
    greenFiveminuteTiming: 0,
    yellowFiveminuteTiming: 0,
    redFiveminuteTiming: 0,
    greenDailyTiming: 0,
    yellowDailyTiming: 0,
    redDailyTiming: 0,
  });
  const [seo, setSeo] = useState<Seo>({
    pageTitle: "",
    pageDescription: "",
    keywords: "",
    metaInfo: "",
  });

  // Универсальная функция для работы с Redis API
  const redisApi = async (
    method: "GET" | "POST",
    body?: { action?: string; key: string; value?: string }
  ) => {
    try {
      const url = method === "GET" && body?.key ? `/api/redis?key=${encodeURIComponent(body.key)}` : "/api/redis";
      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: method === "POST" ? JSON.stringify(body) : undefined,
      });
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      const json = await response.json();
      return json.value
    } catch (error) {
      console.error("Redis API error:", error);
      throw error;
    }
  };


  async function handleSaveSecurity(security: Security) {
    await updateConfig('config/application/security.access-token-secret-key', security.accessTokenSecretKey);
    await updateConfig('config/application/security.api-token-secret-key', security.apiTokenSecretKey);
    await updateConfig('config/application/security.access-expiration', security.accessExpiration);
    await updateConfig('config/application/security.refresh-expiration', security.refreshExpiration);
  }

  async function handleSaveDateTime(dateTime : DateTime) {
    await updateConfig('config/application/date-time.default-value', dateTime.defaultValue);
  }

  const handleSaveSeo = async (seo: Seo) => {
    try {
      await redisApi("POST", { action: "set", key: "page_title", value: seo.pageTitle });
      await redisApi("POST", { action: "set", key: "page_description", value: seo.pageDescription });
      await redisApi("POST", { action: "set", key: "keywords", value: seo.keywords });
      await redisApi("POST", { action: "set", key: "meta_info", value: seo.metaInfo });
    } catch (error) {
      console.error("Failed to save SEO data:", error);
    }
  };

  // Загрузка данных
  useEffect(() => {
    const setData = async () => {
      try {
        // Получение SEO данных
        setSeo({
          pageTitle: await redisApi("GET", { key: "page_title" }) || "",
          pageDescription: await redisApi("GET", { key: "page_description" }) || "",
          keywords: await redisApi("GET", { key: "keywords" }) || "",
          metaInfo: await redisApi("GET", { key: "meta_info" }) || "",
        });
  
        // Получение других данных
        setDateTime({
          defaultValue: await getConfig("config/application/date-time.default-value"),
        });
  
        setSecurity({
          accessTokenSecretKey: await getConfig("config/application/security.access-token-secret-key"),
          apiTokenSecretKey: await getConfig("config/application/security.api-token-secret-key"),
          accessExpiration: await getConfig("config/application/security.access-expiration"),
          refreshExpiration: await getConfig("config/application/security.refresh-expiration"),
        });
  
        setTiming({
          greenMonitoringTiming: await getConfig("config/application/timing.green-monitoring-timing"),
          yellowMonitoringTiming: await getConfig("config/application/timing.yellow-monitoring-timing"),
          redMonitoringTiming: await getConfig("config/application/timing.red-monitoring-timing"),
          greenFiveminuteTiming: await getConfig("config/application/timing.green-fiveminute-timing"),
          yellowFiveminuteTiming: await getConfig("config/application/timing.yellow-fiveminute-timing"),
          redFiveminuteTiming: await getConfig("config/application/timing.red-fiveminute-timing"),
          greenDailyTiming: await getConfig("config/application/timing.green-daily-timing"),
          yellowDailyTiming: await getConfig("config/application/timing.yellow-daily-timing"),
          redDailyTiming: await getConfig("config/application/timing.red-daily-timing"),
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    setData();
  }, []);
  
  
  
  const updateConfig = async (key: string, value: any) => {
    try {
      const response = await apiClient.put(`/config-server/config?key=${encodeURIComponent(key)}`, value, {
        headers: { 'Content-Type': 'text/plain' },
      });
      console.log('Configuration updated:', response.data);
    } catch (error) {
      console.error('Error updating configuration:', error);
    }
  };
  
  const getConfig = async (key: string): Promise<any> => {
    try {
      const response = await apiClient.get(`/config-server/config?key=${encodeURIComponent(key)}`);
      console.log('Configuration fetched:', response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching configuration:', error);
      return null;
    }
  };
  

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
                      <Label htmlFor="server-url">Адрес сервера</Label>
                      <Input id="server-url" type="text" placeholder="Введите URL сервера" defaultValue="localhost:8080/api/v1"/>
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
                      <Label htmlFor="page-title">Заголовки страниц по умолчанию</Label>
                      <Input 
                      value={seo.pageTitle}
                      onChange={(e) =>
                        setSeo({ ...seo, pageTitle: e.target.value })
                      }
                      id="page-header" type="text" placeholder="Введите текст" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="page-description">Описание страниц по умолчанию</Label>
                      <Input 
                      value={seo.pageDescription}
                      onChange={(e) =>
                        setSeo({ ...seo, pageDescription: e.target.value })
                      }
                      id="page-header" type="text" placeholder="Введите текст" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="keywords">Ключевые слова страниц по умолчанию</Label>
                      <Input 
                      value={seo.keywords}
                      onChange={(e) =>
                        setSeo({ ...seo, keywords: e.target.value })
                      }
                      id="keywords" type="text" placeholder="Введите текст" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="meta-info">Мета информация страниц по умолчанию</Label>
                      <Input 
                      value={seo.metaInfo}
                      onChange={(e) =>
                        setSeo({ ...seo, metaInfo: e.target.value })
                      }
                      id="meta-info" type="text" placeholder="Введите текст" />
                    </div>
                    <Button className="mt-4" onClick={() => {
                      handleSaveSeo(seo)
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
                      <Label htmlFor="access-token-secret-key">Секретный ключ для access токенов</Label>
                      <Input
                        id="access-token-secret-key"
                        type="text"
                        placeholder="Введите ключ"
                        value={security.accessTokenSecretKey || ""}
                        onChange={(e) =>
                          setSecurity({ ...security, accessTokenSecretKey: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="api-token-secret-key">Секретный ключ для api токенов</Label>
                      <Input
                        id="api-token-secret-key"
                        type="text"
                        placeholder="Введите ключ"
                        value={security.apiTokenSecretKey || ""}
                        onChange={(e) =>
                          setSecurity({ ...security, apiTokenSecretKey: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="access-expiration">Время жизни access токена</Label>
                      <Input
                        id="access-expiration"
                        type="number"
                        placeholder="Введите время в мс"
                        value={security.accessExpiration || ""}
                        onChange={(e) =>
                          setSecurity({
                            ...security,
                            accessExpiration: e.target.value
                              ? Number.parseInt(e.target.value)
                              : "",
                          })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="refresh-expiration">Время жизни refresh токена</Label>
                      <Input
                        id="refresh-expiration"
                        type="number"
                        placeholder="Введите время в мс"
                        value={security.refreshExpiration || ""}
                        onChange={(e) =>
                          setSecurity({
                            ...security,
                            refreshExpiration: e.target.value
                              ? Number.parseInt(e.target.value)
                              : "",
                          })
                        }
                      />
                    </div>
                    <Button
                      className="mt-4"
                      onClick={() => {
                        handleSaveSecurity(security);
                        toast({
                          title: "Настройки",
                          description: "Настройки сохранены",
                        });
                      }}
                    >
                      Сохранить изменения
                    </Button>
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
                    <div className="space-y-2">
                        <Label htmlFor="sign-up-type">Верификация</Label>
                        <Select>
                            <SelectTrigger>
                                <SelectValue id="sign-up-type" placeholder="Выберите тип"/>
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="admin-approval">Подтверждение администратора</SelectItem>
                                <SelectItem value="email-verification">Подтверждение через почту</SelectItem>
                                <SelectItem value="disable">Без верификации</SelectItem>
                            </SelectContent>
                        </Select>
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
                    <div className="space-y-2">
                        <Label htmlFor="default-value">Часовой пояс по умолчанию</Label>
                        <Select onValueChange={(e) => setDateTime({...dateTime, defaultValue: e})} defaultValue={dateTime.defaultValue}>
                            <SelectTrigger>
                                <SelectValue id="default-value" placeholder="Выберите значение"/>
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
                      handleSaveDateTime(dateTime)
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
                        <Input 
                        value={timing.greenMonitoringTiming / 1000 / 60 || 0}
                        onChange={(e) =>
                          setTiming({
                            ...timing,
                            greenMonitoringTiming: e.target.value
                              ? Number.parseInt(e.target.value) * 1000 * 60
                              : 0,
                          })
                        }
                        id="green-monitoring-timing" type="number" placeholder="Введите число" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="yellow-monitoring-timing">Желтая дата синхронизации с мониторингом, минуты</Label>
                        <Input 
                        value={timing.yellowMonitoringTiming / 1000 / 60 || 0}
                        onChange={(e) =>
                          setTiming({
                            ...timing,
                            yellowMonitoringTiming: e.target.value
                              ? Number.parseInt(e.target.value) * 1000 * 60
                              : 0,
                          })
                        }
                        id="yellow-monitoring-timing" type="number" placeholder="Введите число" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="red-monitoring-timing">Красная дата синхронизации с мониторингом, минуты</Label>
                        <Input 
                        value={timing.redMonitoringTiming / 1000 / 60 || 0}
                        onChange={(e) =>
                          setTiming({
                            ...timing,
                            redMonitoringTiming: e.target.value
                              ? Number.parseInt(e.target.value) * 1000 * 60
                              : 0,
                          })
                        }
                        id="red-monitoring-timing" type="number" placeholder="Введите число" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="green-fiveminute-timing">Зеленая дата синхронизации по пятиминутным с РАР, минуты</Label>
                        <Input 
                        value={timing.greenFiveminuteTiming / 1000 / 60 || 0}
                        onChange={(e) =>
                          setTiming({
                            ...timing,
                            greenFiveminuteTiming: e.target.value
                              ? Number.parseInt(e.target.value) * 1000 * 60
                              : 0,
                          })
                        }
                        id="green-fiveminute-timing" type="number" placeholder="Введите число" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="yellow-fiveminute-timing">Желтая дата синхронизации по пятиминутным с РАР, минуты</Label>
                        <Input 
                        value={timing.yellowFiveminuteTiming / 1000 / 60 || 0}
                        onChange={(e) =>
                          setTiming({
                            ...timing,
                            yellowFiveminuteTiming: e.target.value
                              ? Number.parseInt(e.target.value) * 1000 * 60
                              : 0,
                          })
                        }
                        id="yellow-fiveminute-timing" type="number" placeholder="Введите число" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="red-fiveminute-timing">Красная дата синхронизации по пятиминутным с РАР, минуты</Label>
                        <Input 
                        value={timing.redFiveminuteTiming / 1000 / 60 || 0}
                        onChange={(e) =>
                          setTiming({
                            ...timing,
                            redFiveminuteTiming: e.target.value
                              ? Number.parseInt(e.target.value) * 1000 * 60
                              : 0,
                          })
                        }
                        id="red-fiveminute-timing" type="number" placeholder="Введите число" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="green-daily-timing">Зеленая дата синхронизации по суточным с РАР, минуты</Label>
                        <Input 
                        value={timing.greenDailyTiming / 1000 / 60 || 0}
                        onChange={(e) =>
                          setTiming({
                            ...timing,
                            greenDailyTiming: e.target.value
                              ? Number.parseInt(e.target.value) * 1000 * 60
                              : 0,
                          })
                        }
                        id="green-daily-timing" type="number" placeholder="Введите число" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="yellow-daily-timing">Желтая дата синхронизации по суточным с РАР, минуты</Label>
                        <Input 
                        value={timing.yellowDailyTiming / 1000 / 60 || 0}
                        onChange={(e) =>
                          setTiming({
                            ...timing,
                            yellowDailyTiming: e.target.value
                              ? Number.parseInt(e.target.value) * 1000 * 60
                              : 0,
                          })
                        }
                        id="yellow-daily-timing" type="number" placeholder="Введите число" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="red-daily-timing">Красная дата синхронизации по суточным с РАР, минуты</Label>
                        <Input 
                        value={timing.redDailyTiming / 1000 / 60 || 0}
                        onChange={(e) =>
                          setTiming({
                            ...timing,
                            redDailyTiming: e.target.value
                              ? Number.parseInt(e.target.value) * 1000 * 60
                              : 0,
                          })
                        }
                        id="red-daily-timing" type="number" placeholder="Введите число" />
                    </div>
                    <Button className="mt-4" onClick={() => {
                      handleSaveTiming(timing)
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

