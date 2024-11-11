import axios from 'axios';
import { API_BASE_URL } from './url';
import { ProductRequest } from './product-service.';

const API_URL = API_BASE_URL + '/positions';
axios.defaults.headers['Content-Type'] = 'application/json';

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

export const getPosition = async (id : number) => {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
};


export const createPosition = async (positionRequest : PositionRequest) => {
    const response = await axios.post(API_URL, positionRequest);
    return response.data;
};

export const updatePosition = async (id : number, positionRequest : PositionRequest) => {
    const response = await axios.put(`${API_URL}/${id}`, positionRequest);
    return response.data;
};


export const deletePosition = async (id : number) => {
    await axios.delete(`${API_URL}/${id}`);
};


export const getPagePositions = async (params) => {
    const response = await axios.get(API_URL, { params });
    return response.data;
};