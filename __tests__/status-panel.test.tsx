import { act, render, screen, waitFor } from '@testing-library/react';
import { vi } from "vitest";
import StatusPanel from "@/components/shared/status-panel/status-panel";
import { userStore } from "@/components/shared/stores/user-store";
import { checkLines as checkLinesForDaily } from "@/components/shared/services/daily-report/daily-report-service";
import { checkLines as checkLinesForFiveminute } from "@/components/shared/services/five-minute-report/five-minute-report-service";
import "@testing-library/jest-dom";

vi.mock("@/components/shared/services/daily-report/position-service", () => ({
    checkLines: vi.fn(() => Promise.resolve([])),
}));

vi.mock("@/components/shared/services/five-minute-report/position-service", () => ({
    checkLines: vi.fn(() => Promise.resolve([])),
}));

vi.mock("@/components/shared/stores/user-store", () => ({
    userStore: {
      profile: {
        email: "ivan@example.com",
        firstName: "Иван",
        lastName: "Иванов",
        middleName: "Петрович",
        active: true,
        role: "user",
        organization: {
            taxpayerNumber: "123456789012"
        },
        setting: {
            timezone: "UTC+03:00",
            subscribe: false,
            reportNotifications: [],
            avatarUrl: "url"
        }, 
      },
      fetchProfile: vi.fn(),
    },
}));

describe("StatusPanel", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("отображает сообщение, если у пользователя нет ИНН организации", async () => {

    userStore.profile.organization.taxpayerNumber = null; 

    await act(async () => {
      render(<StatusPanel />);
    });

    await waitFor(() => {
      expect(screen.getByText("ИНН организации в профиле не указан")).toBeInTheDocument();
    }
    )
  });

  it("отображает загрузку и данные после получения статусов", async () => {
    userStore.profile.organization.taxpayerNumber = "123456789012"; 

    vi.mocked(checkLinesForDaily).mockResolvedValueOnce(
      [{ controllerNumber: "1", lineNumber: "101", lastReportTime: new Date(), reportStatus: "OK" }],
    );
    vi.mocked(checkLinesForFiveminute).mockResolvedValueOnce(
      [{ controllerNumber: "2", lineNumber: "202", lastReportTime: new Date(), reportStatus: "OK" }],
    );

    await act(async () => {
      render(<StatusPanel />);
    });

    await waitFor(() => {
      expect(screen.getByText("По отправке отчетов нет никаких проблем. Нажмите для подробностей")).toBeInTheDocument();
    });
  });

  it("отображает предупреждающее сообщение при проблемах с отчетами", async () => {
    userStore.profile.organization.taxpayerNumber = "123456789012"; 

    vi.mocked(checkLinesForDaily).mockResolvedValueOnce(
      [{ controllerNumber: "1", lineNumber: "101", lastReportTime: new Date(), reportStatus: "ERROR" }]
    );
    vi.mocked(checkLinesForFiveminute).mockResolvedValueOnce(
      [{ controllerNumber: "2", lineNumber: "202", lastReportTime: new Date(), reportStatus: "WARN" }]
    );

    await act(async () => {
      render(<StatusPanel />);
    });

    await waitFor(() => {
      expect(screen.getByText("С некоторыми отчетами есть проблемы. Нажмите для подробностей")).toBeInTheDocument();
    });
  });
});