
import Title from "@/components/shared/title"
import Profile from "@/components/shared/profile/profile"
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
                <BreadcrumbPage>Профиль</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </Container>
        <Title title = "Профиль"/>
        <Container className="mb-40 p-6 pt-0 animate-slide-element">
            <Profile />
        </Container>
      </div>
    )
  }
  