import { CreateConfigurationDto } from "@/dtos/configuration/create-configuration.dto";
import * as yup from "yup";

export type CreateConfigurationValues = CreateConfigurationDto;

export const emptyCreateConfigurationValues: CreateConfigurationValues = {
    configurationId: "",
    baseTemplateConfigurationId: "",
    modules: [],
};

export const CreateConfigurationValidationSchema =
    yup.object<CreateConfigurationValues>({
        configurationId: yup.string().required("configuration id is required"),
        baseTemplateConfigurationId: yup
            .string()
            .required("base template configuration id is required"),
        modules: yup
            .array()
            .required()
            .of(
                yup.object({
                    moduleId: yup.string().required("module id is required"),
                    tag: yup.string().optional(),
                }),
            ),
    });
