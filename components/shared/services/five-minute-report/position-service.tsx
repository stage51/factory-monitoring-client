import { API_BASE_URL } from './url';
import { ProductRequest } from './product-service.';
import apiClient from '../auth/api-client';

const API_URL = API_BASE_URL + '/positions';
apiClient.defaults.headers['Content-Type'] = 'application/json';


export type PositionRequest = {
    product : ProductRequest,
    controlDate : Date,
    vbsControl : number,
    aControl : number,
    percentAlc : number,
    bottleCountControl : number,
    temperature : number,
    mode : string,
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


export const getPagePositions = async (params: any, taxpayerNumber : string) => {
    const response = await apiClient.post(`${API_URL}/fetch/${taxpayerNumber}`, params);
    return response.data;
}