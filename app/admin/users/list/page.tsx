import AdminTable from "@/components/shared/admin/table/admin-table"
import Title from "@/components/shared/title"
import Container from "@/components/shared/container"

export default function Home() {
  return (
    <div>
      <Title title="Список пользователей" />
      <Container className="mb-40 p-6 pt-0 animate-slide-element">
          <AdminTable />
      </Container>
    </div>
  )
}
