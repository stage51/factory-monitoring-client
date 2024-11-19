import { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import keycloakConfig from "./keycloak-config";

const Callback = () => {
  const router = useRouter();

  useEffect(() => {
    const getToken = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const authorizationCode = urlParams.get("code");

      if (authorizationCode) {
        try {
          const response = await axios.post(
            "http://localhost:9098/realms/factory-monitoring/protocol/openid-connect/token",
            new URLSearchParams({
              client_id: keycloakConfig.clientId,
              client_secret: keycloakConfig.clientSecret, // Для конфиденциальных клиентов
              grant_type: "authorization_code",
              code: authorizationCode,
              redirect_uri: "http://localhost:3000/callback",
            }),
            {
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
            }
          );

          // Сохраняем access_token и refresh_token
          sessionStorage.setItem("access_token", response.data.access_token);
          sessionStorage.setItem("refresh_token", response.data.refresh_token);

          router.push("/"); // Перенаправление после успешного входа
        } catch (error) {
          console.error("Error fetching token:", error);
          router.push("/sign-in");
        }
      } else {
        router.push("/sign-in");
      }
    };

    getToken();
  }, [router]);

  return <div>Авторизация...</div>;
};

export default Callback;
