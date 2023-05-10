import axios from 'axios';
import { Provider } from './pages/dashboard/types';

export const getUser = async () => {
    const { data } = await axios.get('/api/user');
    return data;
}


export const getUserServices = async () => {
    const { data } = await axios.get('/api/services');
    return data;
}
export const getUserCustomers = async () => {
    const { data } = await axios.get('/api/customers');
    return data;
}
export const getUserProviders = async () => {
    const { data } = await axios.get('/api/providers');
    return data;
}
export const getUserInvoices = async () => {
    const { data } = await axios.get('/api/invoices');
    return data;
}
//Create Service , Customer , Provider
export const createUserService = async (service: Provider) => {
    const { data } = await axios.post('/api/services', service);
    return data;
}
export const createUserCustomer = async (customer: Provider) => {
    const { data } = await axios.post('/api/customers', customer);
    return data;
}
export const createUserProvider = async (provider: Provider) => {
    const { data } = await axios.post('/api/providers', provider);
    return data;
}

//Edit Service , Customer , Provider
export const editUserService = async (service: Provider) => {
    const { data } = await axios.put('/api/services', service);
    return data;
}
export const editUserCustomer = async (customer: Provider) => {

    const { data } = await axios.put('/api/customers', customer);
    return data;
}
export const editUserProvider = async (provider: Provider) => {
    const { data } = await axios.put('/api/providers', provider);
    return data;
}
//Delete Service , Customer , Provider
export const deleteUserCustomer = async (id: string) => {
    const { data } = await axios.delete(`/api/customers/${id}`);
    return data;
}
export const deleteUserProvider = async (id: string) => {
    const { data } = await axios.delete(`/api/providers/${id}`);
    return data;
}
export const deleteUserService = async (id: string) => {
    const { data } = await axios.delete(`/api/services/${id}`);
    return data;
}


