
import Title from "@/components/shared/title"
import Profile from "@/components/shared/profile/profile"
import Container from "@/components/shared/container"


export default function Page() {  
    return (
      <div>
        <Title title = "Профиль"/>
        <Container className="mb-40 p-6 pt-0 animate-slide-element">
            <Profile />
        </Container>
      </div>
    )
  }
  