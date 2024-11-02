
import Title from "@/components/shared/title"
import AskpTable from "@/components/shared/askp/askp-table"
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
                <BreadcrumbPage>АСКП</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Container>
        <Title title = "АСКП" subtitle="Управление пятиминутной отчетностью"/>
        <Container className="mb-40 p-6 pt-0 animate-slide-element">
            <AskpTable />
        </Container>
      </div>
    )
}
  