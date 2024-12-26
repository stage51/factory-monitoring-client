"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { UserRequest } from "../services/profile/profile-service";

const formSchema = z.object({
  email: z.string().email({ message: "Введите корректный email" }),
  password: z.string().min(8, { message: "Пароль должен быть от 8 символов" }),
  repeatPassword: z.string(),
  firstName: z.string().min(1, { message: "Имя обязательно" }),
  lastName: z.string().min(1, { message: "Фамилия обязательна" }),
  middleName: z.string().optional(),
  policy: z.boolean().refine(val => val, { message: "" }),
})
.refine(data => data.password === data.repeatPassword, {
    path: ["repeatPassword"],
    message: "Пароли должны совпадать",
});

type UserFormProps = {
  onSubmit: (values: z.infer<typeof formSchema> | UserRequest) => void;
  initialValues?: z.infer<typeof formSchema> | null;
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
      middleName: undefined,
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
