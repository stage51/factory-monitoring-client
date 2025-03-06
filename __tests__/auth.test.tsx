import { act, render, screen, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import Auth from '@/components/shared/services/auth/auth';
import apiClient from '@/components/shared/services/auth/api-client';
import '@testing-library/jest-dom';

// Мокируем localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString();
    },
    removeItem: (key: string) => {
      delete store[key];
    },
    clear: () => {
      store = {};
    },
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

// Мокируем apiClient
vi.mock('@/components/shared/services/auth/api-client', () => ({
  default: {
    interceptors: {
      response: {
        use: vi.fn(),
      },
    },
    post: vi.fn().mockResolvedValue({ data: { accessToken: 'new-access-token' } }),
    get: vi.fn(),
  },
}));

// Мокируем parseJwt
vi.mock('@/components/shared/services/auth/parse-jwt', () => ({
  parseJwt: vi.fn((token) => {
    if (!token) return null;
    return { exp: Math.floor(Date.now() / 1000) + 3600 }; // Токен истекает через час
  }),
}));

describe('Auth Component', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();

    // Мокируем localStorage
    localStorage.setItem('access_token', 'valid-access-token');
    localStorage.setItem('refresh_token', 'valid-refresh-token');
  });

  afterEach(() => {
    localStorage.clear();
  });

  it('отображает загрузку при инициализации', async () => {
    // Симулируем задержку при проверке авторизации
    vi.mocked(apiClient.get).mockImplementationOnce(() => new Promise(() => {}));

    await act(async () => {
      render(<Auth>Страница</Auth>);
    });

    await waitFor(() => {
      expect(screen.getByText('Загрузка...')).toBeInTheDocument();
    });
  });

  it('отображает сообщение о необходимости авторизации при отсутствии токена', async () => {
    // Симулируем ошибку 401
    vi.mocked(apiClient.get).mockRejectedValueOnce(new Object({ response: { status: 401 } }) as Error)
    vi.mocked(apiClient.post).mockRejectedValueOnce(new Error("Invalid refresh token"))
    await act(async () => {
      render(<Auth>Страница</Auth>);
    });

    await waitFor(() => {
      expect(screen.getByText('Вы не авторизованы')).toBeInTheDocument();
    });
  });

  it('отображает страницу при успешной авторизации', async () => {
    // Симулируем успешный ответ API
    vi.mocked(apiClient.get).mockResolvedValueOnce({});

    await act(async () => {
      render(<Auth>Страница</Auth>);
    });

    await waitFor(() => {
      expect(screen.getByText('Страница')).toBeInTheDocument();
    });
  });
});