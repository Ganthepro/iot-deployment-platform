import apiController from "@/controllers/api.controller";
import { Module } from "@/dtos/configuration/create-configuration.dto";

export const containerService = {
    async getTags(repositoryName: Module) {
        return await apiController<string[]>(
            `/container/tags`,
            "get",
            undefined,
            { repositoryName },
        );
    },
};
