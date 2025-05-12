"use client";

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const dangerousPattern = /^[^<>"'`;\\/*=+-]*$/; // запрет на опасные символы

const formSchema = z.object({
  code: z.string()
  .length(16, { message: "Код должен содержать ровно 16 символов" })
  .regex(dangerousPattern, { message: "Код содержит недопустимые символы" }),
});

type UserFormProps = {
  onSubmit: (values: z.infer<typeof formSchema>) => void;
  initialValues?: z.infer<typeof formSchema>;
  children?: React.ReactNode;
};

export const RecoveryPasswordForm = ({ onSubmit, initialValues, children }: UserFormProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues || {
      code: "",
    },
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Код восстановления</FormLabel>
              <FormControl>
                <Input placeholder="Введите код из электронного письма" type="text" {...field} />
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
