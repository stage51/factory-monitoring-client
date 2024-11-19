"use client";
import { ReactNode, useEffect, useState } from "react";
import keycloak from "./keycloak";

interface Props {
  children?: ReactNode;
}

export default function Auth({ children }: Props) {
  const [keycloakInitialized, setKeycloakInitialized] = useState(false);

  useEffect(() => {
    keycloak
      .init({
        onLoad: "check-sso", // Проверка на авторизацию без принудительного входа
        silentCheckSsoRedirectUri: `${window.location.origin}/silent-check-sso.html`,
      })
      .then((authenticated) => {
        setKeycloakInitialized(true);

        if (!authenticated) {
          // Если пользователь не авторизован, перенаправляем на страницу входа
          keycloak.login();
        }
      })
      .catch((error) => console.error("Keycloak init failed:", error));
  }, []);

  if (!keycloakInitialized) {
    return <div>Загрузка...</div>;
  }

  // Если пользователь не авторизован, логика login() уже обработала редирект
  return <>{children}</>;
}
