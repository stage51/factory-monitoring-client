"use client"
import { makeAutoObservable } from "mobx";
import {
  fetchUserProfile,
  updateProfile as updateProfileAPI,
  updateOrganization as updateOrganizationAPI,
  deleteOrganization as deleteOrganizationAPI,
  UserRequest,
  UserResponse,
  OrganizationRequest,
} from "../services/profile/profile-service";
import { toast } from "@/components/hooks/use-toast"

export class UserStore {
  profile: UserResponse | null = null;
  isLoading: boolean = false;
  error: string | null = null;
  constructor() {
    makeAutoObservable(this);
  }

  fetchProfile = async () => {
    this.isLoading = true;
    try {
      const profile = await fetchUserProfile();
      this.profile = profile;
      toast({
        title: "Профиль загружен",
        description: "Данные успешно получены.",
      });
    } catch (err) {
      this.error = "Ошибка загрузки профиля";
      toast({
        title: this.error,
        variant: "destructive",
        description: "Не удалось получить данные для загрузки.",
      });
    } finally {
      this.isLoading = false;
    }
  }

  updateProfile = async (data: UserRequest) => {
    this.isLoading = true;
    try {
      await updateProfileAPI(data);
      if (this.profile) {
        this.profile = { ...this.profile, ...data };
      }
      toast({
        title: "Обновление профиля",
        description: "Данные успешно обновлены.",
      });
    } catch (err) {
      toast({
        title: "Ошибка обновления профиля",
        variant: "destructive",
        description: "Не удалось обновить данные пользователя.",
      });
    } finally {
      this.isLoading = false;
    }
  }

  updateOrganization = async (data: OrganizationRequest) => {
    this.isLoading = true;
    try {
      await updateOrganizationAPI(data);
      if (this.profile?.organization) {
        this.profile.organization = { ...this.profile.organization, ...data };
      }
      toast({
        title: "Обновление организации",
        description: "Данные успешно обновлены.",
      });
    } catch (err) {
      toast({
        title: "Ошибка обновления организации",
        variant: "destructive",
        description: "Не удалось обновить данные об организации.",
      });
    } finally {
      this.isLoading = false;
    }
  }

  deleteOrganization = async () => {
    this.isLoading = true;
    try {
      await deleteOrganizationAPI();
      if (this.profile) {
        this.profile.organization = null;
      }
      toast({
        title: "Удаление организации",
        description: "Данные об организации удалены.",
      });
    } catch (err) {
      toast({
        title: "Ошибка удаления организации",
        variant: "destructive",
        description: "Не удалось удалить данные об организации.",
      });
    } finally {
      this.isLoading = false;
    }
  }

  clearProfile = () => {
    this.profile = null;
    this.error = null;
  }
}

export const userStore = new UserStore();
