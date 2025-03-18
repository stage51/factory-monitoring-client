import { describe, it, expect, vi, beforeEach } from "vitest";
import { userStore, UserStore } from "@/components/shared/stores/user-store";
import {
  fetchUserProfile,
  updateProfile as updateProfileAPI,
  updateOrganization as updateOrganizationAPI,
  deleteOrganization as deleteOrganizationAPI,
  updateSetting as updateSettingAPI,
} from "@/components/shared/services/profile/profile-service";
import "@testing-library/jest-dom";

vi.mock("@/components/shared/services/profile/profile-service", () => ({
  fetchUserProfile: vi.fn(),
  updateProfile: vi.fn(),
  updateOrganization: vi.fn(),
  deleteOrganization: vi.fn(),
  updateSetting: vi.fn(),
}));

describe("UserStore", () => {
  let store;

  beforeEach(() => {
    store = new UserStore();
    localStorage.setItem("access_token", "test-token");
    vi.clearAllMocks();
  });

  it("загружает профиль пользователя", async () => {
    vi.mocked(fetchUserProfile).mockResolvedValueOnce(
        {
            email: "ivan@example.com",
            firstName: "Иван",
            lastName: "Иванов",
            middleName: "Петрович",
            active: true,
            role: "user",
            organization: {
                shortName: "Компания",
                name: "Компания производства напитков",
                taxpayerNumber: "123456789012",
                type: "Завод",
                reasonCode: "123456789",
                region: "Россия",
                address: "Москва",
                specialEmail: "company@mail.com",
                specialPhone: "+79003003030"
            },
            setting: {
                timezone: "UTC+03:00",
                subscribe: false,
                reportNotifications: [],
                avatarUrl: "url"
            }, 
        },
    );

    await store.fetchProfile();

    expect(store.profile).not.toBeNull();
    expect(store.profile.email).toBe("ivan@example.com");
    expect(store.isLoading).toBe(false);
  });

  it("обновляет профиль пользователя", async () => {
    vi.mocked(updateProfileAPI).mockResolvedValueOnce();
    store.profile = { email: "old@example.com", firstName: "Старый" };

    await store.updateProfile({ firstName: "Новый" });

    expect(store.profile.firstName).toBe("Новый");
    expect(store.isLoading).toBe(false);
  });

  it("обновляет данные организации", async () => {
    vi.mocked(updateOrganizationAPI).mockResolvedValueOnce();
    store.profile = { organization: { taxpayerNumber: "123" } };

    await store.updateOrganization({ taxpayerNumber: "456" });

    expect(store.profile.organization.taxpayerNumber).toBe("456");
  });

  it("удаляет организацию", async () => {
    vi.mocked(deleteOrganizationAPI).mockResolvedValueOnce();
    store.profile = { organization: { taxpayerNumber: "123" } };

    await store.deleteOrganization();

    expect(store.profile.organization).toBeNull();
  });

  it("очищает профиль", () => {
    store.profile = { email: "ivan@example.com" };
    store.clearProfile();

    expect(store.profile).toBeNull();
  });
  afterEach(() => {
    localStorage.clear();
  });
});
