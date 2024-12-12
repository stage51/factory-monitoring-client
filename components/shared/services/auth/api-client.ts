import axios from "axios";

export const SERVER_URL = process.env.NEXT_PUBLIC_API_HOST;

const getAccessToken = () => {
  return sessionStorage.getItem("access_token");
};

const apiClient = axios.create({
  baseURL: SERVER_URL,
  headers: {
    "Content-Type" : "application/json"
  }
});


apiClient.interceptors.request.use(
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

export default apiClient;
