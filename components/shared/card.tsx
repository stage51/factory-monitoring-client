import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"

interface Props {
  className?: string
  icon: React.ReactNode
  title: string
  subtitle?: string
  onClick: () => void
}

export default function Card({ className, icon, title, subtitle, onClick }: Props = {
  icon: <ArrowRight className="h-6 w-6" />,
  title: "Card Title",
  onClick: () => console.log("Card clicked")
}) {
  return (
    <div
      className={cn("group cursor-pointer rounded-lg bg-white p-6 shadow-md transition-all hover:shadow-lg hover:bg-slate-200", className)}
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-lg border-gray-200 p-4">
        <div className="mb-4 flex items-center justify-center rounded-full text-primary-foreground">
          {icon}
        </div>
        <h3 className="mb-2 text-xl text-center font-normal text-gray-900">{title}</h3>
        {subtitle &&
        <p className="text-sm text-center font-light text-gray-500">{subtitle}</p>
         }
      </div>
    </div>
  )
}