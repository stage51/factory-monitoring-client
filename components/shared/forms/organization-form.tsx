"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { cn } from "@/lib/utils";

const dangerousPattern = /^[^<>"'`;\\/*=+-]*$/; // запрет на опасные символы

const formSchema = z.object({
  shortName: z
    .string()
    .min(1, { message: "Краткое наименование обязательно" })
    .max(100, { message: "Краткое наименование слишком длинное" })
    .regex(dangerousPattern, { message: "Краткое наименование содержит недопустимые символы" }),

  name: z
    .string()
    .min(1, { message: "Полное наименование обязательно" })
    .max(200, { message: "Полное наименование слишком длинное" })
    .regex(dangerousPattern, { message: "Полное наименование содержит недопустимые символы" }),

  type: z
    .string()
    .min(1, { message: "Выберите тип предприятия" })
    .max(50, { message: "Тип предприятия слишком длинный" })
    .regex(/^[^<>"'`;\\/*=+]*$/, { message: "Тип предприятия содержит недопустимые символы" }),

  region: z
    .string()
    .min(1, { message: "Регион обязателен" })
    .max(100, { message: "Регион слишком длинный" })
    .regex(dangerousPattern, { message: "Регион содержит недопустимые символы" }),

  taxpayerNumber: z
    .string()
    .regex(/^\d{12}$/, { message: "ИНН должен содержать ровно 12 цифр" }),

  reasonCode: z
    .string()
    .regex(/^\d{9}$/, { message: "КПП должен содержать ровно 9 цифр" }),

  address: z
    .string()
    .min(1, { message: "Адрес обязателен" })
    .max(250, { message: "Адрес слишком длинный" })
    .regex(dangerousPattern, { message: "Адрес содержит недопустимые символы" }),

  specialEmail: z
    .string()
    .email({ message: "Введите корректный email" })
    .max(100, { message: "Email слишком длинный" })
    .regex(dangerousPattern, { message: "Email содержит недопустимые символы" }),

  specialPhone: z
    .string()
    .min(7, { message: "Введите корректный телефон" })
    .max(20, { message: "Телефон слишком длинный" })
    .regex(/^[0-9()+\-\s]+$/, { message: "Телефон содержит недопустимые символы" }),
});


type OrganizationFormProps = {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  initialValues?: z.infer<typeof formSchema>;
  children?: React.ReactNode;
  data?: any;
  id?: string;
  className?: string;
};

export const OrganizationForm = ({ id, className, onSubmit, initialValues, children }: OrganizationFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues || {
      shortName: "",
      name: "",
      type: "",
      region: "",
      taxpayerNumber: "",
      reasonCode: "",
      address: "",
      specialEmail: "",
      specialPhone: "",
    },
  });

  return (
    <Form {...form}>
      <form id={id} onSubmit={form.handleSubmit(onSubmit)} className={cn("space-y-4 w-full", className)}>
        <FormField
          control={form.control}
          name="shortName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Краткое наименование</FormLabel>
              <FormControl>
                <Input placeholder="Введите краткое наименование" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Полное наименование</FormLabel>
              <FormControl>
                <Input placeholder="Введите полное наименование" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Тип предприятия</FormLabel>
              <FormControl>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите тип" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Производство алкогольного сырья">Производство алкогольного сырья</SelectItem>
                    <SelectItem value="Ликеро-водочный завод">Ликеро-водочный завод</SelectItem>
                    <SelectItem value="Фармацевтическое производство">Фармацевтическое производство</SelectItem>
                    <SelectItem value="Пивоваренная компания">Пивоваренная компания</SelectItem>
                    <SelectItem value="Перевозчик алкогольного сырья">Перевозчик алкогольного сырья</SelectItem>
                    <SelectItem value="Перевозчик газового сырья">Перевозчик газового сырья</SelectItem>
                    <SelectItem value="Другое">Другое</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="region"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Регион</FormLabel>
              <FormControl>
                <Input placeholder="Введите регион" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="taxpayerNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>12-значный ИНН</FormLabel>
              <FormControl>
                <Input placeholder="Введите 12-значный ИНН" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="reasonCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>9-значный КПП</FormLabel>
              <FormControl>
                <Input placeholder="Введите 9-значный КПП" type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Адрес</FormLabel>
              <FormControl>
                <Input placeholder="Введите адрес" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="specialEmail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Экстренная почта</FormLabel>
              <FormControl>
                <Input placeholder="Введите экстренную почту" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="specialPhone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Экстренный телефон</FormLabel>
              <FormControl>
                <Input placeholder="Введите экстренный телефон" type="phone" {...field} />
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
