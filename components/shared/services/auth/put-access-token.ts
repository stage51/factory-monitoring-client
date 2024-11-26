import axios from "axios";

export default function PutAccessToken() {
    const getAccessToken = () => {
        return sessionStorage.getItem("access_token");
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