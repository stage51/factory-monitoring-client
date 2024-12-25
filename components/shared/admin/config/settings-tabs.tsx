"use client"

import Container from "@/components/shared/container"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/components/hooks/use-toast"
import { Switch } from "@/components/ui/switch"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useEffect, useState } from "react"
import { getConfig, updateConfig } from "@/components/shared/services/config/config"
import apiClient from "@/components/shared/services/auth/api-client"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { z, ZodNull } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"

const FormSchema = z.object({
  type: z.enum(["3", "6", "12"], {
    required_error: "Необходимо выбрать время жизни",
  }),
})
type Company = {
  companyName: string;
  companyAddress: string;
  companyMailAddress: string;
  companyPhone: string;
  companyEmail: string;
}
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
  defaultUserTimezone: string;
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
type Email = {
  host: string;
  port: number;
  username: string;
  password: string;
  sslEnable: boolean;
  starttlsEnable: boolean;
  registrationNotification: boolean;
  registrationNotificationFor: string;
  helpNotification: boolean;
  helpNotificationFor: string;
}
type User = {
  recoveryUrlLifetime: number;
  avatarUpload: boolean;
  imageHostingApiUrl: string;
  imageHostingSecretKey: string;
}
type XMLReports = {
  ftpHost: string;
  ftpPort: number;
  ftpUsername: string;
  ftpPassword: string;
  ftpDirectory: string;
  dailyReport: boolean;
  fiveMinuteReport: boolean;
  modeReport: boolean;
}

type ApiToken = {
  value: string;
}

