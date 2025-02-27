import { CreateDeploymentDto } from "@/dtos/deployment/create-deployment.dto";
import axiosInstance from "../services/api.service";
import { CreateConfigurationDto } from "@/dtos/configuration/create-configuration.dto";

export default async function apiController<T>(
    url: string,
    method: "get" | "post" | "head",
    data?: CreateDeploymentDto | CreateConfigurationDto,
    params?: any,
): Promise<T> {
    try {
        const response = await axiosInstance.request({
            url,
            method,
            data,
            params,
        });
        return response.data;
    } catch (error) {
        return Promise.reject(error);
    }
}
