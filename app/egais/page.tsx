
import Title from "@/components/shared/title"
import EgaisTable from "@/components/shared/egais/egais-table"
import Container from "@/components/shared/container"


export default function Page() {  
  
    return (
      <div>
        <Title title = "ЕГАИС" subtitle="Управление суточной отчетностью"/>
        <Container className="mb-40 p-6 pt-0 animate-slide-element">
            <EgaisTable />
        </Container>
      </div>
    )
}
  