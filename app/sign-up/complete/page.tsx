import Title from "@/components/shared/title"
import Container from "@/components/shared/container"
import SignUpComplete from "@/components/shared/sign-up/complete/sign-up-complete"


export default function Page() {  
    return (
      <div>
        <Container className="my-10 w-screen p-6 pt-0 flex flex-col justify-center items-center animate-slide-element">
            <Title title = "Регистрация завершена"/>
            <SignUpComplete />
        </Container>
      </div>
    )
  }
  