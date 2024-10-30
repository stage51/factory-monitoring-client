import Title from "@/components/shared/title"
import CardList from "@/components/shared/admin/users/card-list"

export default function Home() {
  return (
    <div>
      <Title title="Пользователи" />
      <CardList />
    </div>
  )
}
