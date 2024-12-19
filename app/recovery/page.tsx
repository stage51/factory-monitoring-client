import Title from "@/components/shared/title"
import Container from "@/components/shared/container"
import RecoveryPassword from "@/components/shared/recovery/recovery-password"


export default function Page() {  
    return (
      <div>
        <Container className="h-[85vh] w-screen p-6 pt-0 flex flex-col justify-center items-center animate-slide-element">
            <Title title = "Введите код"/>
            <RecoveryPassword />
        </Container>
      </div>
    )
}
  