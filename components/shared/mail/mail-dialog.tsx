"use client"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog"
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/hooks/use-toast"
import apiClient from "../services/auth/api-client";
import { observer } from "mobx-react-lite";
import { userStore } from "../stores/user-store";
import { useEffect, useState } from "react";

interface Props{
    className?: string;
    children: React.ReactNode;
}

interface HelpRequest{
    email: string;
    message: string;
}

const MailDialog = observer(({className, children} : Props) => {
  const {profile, fetchProfile} = userStore
  const [message, setMessage] = useState<string>("")
  const { toast } = useToast()

  useEffect(() => {
    if (profile === null) {
      fetchProfile()
    }
  }, []);

  const handleSubmit = async (message : HelpRequest) => {
      try {
        await apiClient.post("auth-server/help", message)
        toast({
          title: "Заявление в сервис",
          description: "Ваше сообщение успешно отправлено",
        })
      } catch (error) {
        console.log("Error sending message")
        toast({
          title: "Ошибка отправки заявления",
          variant: "destructive",
          description: "Ваше заявление не отправлено",
        })
      }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className={cn("md:max-w-[425px]", className)}>
        <DialogHeader className="gap-2">
          <DialogTitle>Заявление в сервис</DialogTitle>
          <DialogDescription>
              Нужна помощь? Есть пожелания? Отправьте свое письмо в сервис с просьбой или предложением.
          </DialogDescription>
        </DialogHeader>
        <div className="grid pb-2">
          <Textarea placeholder="Напишите сообщение" onChange={(e) => setMessage(e.target.value)} className="resize-none" />
        </div>
        <DialogFooter className="md:justify-between gap-4" >
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Закрыть
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit" onClick={() => {
              handleSubmit({email: profile?.email || "", message: message})}}>
                Отправить</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
})

export default MailDialog
