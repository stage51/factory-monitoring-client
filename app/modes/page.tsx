
import Title from "@/components/shared/title"
import ModesTable from "@/components/shared/modes/modes-table"
import Container from "@/components/shared/container"


export default function Page() {  
  
    return (
      <div>
        <Title title = "Режимы" subtitle="Управление отчетностью при каждой смене режима"/>
        <Container className="mb-40 p-6 pt-0 animate-slide-element">
            <ModesTable />
        </Container>
      </div>
    )
}
  