export default function SettingsTabs() {
  const [company, setCompany] = useState<Company>({
    companyName: "",
    companyAddress: "",
    companyMailAddress: "",
    companyPhone: "",
    companyEmail: "",
  })
  const [seo, setSeo] = useState<Seo>({
    pageTitle: "",
    pageDescription: "",
    keywords: "",
    metaInfo: "",
  });
  const [security, setSecurity] = useState<Security>({
    accessTokenSecretKey: "",
    apiTokenSecretKey: "",
    accessExpiration: 0,
    refreshExpiration: 0,
  });
  const [dateTime, setDateTime] = useState<DateTime>({ defaultValue: "", defaultUserTimezone: "" });
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
  const [email, setEmail] = useState<Email>({
    host: "",
    port: 0,
    username: "",
    password: "",
    sslEnable: false,
    starttlsEnable: false,
    registrationNotification: false,
    registrationNotificationFor: "",
    helpNotification: false,
    helpNotificationFor: ""
  })
  const [user, setUser] = useState<User>({
    recoveryUrlLifetime: 0,
    avatarUpload: false,
    imageHostingApiUrl: "",
    imageHostingSecretKey: ""
  })
  const [XMLReports, setXMLReports] = useState<XMLReports>({
    ftpHost: "",
    ftpPort: 0,
    ftpUsername: "",
    ftpPassword: "",
    ftpDirectory: "",
    dailyReport: true,
    fiveMinuteReport: true,
    modeReport: true
  })
  const [apiToken, setApiToken] = useState<string>("")

  const handleSaveCompany = async (company: Company) => {
    await updateConfig("config/next-app/company.company-name", company.companyName);
    await updateConfig("config/next-app/company.company-address", company.companyAddress);
    await updateConfig("config/next-app/company.company-mail-address", company.companyMailAddress);
    await updateConfig("config/next-app/company.company-phone", company.companyPhone);
    await updateConfig("config/next-app/company.company-email", company.companyEmail);
  }
  const handleSaveSeo = async (seo: Seo) => {
    await updateConfig('config/next-app/seo.page-title', seo.pageTitle);
    await updateConfig('config/next-app/seo.page-description', seo.pageDescription);
    await updateConfig('config/next-app/seo.keyword', seo.keywords);
    await updateConfig('config/next-app/seo.meta-info', seo.metaInfo);
  };
  async function handleSaveSecurity(security: Security) {
    await updateConfig('config/application/security.access-token-secret-key', security.accessTokenSecretKey);
    await updateConfig('config/application/security.api-token-secret-key', security.apiTokenSecretKey);
    await updateConfig('config/application/security.access-expiration', security.accessExpiration);
    await updateConfig('config/application/security.refresh-expiration', security.refreshExpiration);
  }
  async function handleSaveDateTime(dateTime : DateTime) {
    await updateConfig('config/application/date-time.default-value', dateTime.defaultValue);
    await updateConfig('config/application/date-time.default-user-timezone', dateTime.defaultUserTimezone);
  }
  async function handleSaveTiming(timing : Timing) {
    await updateConfig("config/application/timing.green-monitoring-timing", timing.greenMonitoringTiming);
    await updateConfig("config/application/timing.yellow-monitoring-timing", timing.yellowMonitoringTiming);
    await updateConfig("config/application/timing.red-monitoring-timing", timing.redMonitoringTiming);
    await updateConfig("config/application/timing.green-daily-timing", timing.greenDailyTiming);
    await updateConfig("config/application/timing.yellow-daily-timing", timing.yellowDailyTiming);
    await updateConfig("config/application/timing.red-daily-timing", timing.redDailyTiming);
    await updateConfig("config/application/timing.green-fiveminute-timing", timing.greenFiveminuteTiming);
    await updateConfig("config/application/timing.yellow-fiveminute-timing", timing.yellowFiveminuteTiming);
    await updateConfig("config/application/timing.red-fiveminute-timing", timing.redFiveminuteTiming);
  }
  async function handleSaveEmail(email : Email) {
    await updateConfig("config/mail-service/spring.mail.host", email.host)
    await updateConfig("config/mail-service/spring.mail.port", email.port)
    await updateConfig("config/mail-service/spring.mail.username", email.username)
    await updateConfig("config/mail-service/spring.mail.password", email.password)
    await updateConfig("config/mail-service/spring.mail.properties.mail.smtp.ssl.enable", email.sslEnable || "false")
    await updateConfig("config/mail-service/spring.mail.properties.mail.smtp.starttls.enable", email.starttlsEnable || "false")
    await updateConfig("config/application/email.registration-notification", email.registrationNotification || "false")
    await updateConfig("config/application/email.registration-notification-for", email.registrationNotificationFor)
    await updateConfig("config/application/email.help-notification", email.helpNotification || "false")
    await updateConfig("config/application/email.help-notification-for", email.helpNotificationFor)
  }
  async function handleSaveUser(user : User) {
    await updateConfig("config/application/user.recovery-url-lifetime", user.recoveryUrlLifetime)
    await updateConfig("config/application/user.avatar-upload", user.avatarUpload || "false")
    await updateConfig("config/next-app/user.avatar-upload", user.avatarUpload || "false")
    await updateConfig("config/application/user.image-hosting-api-url", user.imageHostingApiUrl)
    await updateConfig("config/application/user.image-hosting-secret-key", user.imageHostingSecretKey)
  }
  async function handleSaveXMLReports(XMLReports : XMLReports) {
    await updateConfig("config/application/xml-reports.ftp-host", XMLReports.ftpHost)
    await updateConfig("config/application/xml-reports.ftp-port", XMLReports.ftpPort)
    await updateConfig("config/application/xml-reports.ftp-username", XMLReports.ftpUsername)
    await updateConfig("config/application/xml-reports.ftp-password", XMLReports.ftpPassword)
    await updateConfig("config/application/xml-reports.ftp-directory", XMLReports.ftpDirectory)
    await updateConfig("config/application/xml-reports.daily-report", XMLReports.dailyReport || "false")
    await updateConfig("config/application/xml-reports.five-minute-report", XMLReports.fiveMinuteReport || "false")
    await updateConfig("config/application/xml-reports.mode-report", XMLReports.modeReport || "false")
  }
  async function handleCreateApiToken(data: z.infer<typeof FormSchema>) {
    const expiration = Number.parseInt(data.type) * 30 * 24 * 60 * 60 * 1000
    const response = await apiClient.get("/auth-server/auth/create-api-token", { params : {expiration}})
    setApiToken(response.data.apiToken)
  }

  useEffect(() => {
    const setData = async () => {
      try {
        setCompany({
          companyName: await getConfig("config/next-app/company.company-name"),
          companyAddress: await getConfig("config/next-app/company.company-address"),
          companyMailAddress: await getConfig("config/next-app/company.company-mail-address"),
          companyPhone: await getConfig("config/next-app/company.company-phone"),
          companyEmail: await getConfig("config/next-app/company.company-email")
        })
        setSeo({
          pageTitle: await getConfig("config/next-app/seo.page-title"),
          pageDescription: await getConfig("config/next-app/seo.page-description"),
          keywords: await getConfig("config/next-app/seo.keywords"),
          metaInfo: await getConfig("config/next-app/seo.meta-info")
        });
  
        setDateTime({
          defaultValue: await getConfig("config/application/date-time.default-value"),
          defaultUserTimezone: await getConfig("config/application/date-time.default-user-timezone")
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

        setEmail({
          host: await getConfig("config/mail-service/spring.mail.host"),
          port: await getConfig("config/mail-service/spring.mail.port"),
          username: await getConfig("config/mail-service/spring.mail.username"),
          password: await getConfig("config/mail-service/spring.mail.password"),
          sslEnable: await getConfig("config/mail-service/spring.mail.properties.mail.smtp.ssl.enable"),
          starttlsEnable: await getConfig("config/mail-service/spring.mail.properties.mail.smtp.starttls.enable"),
          registrationNotification: await getConfig("config/application/email.registration-notification"),
          registrationNotificationFor: await getConfig("config/application/email.registration-notification-for"),
          helpNotification: await getConfig("config/application/email.help-notification"),
          helpNotificationFor: await getConfig("config/application/email.help-notification-for")
        })

        setUser({
          recoveryUrlLifetime: await getConfig("config/application/user.recovery-url-lifetime"),
          avatarUpload: await getConfig("config/application/user.avatar-upload"),
          imageHostingApiUrl: await getConfig("config/application/user.image-hosting-api-url"),
          imageHostingSecretKey: await getConfig("config/application/user.image-hosting-secret-key")
        })

        setXMLReports({
          ftpHost: await getConfig("config/application/xml-reports.ftp-host"),
          ftpPort: await getConfig("config/application/xml-reports.ftp-port"),
          ftpUsername: await getConfig("config/application/xml-reports.ftp-username"),
          ftpPassword: await getConfig("config/application/xml-reports.ftp-password"),
          ftpDirectory: await getConfig("config/application/xml-reports.ftp-directory"),
          dailyReport: await getConfig("config/application/xml-reports.daily-report"),
          fiveMinuteReport: await getConfig("config/application/xml-reports.five-minute-report"),
          modeReport: await getConfig("config/application/xml-reports.mode-report")
        })
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    setData();
  }, []);

  const { toast } = useToast()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  })

  return (
    <Container className="items-center flex-col p-6 gap-6 animate-slide-element">
          <Tabs defaultValue="company">
            <TabsList className="flex md:flex-row flex-col h-full w-full mb-4 justify-start">
                <TabsTrigger value="company" className="w-full md:w-[12.5%]">Компания</TabsTrigger>
                <TabsTrigger value="seo" className="w-full md:w-[12.5%]">SEO</TabsTrigger>
                <TabsTrigger value="security" className="w-full md:w-[12.5%]">Безопасность</TabsTrigger>
                <TabsTrigger value="user" className="w-full md:w-[12.5%]">Пользователь</TabsTrigger>
                <TabsTrigger value="date-time" className="w-full md:w-[12.5%]">Дата и время</TabsTrigger>
                <TabsTrigger value="email" className="w-full md:w-[12.5%]">Почта</TabsTrigger>
                <TabsTrigger value="timing" className="w-full md:w-[12.5%]">Тайминги</TabsTrigger>
                <TabsTrigger value="reports" className="w-full md:w-[12.5%]">Отчеты</TabsTrigger>
            </TabsList>
            <TabsContent value="company">
              <Card className="shadow-none">
                <CardHeader>
                  <CardTitle className="text-lg">Настройки компании</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="company-name">Название компании</Label>
                      <Input 
                      value={company.companyName}
                      onChange={(e) =>
                        setCompany({ ...company, companyName: e.target.value })
                      }
                      id="company-name" type="text" placeholder="Введите название компании"/>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company-address">Адрес компании</Label>
                      <Input 
                      value={company.companyAddress}
                      onChange={(e) =>
                        setCompany({ ...company, companyAddress: e.target.value })
                      }
                      id="company-address" type="text" placeholder="Введите адрес"/>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company-mail-address">Адрес для писем</Label>
                      <Input 
                      value={company.companyMailAddress}
                      onChange={(e) =>
                        setCompany({ ...company, companyMailAddress: e.target.value })
                      }
                      id="company-mail-address" type="text" placeholder="Введите адрес для писем"/>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company-phone">Телефон компании</Label>
                      <Input 
                      value={company.companyPhone}
                      onChange={(e) =>
                        setCompany({ ...company, companyPhone: e.target.value })
                      }
                      id="company-phone" type="phone" placeholder="Введите телефон компании"/>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company-email">Электронный адрес</Label>
                      <Input 
                      value={company.companyEmail}
                      onChange={(e) =>
                        setCompany({ ...company, companyEmail: e.target.value })
                      }
                      id="company-email" type="email" placeholder="Введите электронный адрес"/>
                    </div>
                    <Button className="mt-4" onClick={() => {
                      handleSaveCompany(company)
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
                      <Label htmlFor="create-api-token">Сгенерировать api токен</Label>
                      <div className="flex w-full items-center space-x-2">
                        <Input
                          id="create-api-token"
                          type="text"
                          placeholder="API токен"
                          aria-disabled={true}
                          value={apiToken}
                        />
                        <Button variant="outline"
                        onClick={() => {
                          navigator.clipboard.writeText(apiToken)
                          .then(() => {
                            toast({
                              title: "API токен",
                              description: "Токен скопирован",
                            })
                          })
                          .catch(() => {
                            toast({
                              title: "API токен",
                              variant: "destructive",
                              description: "Текст не скопирован"
                            })
                          })
                        }}>
                          Скопировать
                        </Button>  
                      </div>
                      <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleCreateApiToken)} className="w-2/3 space-y-4">
                          <FormField
                            control={form.control}
                            name="type"
                            render={({ field }) => (
                              <FormItem className="space-y-3">
                                <FormLabel>Время жизни</FormLabel>
                                <FormControl>
                                  <RadioGroup
                                    onValueChange={field.onChange}
                                    defaultValue={field.value}
                                    className="flex flex-row gap-4"
                                  >
                                    <FormItem className="flex items-center space-x-1 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="3" />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        3 месяца
                                      </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-1 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="6" />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        6 месяцев
                                      </FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-1 space-y-0">
                                      <FormControl>
                                        <RadioGroupItem value="12" />
                                      </FormControl>
                                      <FormLabel className="font-normal">
                                        12 месяцев
                                      </FormLabel>
                                    </FormItem>
                                  </RadioGroup>
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <Button type="submit">Сгенерировать</Button>
                        </form>
                      </Form>
                    </div>
                    <Separator />
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
                        <Label htmlFor="recovery-url-lifetime">Время жизни кода для восстановления пароля, мин</Label>
                        <Input id="recovery-url-lifetime" type="number" placeholder="Введите число"
                        value={user.recoveryUrlLifetime} onChange={(e) => setUser({...user, recoveryUrlLifetime: Number.parseInt(e.target.value)})}/>
                    </div>
                    <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <Label htmlFor="avatar-upload">Загрузка аватаров</Label>
                      <Switch checked={!!user.avatarUpload} onCheckedChange={(e) => setUser({...user, avatarUpload: e})}/>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="image-hosting-api-url">Ссылка на API хостинга изображений (аватаров)</Label>
                        <Input id="image-hosting-api-url" type="text" placeholder="Введите ссылку" disabled={!user.avatarUpload}
                        value={user.imageHostingApiUrl} onChange={(e) => setUser({...user, imageHostingApiUrl: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="image-hosting-secret-key">API ключ для хостинга изображений</Label>
                        <Input id="image-hosting-secret-key" type="text" placeholder="Введите ключ" disabled={!user.avatarUpload}
                        value={user.imageHostingSecretKey} onChange={(e) => setUser({...user, imageHostingSecretKey: e.target.value})} />
                    </div>
                    <Button className="mt-4" onClick={() => {
                      handleSaveUser(user)
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
                        <Label htmlFor="default-value">Серверный часовой пояс</Label>
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
                    <div className="space-y-2">
                        <Label htmlFor="default-user-timezone">Часовой пояс по умолчанию при регистрации</Label>
                        <Select onValueChange={(e) => setDateTime({...dateTime, defaultUserTimezone: e})} defaultValue={dateTime.defaultUserTimezone}>
                            <SelectTrigger>
                                <SelectValue id="default-user-timezone" placeholder="Выберите значение"/>
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
            <TabsContent value="email">
              <Card className="shadow-none">
                <CardHeader>
                  <CardTitle className="text-lg">Настройки сервиса электронной почты</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="host">Почтовый сервер</Label>
                      <Input
                        id="host"
                        type="text"
                        placeholder="Введите URL"
                        value={email.host || ""}
                        onChange={(e) =>
                          setEmail({ ...email, host: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="port">Порт</Label>
                      <Input
                        id="port"
                        type="number"
                        placeholder="Введите число"
                        value={email.port || ""}
                        onChange={(e) =>
                          setEmail({ ...email, port: Number.parseInt(e.target.value) })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="username">Имя аккаунта</Label>
                      <Input
                        id="username"
                        type="text"
                        placeholder="Введите имя"
                        value={email.username || ""}
                        onChange={(e) =>
                          setEmail({ ...email, username: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="password">Пароль от аккаунта</Label>
                      <Input
                        id="password"
                        type="password"
                        placeholder="Введите URL"
                        value={email.password || ""}
                        onChange={(e) =>
                          setEmail({ ...email, password: e.target.value })
                        }
                      />
                    </div>
                    <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <Label htmlFor="ssl-enable">Подключение по SSL/TLS</Label>
                      <Switch checked={!!email.sslEnable} onCheckedChange={(e) => setEmail({...email, sslEnable: e})}/>
                    </div>
                    <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <Label htmlFor="starttls-enable">Подключение по StartTLS</Label>
                      <Switch checked={!!email.starttlsEnable} onCheckedChange={(e) => setEmail({...email, starttlsEnable: e})}/>
                    </div>
                    <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <Label htmlFor="registration-notification">Уведомление о регистрациях пользователей</Label>
                      <Switch checked={!!email.registrationNotification} onCheckedChange={(e) => setEmail({...email, registrationNotification: e})}/>
                    </div>
                    <RadioGroup className="mx-2" 
                    disabled={!email.registrationNotification} 
                    defaultValue={email.registrationNotificationFor}
                    onValueChange={(e) => setEmail({...email, registrationNotificationFor: e})}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="admin-only" id="admin-only" />
                        <Label htmlFor="admin-only">Только администраторам</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="admin-manager" id="admin-manager" />
                        <Label htmlFor="admin-manager">Администраторам и менеджерам</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="manager-only" id="manager-only" />
                        <Label htmlFor="manager-only">Только менеджерам</Label>
                      </div>
                    </RadioGroup>
                    <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <Label htmlFor="help-notification">Уведомление о заявлениях в сервис</Label>
                      <Switch checked={!!email.helpNotification} onCheckedChange={(e) => setEmail({...email, helpNotification: e})}/>
                    </div>
                    <RadioGroup className="mx-2" 
                    disabled={!email.helpNotification} 
                    defaultValue={email.helpNotificationFor}
                    onValueChange={(e) => setEmail({...email, helpNotificationFor: e})}>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="admin-only" id="admin-only" />
                        <Label htmlFor="admin-only">Только администраторам</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="admin-manager" id="admin-manager" />
                        <Label htmlFor="admin-manager">Администраторам и менеджерам</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="manager-only" id="manager-only" />
                        <Label htmlFor="manager-only">Только менеджерам</Label>
                      </div>
                    </RadioGroup>
                    <Button className="mt-4" onClick={() => {
                      handleSaveEmail(email)
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
                    <div className="space-y-2">
                        <Label htmlFor="ftp-host">Адрес FTP сервера</Label>
                        <Input id="ftp-host" 
                        value={XMLReports.ftpHost}
                        onChange={(e) => setXMLReports({...XMLReports, ftpHost: e.target.value})}
                        type="text" placeholder="Введите текст" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="ftp-port">Порт FTP сервера</Label>
                        <Input id="ftp-port" 
                        value={XMLReports.ftpPort}
                        onChange={(e) => setXMLReports({...XMLReports, ftpPort: Number.parseInt(e.target.value)})}
                        type="number" placeholder="Введите текст" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="ftp-username">Имя пользователя FTP сервера</Label>
                        <Input id="ftp-username" 
                        value={XMLReports.ftpUsername}
                        onChange={(e) => setXMLReports({...XMLReports, ftpUsername: e.target.value})}
                        type="login" placeholder="Введите текст" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="ftp-password">Пароль пользователя FTP сервера</Label>
                        <Input id="ftp-password" 
                        value={XMLReports.ftpPassword}
                        onChange={(e) => setXMLReports({...XMLReports, ftpPassword: e.target.value})}
                        type="password" placeholder="Введите пароль" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="ftp-directory">Директория хранения на FTP сервере</Label>
                        <Input id="ftp-directory" 
                        value={XMLReports.ftpDirectory}
                        onChange={(e) => setXMLReports({...XMLReports, ftpDirectory: e.target.value})}
                        type="text" placeholder="Введите текст" />
                    </div>
                    <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <Label htmlFor="daily-report">Сохранение XML-файлов суточных отчетов</Label>
                        <Switch checked={!!XMLReports.dailyReport} onCheckedChange={(e) => setXMLReports({...XMLReports, dailyReport: e})}/>
                    </div>
                    <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <Label htmlFor="five-minute-report">Сохранение XML-файлов пятиминутных отчетов</Label>
                        <Switch checked={!!XMLReports.fiveMinuteReport} onCheckedChange={(e) => setXMLReports({...XMLReports, fiveMinuteReport: e})}/>
                    </div>
                    <div className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <Label htmlFor="mode-report">Сохранение XML-файлов отчетов по режимам</Label>
                        <Switch checked={!!XMLReports.modeReport} onCheckedChange={(e) => setXMLReports({...XMLReports, modeReport: e})}/>
                    </div>
                    <Button className="mt-4" onClick={() => {
                      handleSaveXMLReports(XMLReports)
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

