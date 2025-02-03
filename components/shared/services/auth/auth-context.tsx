"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import apiClient from "./api-client";

interface AuthContextType {
  isAuthorized: boolean | null;
  accessDenied: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);
  const [accessDenied, setAccessDenied] = useState(false);

  useEffect(() => {
    verifyAuthorization();
  }, []);

  const verifyAuthorization = async () => {
    const token = localStorage.getItem("access_token");

    if (!token) {
      const refreshedToken = await refreshAccessToken();
      setIsAuthorized(!!refreshedToken);
      return;
    }

    try {
      await apiClient.get("/auth-server/auth/check");
      setIsAuthorized(true);
    } catch (error: any) {
      if (error.response?.status === 401) {
        const refreshedToken = await refreshAccessToken();
        setIsAuthorized(!!refreshedToken);
      } else if (error.response?.status === 403) {
        setAccessDenied(true);
      } else {
        setIsAuthorized(false);
      }
    }
  };

  const refreshAccessToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refresh_token");
      if (!refreshToken) return null;

      const response = await apiClient.post("/auth-server/auth/refresh-token", {
        refreshToken,
      });
      const { accessToken } = response.data;
      localStorage.setItem("access_token", accessToken);
      return accessToken;
    } catch {
      return null;
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthorized, accessDenied }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
