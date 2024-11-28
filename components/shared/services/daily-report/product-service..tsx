import { API_BASE_URL } from './url';
import apiClient from '../auth/api-client';

const API_URL = API_BASE_URL + '/products';

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

export const getProduct = async (id : number) => {
    const response = await apiClient.get(`${API_URL}/${id}`);
    return response.data;
};


export const createProduct = async (productRequest : ProductRequest) => {
    const response = await apiClient.post(API_URL, productRequest);
    return response.data;
};

export const updateProduct = async (id : number, productRequest : ProductRequest) => {
    const response = await apiClient.put(`${API_URL}/${id}`, productRequest);
    return response.data;
};


export const deleteProduct = async (id : number) => {
    await apiClient.delete(`${API_URL}/${id}`);
};


export const getPageProducts = async (params) => {
    const response = await apiClient.get(API_URL, { params });
    return response.data;
};