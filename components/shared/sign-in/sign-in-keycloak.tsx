"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form"
import RegisterRedirect from "../services/auth/register-redirect"
import LoginRedirect from "../services/auth/login-redirect"
import keycloak from "../services/auth/keycloak"

export default function SignInKeycloak() {
    return (
        <Card className="shadow-none md:w-1/2 w-full">
            <CardHeader className="flex items-center">
            <CardTitle className="text-md font-normal">Войдите в систему ЕГАИС Мониторинг или зарегиструйтесь</CardTitle>
            </CardHeader>  
            <CardContent>

                        <div className="flex justify-center pt-8 gap-8">
                            <Button className="w-1/2" onClick={() => keycloak.login()} type="submit">Войти</Button>
                            {/*<Link href="/sign-up" className="w-1/2"><Button className="w-full" variant="outline">Регистрация</Button></Link>*/}
                            <Button className="w-full" onClick={() => keycloak.register()}  variant="outline">Регистрация</Button>
                        </div>
            </CardContent>
        </Card>
  )
}
