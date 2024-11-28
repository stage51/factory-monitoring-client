import { API_BASE_URL } from './url';
import { ProductRequest } from './product-service.';
import apiClient from '../auth/api-client';

const API_URL = API_BASE_URL + '/positions';
apiClient.defaults.headers['Content-Type'] = 'application/json';


export type PositionRequest = {
    product : ProductRequest,
    startDate : Date,
    endDate : Date,
    vbsStart : number,
    vbsEnd : number,
    aStart : number,
    aEnd : number,
    percentAlc : number,
    bottleCountStart : number,
    bottleCountEnd : number,
    temperature : number,
    mode : string,
    crotonaldehyde : number,
    toluene : number,
    status : string
}

export const getPosition = async (id : number) => {
    const response = await apiClient.get(`${API_URL}/${id}`);
    return response.data;
};


export const createPosition = async (positionRequest : PositionRequest) => {
    const response = await apiClient.post(API_URL, positionRequest);
    return response.data;
};

export const updatePosition = async (id : number, positionRequest : PositionRequest) => {
    const response = await apiClient.put(`${API_URL}/${id}`, positionRequest);
    return response.data;
};


export const deletePosition = async (id : number) => {
    await apiClient.delete(`${API_URL}/${id}`);
};


export const getPagePositions = async (params: any) => {
    const response = await apiClient.post(`${API_URL}/fetch`, params);
    return response.data;
}