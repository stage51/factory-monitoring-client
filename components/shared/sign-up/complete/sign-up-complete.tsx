"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function SignUpComplete() {
    return (
        <Card className="shadow-none md:w-1/2 w-full mt-6">
            <CardHeader className="flex items-center">
                <CardTitle className="text-md font-normal">Регистрация завершена. Через некоторое время вы получите сообщение на почту о подтверждении аккаунта. Ожидайте подтверждение от администрации.</CardTitle>
            </CardHeader>  
            <CardContent>
                <Link href="/sign-in" className="w-1/2"><Button className="w-full" variant="default">Вход в аккаунт</Button></Link>
            </CardContent>
        </Card>
  )
}