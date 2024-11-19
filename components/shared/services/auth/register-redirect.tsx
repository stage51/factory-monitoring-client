import { useRouter } from "next/navigation";
import { useEffect } from "react";

// URL страницы регистрации Keycloak
const keycloakRegisterUrl = "http://localhost:9098/realms/factory-monitoring/protocol/openid-connect/registrations?client_id=factory-monitoring-api";

const RegisterRedirect = () => {
  const router = useRouter();

  useEffect(() => {
    // Перенаправление на страницу регистрации Keycloak
    window.location.href = keycloakRegisterUrl;
  }, []);

  return <div>Перенаправление на страницу регистрации...</div>;
};

export default RegisterRedirect;
