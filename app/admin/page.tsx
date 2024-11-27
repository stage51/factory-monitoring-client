import Title from "@/components/shared/title"
import CardList from "@/components/shared/admin/card-list"
import Container from "@/components/shared/container"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"



export default function Page() {
  return (
    <div>
      <Container className="p-6 pb-0 animate-slide-element">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Главная</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Панель управления</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Container>
      <Title title="Здравствуйте, Иван Иванов" subtitle="Добро пожаловать в Панель управления ЕГАИС Мониторинг. Выберите действие." />
      <CardList />
    </div>
  )
}
