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
    controlDate : Date,
    vbsControl : number,
    aControl : number,
    percentAlc : number,
    bottleCountControl : number,
    temperature : number,
    mode : string,
}

export const getFiveMinuteReport = async (id : number) => {
    const response = await apiClient.get(`${API_URL}/${id}`);
    return response.data;
};


export const createFiveMinuteReport = async (dailyReportRequest : DailyReportRequest) => {
    const response = await apiClient.post(API_URL, dailyReportRequest);
    return response.data;
};

export const updateFiveMinuteReport = async (id : number, dailyReportRequest : DailyReportRequest) => {
    const response = await apiClient.put(`${API_URL}/${id}`, dailyReportRequest);
    return response.data;
};


export const deleteFiveMinuteReport = async (id : number) => {
    await apiClient.delete(`${API_URL}/${id}`);
};


export const getPageFiveMinuteReports = async (params: any, taxpayerNumber : string) => {
    const response = await apiClient.post(`${API_URL}/fetch/${taxpayerNumber}`, params);
    return response.data;
}

export const checkLines = async (taxpayerNumber : string | undefined) => {
    const response = await apiClient.get(`${API_URL}/check`, { params: {taxpayerNumber} })
    return response.data
}