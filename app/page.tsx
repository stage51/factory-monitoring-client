import CardList from "@/components/shared/main/card-list"
import StatusPanel from "@/components/shared/status-panel/status-panel"
import Auth from "@/components/shared/services/auth/auth"

export default function Home() {
  return (
    <Auth mainPage={true}>
      <StatusPanel />
      <CardList className="mb-12" />
    </Auth>
  )
}
