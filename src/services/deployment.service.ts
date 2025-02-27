import apiController from "@/controllers/api.controller";
import { CreateDeploymentDto } from "@/dtos/deployment/create-deployment.dto";
import { DeploymentResponseDto } from "@/dtos/deployment/deployment-response.dto";

export const deploymentService = {
    async getDeploymentByDeviceId(deviceId: string, isLatest: boolean = false) {
        return await apiController<DeploymentResponseDto[]>(
            `/deployment/${deviceId}/by-device`,
            "get",
            undefined,
            { isLatest },
        );
    },

    async getDeployments() {
        return await apiController<DeploymentResponseDto[]>(
            "/deployment",
            "get",
        );
    },

    async getDeploymentById(id: string) {
        return await apiController<DeploymentResponseDto>(
            `/deployment/${id}`,
            "get",
        );
    },

    async createDeployment(createDeploymentDto: CreateDeploymentDto) {
        return await apiController<DeploymentResponseDto>(
            "/deployment",
            "post",
            createDeploymentDto,
        );
    },
};
