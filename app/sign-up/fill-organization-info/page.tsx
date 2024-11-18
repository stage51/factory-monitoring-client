import Title from "@/components/shared/title"
import Container from "@/components/shared/container"
import FillOrganizationInfo from "@/components/shared/sign-up/fill-organization-info/fill-organization-info"


export default function Page() {  
    return (
      <div>
        <Title title = "Организация" subtitle="Заполните форму информации об организации для продолжения регистрации"/>
        <Container className="my-10 w-screen p-6 pt-0 flex flex-col justify-center items-center animate-slide-element">
            <FillOrganizationInfo />
        </Container>
      </div>
    )
  }
  