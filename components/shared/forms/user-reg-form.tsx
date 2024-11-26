"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Switch } from "@/components/ui/switch";

const formSchema = z.object({
  email: z.string().email({ message: "Введите корректный email" }),
  password: z.string().min(8, { message: "Пароль должен быть от 8 символов" }),
  repeatPassword: z.string(),
  firstName: z.string().min(1, { message: "Имя обязательно" }),
  lastName: z.string().min(1, { message: "Фамилия обязательна" }),
  middleName: z.string().optional(),
  timezone: z.string(),
  subscribe: z.boolean(),
  policy: z.boolean().refine(val => val, { message: "" }),
});

type UserFormProps = {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  initialValues?: z.infer<typeof formSchema>;
  children?: React.ReactNode;
};

export const UserRegForm = ({ onSubmit, initialValues, children }: UserFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues || {
      email: "",
      password: "",
      repeatPassword: "",
      firstName: "",
      lastName: "",
      middleName: "",
      timezone: "UTC+03:00",
      subscribe: false,
      policy: false,
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 w-full">
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Электронная почта</FormLabel>
                            <FormControl>
                                <Input placeholder="Введите имя" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Пароль</FormLabel>
                            <FormControl>
                                <Input placeholder="Введите пароль" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="repeatPassword"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Повторите пароль</FormLabel>
                            <FormControl>
                                <Input placeholder="Введите пароль повторно" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="firstName"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Имя</FormLabel>
                            <FormControl>
                                <Input placeholder="Введите имя" type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="lastName"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Фамилия</FormLabel>
                            <FormControl>
                                <Input placeholder="Введите фамилию" type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="middleName"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Отчество (при наличии)</FormLabel>
                            <FormControl>
                                <Input placeholder="Введите отчество" type="text" {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                        />
                        <FormField
                        control={form.control}
                        name="timezone"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Часовой пояс</FormLabel>
                            <FormControl>
                                <Select value={field.value} onValueChange={field.onChange}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Выберите тип"/>
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
                            <FormItem className="space-y-0 flex flex-row items-center justify-between rounded-lg border p-4">
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
                        name="policy"
                        render={({ field }) => (
                            <FormItem className="space-y-0 flex flex-row items-center justify-between rounded-lg border p-4">
                            <FormLabel>Принять соглашение на обработку персональных данных</FormLabel>
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
            {children}
      </form>
    </Form>
  );
};
