
import Title from "@/components/shared/title"
import { DataTable } from "@/components/shared/table/data-table"
import { columns } from "@/components/shared/table/columns"
import Container from "@/components/shared/container"
import { testData } from "@/components/shared/table/test-data"


export default function Page() {  
    return (
      <div>
        <Title title = "АСКП" subtitle="Управление пятиминутной отчетностью"/>
        <Container className="mb-40 p-6 pt-0 animate-slide-element">
            <DataTable columns={columns} data={testData} />
        </Container>
      </div>
    )
  }
  