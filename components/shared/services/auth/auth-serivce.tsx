import axios from "axios";
import { SERVER_URL } from "../server-url";
import PutAccessToken from "./put-access-token";

PutAccessToken()

export const login = async (email: string, password: string) => {
    const response = await axios.post(SERVER_URL + "/auth-server/auth/login", { email, password });
    const { accessToken, refreshToken } = response.data;
  
    sessionStorage.setItem("access_token", accessToken);
    sessionStorage.setItem("refresh_token", refreshToken);

};

export const logout = async () => {
    const refreshToken = sessionStorage.getItem("refresh_token");
    if (!refreshToken) {
        new Error("Refresh token не найден.");
    }

    const response = await axios.post(SERVER_URL + "/auth-server/auth/logout", {
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
    const response = await axios.post(SERVER_URL + "/auth-server/auth/register", userData);
    const userResponse = response.data;
  
    console.log("User registered successfully:", userResponse);
  
    const loginResponse = await axios.post(SERVER_URL + "/auth-server/auth/login", {
        email: userData.email,
        password: userData.password,
    });
  
    const { accessToken, refreshToken } = loginResponse.data;

    sessionStorage.setItem("access_token", accessToken);
    sessionStorage.setItem("refresh_token", refreshToken);
  };
  
  export const createOrganization = async (orgData: {
    shortName: string;
    name: string;
    type: string;
    region: string;
    taxpayerNumber: string;
    reasonCode: string;
    address: string;
    specialEmail: string;
    specialPhone: string;
  }) => {
    const response = await axios.post(SERVER_URL + "/auth-server/auth/organization", orgData); 
  }