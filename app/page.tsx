import { Title } from "@/components/shared/title"
import { Header } from "@/components/shared/header"
import { CardList } from "@/components/shared/card-list"
import Footer from "@/components/shared/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-white rounded-3xl">
      <Header />
      <Title />
      <CardList />
      <Footer />
    </main>
  )
}
