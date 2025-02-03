"use client";
import { ReactNode, useEffect, useRef, useState } from "react";
import Title from "../../title";
import Link from "next/link";
import Container from "../../container";
import { Button } from "@/components/ui/button";
import apiClient from "./api-client";

interface Props {
  children?: ReactNode;
  mainPage?: boolean
}

export default function Auth({ children, mainPage = false }: Props) {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [accessDenied, setAccessDenied] = useState(false);
  const refreshTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setupAxiosInterceptors();
    verifyAuthorization();

    return () => {
      if (refreshTimer.current) {
        clearTimeout(refreshTimer.current);
      }
    };
  }, []);

  const setupAxiosInterceptors = () => {
    apiClient.interceptors.response.use(
      (response) => response,
      async (error) => {
        if (error.response?.status === 403) {
          setAccessDenied(true);
        }
        return Promise.reject(error);
      }
    );
  };

  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");
      if (!refreshToken) throw new Error("Refresh token not found");

      const response = await apiClient.post("/auth-server/auth/refresh-token", {
        refreshToken,
      });

      const { accessToken } = response.data;
      localStorage.setItem("access_token", accessToken);

      scheduleTokenRefresh(accessToken);

      return accessToken;
    } catch (error) {
      console.error("Failed to refresh access token:", error);
      return null;
    }
  };

  const parseJwt = (token: string) => {
    try {
      const base64Url = token.split(".")[1];
      const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
      return JSON.parse(window.atob(base64));
    } catch (error) {
      console.error("Failed to parse token:", error);
      return null;
    }
  };

  const scheduleTokenRefresh = (token: string) => {
    const parsedToken = parseJwt(token);
    if (!parsedToken || !parsedToken.exp) return;

    const currentTime = Math.floor(Date.now() / 1000);
    const timeToExpire = parsedToken.exp - currentTime;

    if (timeToExpire > 0) {
      const refreshTime = Math.max(0, (timeToExpire - 60) * 1000);
      if (refreshTimer.current) {
        clearTimeout(refreshTimer.current);
      }
      refreshTimer.current = setTimeout(() => refreshAccessToken(), refreshTime);
    }
  };

  const verifyAuthorization = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      const refreshedToken = await refreshAccessToken();
      setIsAuthorized(!!refreshedToken);
      return;
    }

    try {
      await apiClient.get("/auth-server/auth/check");
      setIsAuthorized(true);

      scheduleTokenRefresh(token);
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
    );
  }

  if (accessDenied && mainPage === false) {
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
  }

  if (!isAuthorized && mainPage === false) {
    return (
      <>
        <Title
          className="mt-6"
          title="Вы не авторизованы"
          subtitle="Выполните вход в аккаунт для доступа к этому ресурсу"
        />
        <Container className="p-6 animate-slide-element">
          <div className="flex gap-6 md:flex-row flex-col">
            <Button>
              <Link href={"/sign-in"}>Вход в аккаунт</Link>
            </Button>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Перезагрузить страницу
            </Button>
          </div>
        </Container>
      </>
    );
  }

  return <>{children}</>;
}
