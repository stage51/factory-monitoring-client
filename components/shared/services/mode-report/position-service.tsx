import { API_BASE_URL } from './url';
import apiClient from '../auth/api-client';

const API_URL = API_BASE_URL;
apiClient.defaults.headers['Content-Type'] = 'application/json';

export type SensorRequest = {
    taxpayerNumber: string
    sensorNumber: string
}

export type DailyReportRequest = {
    sensor: SensorRequest
    position: PositionRequest
}

export type ProductRequest = {
    unitType : string,
    fullName : string,
    alcCode : string,
    productVCode : string
}

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
    mode : string
}

export const getModeReport = async (id : number) => {
    const response = await apiClient.get(`${API_URL}/${id}`);
    return response.data;
};


export const createModeReport = async (positionRequest : PositionRequest) => {
    const response = await apiClient.post(API_URL, positionRequest);
    return response.data;
};

export const updateModeReport = async (id : number, positionRequest : PositionRequest) => {
    const response = await apiClient.put(`${API_URL}/${id}`, positionRequest);
    return response.data;
};


export const deleteModeReport = async (id : number) => {
    await apiClient.delete(`${API_URL}/${id}`);
};


export const getPageModeReports = async (params: any, taxpayerNumber : string) => {
    const response = await apiClient.post(`${API_URL}/fetch/${taxpayerNumber}`, params);
    return response.data;
}