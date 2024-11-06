import Title from "@/components/shared/title"
import Profile from "@/components/shared/profile/profile"
import Container from "@/components/shared/container"
import SignUp from "@/components/shared/sign-up/sign-up"


export default function Page() {  
    return (
      <div>
        <Container className="my-10 w-screen p-6 pt-0 flex flex-col justify-center items-center animate-slide-element">
            <Title title = "Регистрация"/>
            <SignUp />
        </Container>
      </div>
    )
  }
  