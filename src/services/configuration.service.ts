import apiController from "@/controllers/api.controller";
import { CreateConfigurationDto } from "@/dtos/configuration/create-configuration.dto";
import { ConfigurationResponseDto } from "@/dtos/configuration/configuration-response.dto";
import { ConfigurationModuleResponseDto } from "@/dtos/configuration/configuration-module-response.dto";

export const configurationService = {
    async getModules(configurationId: string) {
        return await apiController<ConfigurationModuleResponseDto[]>(
            `/configuration/${configurationId}/modules`,
            "get",
        );
    },

    async getConfigurations() {
        return await apiController<ConfigurationResponseDto[]>(
            "/configuration",
            "get",
        );
    },

    async getConfigurationById(configurationId: string) {
        return await apiController<ConfigurationResponseDto>(
            `/configuration/${configurationId}`,
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
