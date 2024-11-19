'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import keycloakConfig from './keycloak-config';

interface AuthContextProps {
  children: React.ReactNode;
}

const AuthProvider: React.FC<AuthContextProps> = ({ children }) => {
  const [loading, setLoading] = useState(true); // Состояние загрузки, пока выполняется проверка токена
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  const isTokenExpired = (expirationTime: number): boolean => {
    const currentTime = Math.floor(Date.now() / 1000); // текущее время в секундах
    return currentTime >= expirationTime;
  };

  // Функция для обновления токена
  const refreshAccessToken = async (refreshToken: string) => {
    try {
      const response = await fetch(`${keycloakConfig.baseUrl}/realms/${keycloakConfig.realm}/protocol/openid-connect/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          client_id: keycloakConfig.clientId,
          client_secret: keycloakConfig.clientSecret,
          grant_type: 'refresh_token',
          refresh_token: refreshToken,
        }),
      });

      const data = await response.json();
      if (data.access_token) {
        sessionStorage.setItem('access_token', data.access_token);
        sessionStorage.setItem('refresh_token', data.refresh_token);
        return data.access_token;
      } else {
        throw new Error('Unable to refresh token');
      }
    } catch (error) {
      console.error('Error refreshing token:', error);
      return null;
    }
  };

  // Функция проверки статуса аутентификации
  const checkAuthStatus = async () => {
    const accessToken = sessionStorage.getItem('access_token');
    const refreshToken = sessionStorage.getItem('refresh_token');

    if (!accessToken) {
      setIsAuthenticated(false);
      setLoading(false);
      router.push('/sign-in');
      return;
    }

    const tokenParts = accessToken.split('.');
    const payload = JSON.parse(atob(tokenParts[1])); // Декодируем payload токена

    if (isTokenExpired(payload.exp)) {
      console.log('Token expired, refreshing...');
      if (!refreshToken) {
        setIsAuthenticated(false);
        router.push('/sign-in');
        return;
      }
      
      const newAccessToken = await refreshAccessToken(refreshToken);
      if (newAccessToken) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        router.push('/sign-in');
      }
    } else {
      setIsAuthenticated(true);
    }

    setLoading(false);
  };

  useEffect(() => {
    checkAuthStatus();
  }, []); // Этот эффект будет вызван один раз при монтировании компонента

  if (loading) {
    return <div>Loading...</div>; // Здесь можно отобразить индикатор загрузки
  }

  if (!isAuthenticated) {
    return null; // Не рендерить children, если пользователь не авторизован
  }

  return <>{children}</>;
};

export default AuthProvider;
