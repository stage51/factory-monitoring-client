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
    positions: PositionRequest[]
    status: string
}


export type ProductRequest = {
    unitType : string,
    type : string,
    fullName : string,
    shortName : string,
    alcCode : string,
    capacity : number,
    alcVolume : number,
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
    mode : string,
}

export const getDailyReport = async (id : number) => {
    const response = await apiClient.get(`${API_URL}/${id}`);
    return response.data;
};


export const createDailyReport = async (dailyReport: DailyReportRequest) => {
    const response = await apiClient.post(API_URL, dailyReport);
    return response.data;
};

export const updateDailyReport = async (id : number, dailyReport: DailyReportRequest) => {
    const response = await apiClient.put(`${API_URL}/${id}`, dailyReport);
    return response.data;
};


export const deleteDailyReport = async (id : number) => {
    await apiClient.delete(`${API_URL}/${id}`);
};


export const getPageDailyReports = async (params: any, taxpayerNumber : string) => {
    const response = await apiClient.post(`${API_URL}/fetch/${taxpayerNumber}`, params);
    return response.data;
}

export const checkLines = async (taxpayerNumber : string | undefined) => {
    const response = await apiClient.get(`${API_URL}/check`, { params: {taxpayerNumber} })
    return response.data
}