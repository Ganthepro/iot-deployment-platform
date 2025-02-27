import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

const baseURL = import.meta.env.VITE_PUBLIC_ENV || "";

const axiosInstance: AxiosInstance = axios.create({ baseURL });

const responseInterceptor = (response: AxiosResponse) => {
    return response;
};

const errorInterceptor = async (error: AxiosError) => {
    return Promise.reject(error);
};

axiosInstance.interceptors.response.use(responseInterceptor, errorInterceptor);

export default axiosInstance;
