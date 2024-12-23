import apiClient from "../auth/api-client";

export interface SettingResponse {
    timezone: string;
    subscribe: boolean;
    reportNotifications: string[];
    avatarUrl: string;
}

export interface OrganizationResponse {
    shortName: string;
    name: string;
    type: string;
    region: string;
    taxpayerNumber: string;
    reasonCode: string;
    address: string;
    specialEmail: string;
    specialPhone: string;
  }
  
export interface UserResponse {
    email: string;
    firstName: string;
    lastName: string;
    middleName: string;
    active: boolean;
    role: string;
    organization: OrganizationResponse;
    setting: SettingResponse;
}

export interface SettingRequest {
    timezone: string;
    subscribe: boolean;
    reportNotifications: string[];
    avatarUrl: string;
}

export interface OrganizationRequest {
    shortName: string;
    name: string;
    type: string;
    region: string;
    taxpayerNumber: string;
    reasonCode: string;
    address: string;
    specialEmail: string;
    specialPhone: string;
}

export interface UserRequest {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
    middleName: string;
}
export const fetchUserProfile = async (): Promise<UserResponse> => {
    const response = await apiClient.get("/auth-server/users/profile");
    console.log("User profile:", response.data);
    return response.data;
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
    const response = await apiClient.post("/auth-server/organizations/profile", orgData); 
};

export const updateOrganization = async (data : OrganizationRequest) => {
    await apiClient.put("/auth-server/organizations/profile", data)
};

export const deleteOrganization = async () => {
    await apiClient.delete("/auth-server/organizations/profile")
}

export const updateProfile = async (data : UserRequest) => {
    await apiClient.put("/auth-server/users/profile", data)
}

export const updateSetting = async (data: SettingRequest) => {
    await apiClient.put("auth-server/users/profile/setting", data)
}
