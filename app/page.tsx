import Title from "@/components/shared/title"
import CardList from "@/components/shared/main/card-list"

export default function Home() {
  return (
    <div>
      <Title title="Здравствуйте, Иван Иванов" subtitle="Добро пожаловать в ЕГАИС Мониторинг. Вы авторизованы как клиент. Выберите действие." />
      <CardList />
    </div>
  )
}
