"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { UserRequest } from "../services/profile/profile-service";
import { cn } from "@/lib/utils";

const dangerousPattern = /^[^<>"'`;\\/*=+-]*$/; // запрет на опасные символы

const formSchema = z.object({
  email: z
    .string()
    .max(100, { message: "Email слишком длинный" })
    .email({ message: "Введите корректный email" })
    .regex(dangerousPattern, { message: "Email содержит недопустимые символы" }),

  password: z
    .string()
    .min(8, { message: "Пароль должен быть от 8 символов" })
    .max(100, { message: "Пароль слишком длинный" })
    .regex(dangerousPattern, { message: "Пароль содержит недопустимые символы" }),

  repeatPassword: z
    .string()
    .max(100)
    .regex(dangerousPattern, { message: "Пароль содержит недопустимые символы" }),

  firstName: z
    .string()
    .min(1, { message: "Имя обязательно" })
    .max(50, { message: "Имя слишком длинное" })
    .regex(dangerousPattern, { message: "Имя содержит недопустимые символы" }),

  lastName: z
    .string()
    .min(1, { message: "Фамилия обязательна" })
    .max(50, { message: "Фамилия слишком длинная" })
    .regex(dangerousPattern, { message: "Фамилия содержит недопустимые символы" }),

  middleName: z
    .string()
    .max(50, { message: "Отчество слишком длинное" })
    .regex(dangerousPattern, { message: "Отчество содержит недопустимые символы" })
    .optional(),

  policy: z
    .boolean()
    .refine(val => val, { message: "" }),
})
.refine(data => data.password === data.repeatPassword, {
  path: ["repeatPassword"],
  message: "Пароли должны совпадать",
});


type UserFormProps = {
  id?: string;
  className?: string;
  onSubmit: (values: z.infer<typeof formSchema> | UserRequest) => void;
  initialValues?: z.infer<typeof formSchema> | null;
  children?: React.ReactNode;
};

export const UserRegForm = ({ id, className, onSubmit, initialValues, children }: UserFormProps) => {
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
        <form id={id} onSubmit={form.handleSubmit(onSubmit)} className={cn("space-y-4 w-full", className)}>
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
