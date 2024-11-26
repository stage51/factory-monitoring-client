"use client";
import { ReactNode, useEffect, useState } from "react";
import axios from "axios";
import Title from "../../title";
import Link from "next/link";
import Container from "../../container";
import { Button } from "@/components/ui/button";

interface Props {
  children?: ReactNode;
}

export default function Auth({ children }: Props) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    verifyAuthorization();
  }, []);
  
  const refreshAccessToken = async () => {
    try {
      const refreshToken = sessionStorage.getItem("refresh_token");
      if (!refreshToken) throw new Error("Refresh token not found");

      const response = await axios.post("/api/v1/auth-server/auth/refresh-token", {
        refreshToken,
      });

      const { accessToken } = response.data;
      sessionStorage.setItem("access_token", accessToken);

      return accessToken;
    } catch (error) {
      console.error("Failed to refresh access token:", error);
      return null;
    }
  };

  const verifyAuthorization = async () => {
    const token = sessionStorage.getItem("access_token");

    if (!token) {
      const refreshedToken = await refreshAccessToken();
      setIsAuthorized(!!refreshedToken);
      return;
    }

    try {
      const response = await axios.get("/api/v1/auth-server/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setIsAuthorized(true);
    } catch (error: any) {
      if (error.response?.status === 401) {
        const refreshedToken = await refreshAccessToken();
        setIsAuthorized(!!refreshedToken);
      } else {
        console.error("Authorization verification failed:", error);
        setIsAuthorized(false);
      }
    }
  };

  if (isAuthorized === null) {
    return (
        <Title className="mt-6" title="Загрузка..." subtitle="Страница загружается" />
      )
  }

  if (!isAuthorized) { 
    return (
    <>
      <Title className="mt-6" title="У вас недостаточно прав или вы не авторизованы" subtitle="Выполните вход в аккаунт или получите права у администратора для доступа к этому ресурсу" />
      <Container className="p-6 animate-slide-element">
        <div className="flex gap-6 md:flex-row flex-col">
          <Button><Link href={"/sign-in"}>Вход в аккаунт</Link></Button>
          <Button variant="outline" onClick={() => {window.location.reload()}}>Перезагрузить страницу</ Button>
        </div>
      </Container>
    </>
    )
  }

  return <>{children}</>;
}
