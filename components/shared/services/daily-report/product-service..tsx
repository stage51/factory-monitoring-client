import axios from 'axios';
import { API_BASE_URL } from './url';
import PutAccessToken from '../auth/put-access-token';

const API_URL = API_BASE_URL + '/products';

PutAccessToken()

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
    const response = await axios.get(`${API_BASE_URL}/${id}`);
    return response.data;
};


export const createProduct = async (productRequest : ProductRequest) => {
    const response = await axios.post(API_BASE_URL, productRequest);
    return response.data;
};

export const updateProduct = async (id : number, productRequest : ProductRequest) => {
    const response = await axios.put(`${API_BASE_URL}/${id}`, productRequest);
    return response.data;
};


export const deleteProduct = async (id : number) => {
    await axios.delete(`${API_BASE_URL}/${id}`);
};


export const getPageProducts = async (params) => {
    const response = await axios.get(API_BASE_URL, { params });
    return response.data;
};