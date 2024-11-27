import axios from "axios";
import { SERVER_URL } from "../server-url";
import PutAccessToken from "../auth/put-access-token";

PutAccessToken()

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
    timezone: string;
    subscribe: boolean;
    active: boolean;
    role: string;
    organization: OrganizationResponse;
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
    timezone: string;
    subscribe: boolean;
}
export const fetchUserProfile = async (): Promise<UserResponse> => {
    const response = await axios.get(SERVER_URL + "/auth-server/users/profile");
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
    const response = await axios.post(SERVER_URL + "/auth-server/organizations/profile", orgData); 
};

export const updateOrganization = async (data : OrganizationRequest) => {
    await axios.put(SERVER_URL + "/auth-server/organizations/profile", data)
};

export const deleteOrganization = async () => {
    await axios.delete(SERVER_URL + "/auth-server/organizations/profile")
}

export const updateProfile = async (data : UserRequest) => {
    await axios.put(SERVER_URL + "/auth-server/users/profile", data)
}