"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const dangerousPattern = /^[^<>"'`;\\/*=+]*$/; // запрет на опасные символы

const formSchema = z.object({
  email: z.string()
    .max(100, { message: "Email слишком длинный" })
    .email({ message: "Введите корректный email" })
    .regex(dangerousPattern, { message: "Email содержит недопустимые символы" }),
  password: z.string()
    .min(8, { message: "Пароль должен быть от 8 символов" })
    .max(20, { message: "Пароль должен быть до 20 символов" })
    .regex(dangerousPattern, { message: "Пароль содержит недопустимые символы" }),
});

type UserFormProps = {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  initialValues?: z.infer<typeof formSchema>;
  children?: React.ReactNode;
};

export const UserLoginForm = ({ onSubmit, initialValues, children }: UserFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues || {
      email: "",
      password: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Электронная почта</FormLabel>
              <FormControl>
                <Input placeholder="Введите почту" type="email" {...field} />
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
        {children}
      </form>
    </Form>
  );
};
