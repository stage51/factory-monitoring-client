"use client";

import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import apiClient from "../services/auth/api-client";
import { useEffect, useState } from "react";
import { getClientConfig } from "../services/config/config";
import { SettingRequest } from "../services/profile/profile-service";
import { cn } from "@/lib/utils";

const formSchema = z.object({
  timezone: z.string(),
  subscribe: z.boolean(),
  reportNotifications: z.array(z.string()).default([]),
  avatarUrl: z.string().optional()
});

const reportNotifications = [
  {
    id: "DAILY",
    label: "Дневные отчеты",
  },
  {
    id: "FIVE_MINUTE",
    label: "Пятиминутные отчеты",
  },
  {
    id: "MODE",
    label: "Отчеты по режимам",
  }
] as const;

type SettingFormProps = {
  id?: string;
  className?: string;
  onSubmit: (values: z.infer<typeof formSchema> | SettingRequest) => Promise<void>;
  initialValues?: z.infer<typeof formSchema>;
  children?: React.ReactNode;
};

export const SettingForm = ({ id, className, onSubmit, initialValues, children }: SettingFormProps) => {
  const [canUpload, setCanUpload] = useState<boolean>(false);
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues || {
      timezone: "UTC+03:00",
      subscribe: false,
      reportNotifications: [],
      avatarUrl: ""
    },
  });

  useEffect(() => {
    getPermissions();
  }, []);

  const getPermissions = async () => {
    setCanUpload(await getClientConfig("config/next-app/user.avatar-upload"));
  };

  return (
    <Form {...form}>
      <form id={id} onSubmit={form.handleSubmit(onSubmit)} className={cn("space-y-4 w-full", className)}>
        <FormField
          control={form.control}
          name="timezone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Часовой пояс</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите тип" />
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
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="subscribe"
          render={({ field }) => (
            <FormItem className="space-y-0 flex flex-row items-center justify-between rounded-lg border p-6">
              <FormLabel>Подписаться на рассылку</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reportNotifications"
          render={() => {
            const subscribeValue = form.watch("subscribe");
            
            return (
              <FormItem className={cn(
                "border rounded-lg px-6 py-4",
                !subscribeValue && "bg-muted/50"
              )}>
                <div className="mb-4">
                  <FormLabel className="text-base">Уведомления об отчетах</FormLabel>
                  <FormDescription>
                    {subscribeValue 
                      ? "Уведомления будут приходить на указанный email организации."
                      : "Для получения уведомлений необходимо подписаться на рассылку."}
                  </FormDescription>
                </div>
                {reportNotifications.map((item) => (
                  <FormField
                    key={item.id}
                    control={form.control}
                    name="reportNotifications"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={item.id}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              className="rounded-[4px] mt-[2px]"
                              checked={field.value?.includes(item.id)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([...field.value, item.id])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== item.id
                                      )
                                    );
                              }}
                              disabled={!subscribeValue}
                            />
                          </FormControl>
                          <FormLabel className={cn(
                            "text-sm font-normal",
                            !subscribeValue && "text-muted-foreground"
                          )}>
                            {item.label}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
                <FormMessage />
              </FormItem>
            );
          }}
        />
        {canUpload && (
          <FormField
            control={form.control}
            name="avatarUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Аватар</FormLabel>
                <FormControl>
                  <div className="space-y-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={async (event) => {
                        const file = event.target.files?.[0];
                        if (file) {
                          const formData = new FormData();
                          formData.append("file", file);

                          try {
                            const response = await apiClient.post(
                              "/auth-server/users/profile/avatar",
                              formData,
                              {
                                headers: {
                                  "Content-Type": "multipart/form-data",
                                },
                              }
                            );
                            field.onChange(response.data.avatarUrl);
                          } catch (error) {
                            console.error("Ошибка загрузки аватара:", error);
                          }
                        }
                      }}
                    />
                    {field.value && (
                      <div className="flex flex-col justify-center items-center py-4">
                        <img
                          src={field.value}
                          alt="Avatar Preview"
                          className="h-32 w-32 rounded-full object-cover"
                        />
                      </div>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {children}
      </form>
    </Form>
  );
};
