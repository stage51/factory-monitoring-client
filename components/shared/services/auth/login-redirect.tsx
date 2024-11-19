"use-client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
const keycloakLoginUrl = "http://localhost:9098/realms/factory-monitoring/protocol/openid-connect/auth?client_id=factory-monitoring-api&response_type=code&redirect_uri=http://localhost:3000/callback";

// Компонент для перенаправления на страницу авторизации
const LoginRedirect = () => {
  useEffect(() => {
    // Перенаправление на страницу входа Keycloak
    window.location.href = keycloakLoginUrl;
  }, []);

  return <div>Перенаправление на страницу авторизации...</div>;
};

export default LoginRedirect;
