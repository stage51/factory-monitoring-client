import axios from "axios";

export const SERVER_URL = 'http://localhost:8080/api/v1';

const getAccessToken = () => {
  return sessionStorage.getItem("access_token");
};

const apiClient = axios.create({
  baseURL: SERVER_URL,
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
