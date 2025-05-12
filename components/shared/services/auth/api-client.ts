import axios from "axios";

export const SERVER_URL = process.env.NEXT_PUBLIC_API_HOST;
const isBrowser = typeof window !== "undefined";

const getAccessToken = () => {
  if (isBrowser) {
    return localStorage.getItem("access_token");
  } else return null
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
