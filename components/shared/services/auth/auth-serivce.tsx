import apiClient from "./api-client";

export const login = async (email: string, password: string) => {
    const response = await apiClient.post("/auth-server/auth/login", { email, password });
    const { accessToken, refreshToken } = response.data;
  
    sessionStorage.setItem("access_token", accessToken);
    sessionStorage.setItem("refresh_token", refreshToken);

};

export const logout = async () => {
    const refreshToken = sessionStorage.getItem("refresh_token");
    if (!refreshToken) {
        new Error("Refresh token не найден.");
    }

    const response = await apiClient.post("/auth-server/auth/logout", {
        refreshToken,
    });
  
    sessionStorage.removeItem("access_token");
    sessionStorage.removeItem("refresh_token");
  };

export const register = async (userData: {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    timezone?: string;
    subscribe: boolean;
  }) => {
    const response = await apiClient.post("/auth-server/auth/register", userData);
    const userResponse = response.data;
  
    console.log("User registered successfully:", userResponse);
  
    const loginResponse = await apiClient.post("/auth-server/auth/login", {
        email: userData.email,
        password: userData.password,
    });
  
    const { accessToken, refreshToken } = loginResponse.data;

    sessionStorage.setItem("access_token", accessToken);
    sessionStorage.setItem("refresh_token", refreshToken);
  };