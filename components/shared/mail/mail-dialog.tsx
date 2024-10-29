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

interface Props{
    className?: string;
    children: React.ReactNode;
}
export default function MailDialog({className, children} : Props) {
  const { toast } = useToast()

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
          <Textarea placeholder="Напишите сообщение" className="resize-none" />
        </div>
        <DialogFooter className="md:justify-between gap-4" >
          <DialogClose asChild>
            <Button type="button" variant="secondary">
              Закрыть
            </Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit" onClick={() => {
              toast({
                title: "Заявление в сервис",
                description: "Ваше сообщение успешно отправлено",
              })}}>
                Отправить</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
