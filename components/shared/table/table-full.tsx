import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

interface Props{
    className?: string;
    children: React.ReactNode;
}
export function TableFull({className, children} : Props) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className={cn("md:max-w-80 w-auto", className)} variant="outline">
          Показать таблицу полностью
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-none max-h-[95vh] p-6 overflow-auto">
        <DialogHeader className="hidden">
          <DialogTitle />
          <DialogDescription />
        </DialogHeader>
          {children}
          <DialogClose asChild>
            <Button className="max-w-screen" type="button" variant="secondary">
              Закрыть
            </Button>
          </DialogClose>
      </DialogContent>
    </Dialog>
  )
}
