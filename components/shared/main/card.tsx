import { ArrowRight } from "lucide-react"

interface Props {
  icon: React.ReactNode
  title: string
  subtitle: string
  onClick: () => void
}

export default function Card({ icon, title, subtitle, onClick }: Props = {
  icon: <ArrowRight className="h-6 w-6" />,
  title: "Card Title",
  subtitle: "Card Subtitle",
  onClick: () => console.log("Card clicked")
}) {
  return (
    <div
      className="group cursor-pointer rounded-lg bg-white p-6 shadow-md transition-all hover:shadow-lg hover:bg-slate-200"
      onClick={onClick}
    >
      <div className="relative overflow-hidden rounded-lg border-gray-200 p-4">
        <div className="mb-4 flex items-center justify-center rounded-full text-primary-foreground">
          {icon}
        </div>
        <h3 className="mb-2 text-xl text-center font-normal text-gray-900">{title}</h3>
        <p className="text-sm text-center font-light text-gray-500">{subtitle}</p>
      </div>
    </div>
  )
}