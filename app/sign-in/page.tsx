import Title from "@/components/shared/title"
import Profile from "@/components/shared/profile/profile"
import Container from "@/components/shared/container"
import SignInKeycloak from "@/components/shared/sign-in/sign-in-keycloak"


export default function Page() {  
    return (
      <div>
        <Container className="h-[85vh] w-screen p-6 pt-0 flex flex-col justify-center items-center animate-slide-element">
            <Title title = "Вход в аккаунт"/>
            <SignInKeycloak />
        </Container>
      </div>
    )
  }
  