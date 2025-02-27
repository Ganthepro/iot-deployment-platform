import apiController from "@/controllers/api.controller";
import { CreateConfigurationDto } from "@/dtos/configuration/create-configuration.dto";
import { ConfigurationResponseDto } from "@/dtos/configuration/configuration-response.dto";
import { ConfigurationModuleResponseDto } from "@/dtos/configuration/configuration-module-response.dto";

export const configurationService = {
    async getModules(id: string) {
        return await apiController<ConfigurationModuleResponseDto[]>(
            `/configuration/${id}/modules`,
            "get",
        );
    },

    async getConfigurations() {
        return await apiController<ConfigurationResponseDto[]>(
            "/configuration",
            "get",
        );
    },

    async getConfigurationById(id: string) {
        return await apiController<ConfigurationResponseDto>(
            `/configuration/${id}`,
            "get",
        );
    },

    async createConfiguration(createConfigurationDto: CreateConfigurationDto) {
        return await apiController<ConfigurationResponseDto>(
            "/configuration",
            "post",
            createConfigurationDto,
        );
    },
};
