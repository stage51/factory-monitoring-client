import Title from "@/components/shared/title"
import CardList from "@/components/shared/admin/card-list"

export default function Home() {
  return (
    <div>
      <Title title="Здравствуйте, Иван Иванов" subtitle="Добро пожаловать в Панель управления ЕГАИС Мониторинг. Выберите действие." />
      <CardList />
    </div>
  )
}
