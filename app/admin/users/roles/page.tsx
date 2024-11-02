import UserRoleTable from "@/components/shared/admin/users/roles/user-role-table"
import Title from "@/components/shared/title"
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
                <BreadcrumbLink href="/admin">Панель управления</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/admin/users">Пользователи</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Список ролей</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Container>
      <Title title="Список ролей" />
      <Container className="mb-40 p-6 pt-0 animate-slide-element">
          <UserRoleTable />
      </Container>
    </div>
  )
}
