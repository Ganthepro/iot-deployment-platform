import apiController from "@/controllers/api.controller";
import { DeviceResponseDto } from "@/dtos/registry/device-response.dto";

export const registryService = {
    async checkConnection() {
        return await apiController<void>("/registry", "head");
    },

    async getDevices() {
        return await apiController<DeviceResponseDto[]>(
            "/registry/device",
            "get",
        );
    },
};
