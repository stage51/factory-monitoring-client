"use client";
import { ReactNode, useEffect, useState } from "react";
import Title from "../../title";
import Container from "../../container";
import { Button } from "@/components/ui/button";
import { jwtDecode } from "jwt-decode";
import Auth from "./auth";

interface Props {
  children?: ReactNode;
}

export default function AdminAuth({ children }: Props) {
    const [accessToken, setAccessToken] = useState<string | null>();
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        setAccessToken(sessionStorage.getItem("access_token"))
        if (accessToken) {
            try {
                const decoded: any = jwtDecode(accessToken);
                if (decoded?.role === 'ROLE_ADMIN') {
                    setIsAdmin(true);
                }
            } catch (error) {
                console.error("Invalid token:", error);
            }
        }
    }, [accessToken]);

    if (!isAdmin) {
    return (
      <>
        <Title
          className="mt-6"
          title="У вас недостаточно прав доступа"
          subtitle="Получите права у администратора для доступа к этому ресурсу"
        />
        <Container className="p-6 animate-slide-element">
          <Button variant="outline" onClick={() => window.location.reload()}>
            Перезагрузить страницу
          </Button>
        </Container>
      </>
    );
  } else {
    return (
      <Auth>
        {children}
      </Auth>
    );
  }
}
