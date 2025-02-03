import apiClient from "./api-client";

export const login = async (email: string, password: string) => {
    const response = await apiClient.post("/auth-server/auth/login", { email, password });
    const { accessToken, refreshToken } = response.data;
  
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);

};

export const logout = async () => {
    const refreshToken = localStorage.getItem("refresh_token");
    if (!refreshToken) {
        new Error("Refresh token не найден.");
    }

    const response = await apiClient.post("/auth-server/auth/logout", {
        refreshToken,
    });
  
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
  };

export const register = async (userData: {
    email: string;
    password: string;
    repeatPassword: string;
    firstName: string;
    lastName: string;
    middleName?: string;
    policy: boolean;
  }) => {
    const response = await apiClient.post("/auth-server/auth/register", userData);
    const userResponse = response.data;
  
    console.log("User registered successfully:", userResponse);
  
    const loginResponse = await apiClient.post("/auth-server/auth/login", {
        email: userData.email,
        password: userData.password,
    });
  
    const { accessToken, refreshToken } = loginResponse.data;

    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
  };

export const forgotPassword = async (email : string) => {
    await apiClient.get("/auth-server/auth/forgot", { params : { email : email}})
}
export const recoveryPassword = async (code : string) => {
    await apiClient.get("/auth-server/auth/recovery", { params : { code : code}})
}