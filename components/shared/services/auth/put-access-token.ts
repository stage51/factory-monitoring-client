import axios from "axios";
import keycloak from "./keycloak";

export default function PutAccessToken() {
    const getAccessToken = () => {
        return keycloak.tokenParsed;
    };
      
    axios.interceptors.request.use(
        (config) => {
          const token = getAccessToken();
      
          if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
          }
      
          return config;
        },
        (error) => {
          return Promise.reject(error);
        }
    );
}