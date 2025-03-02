import { CreateDeploymentDto } from "@/dtos/deployment/create-deployment.dto";
import * as yup from "yup";

export type CreateDeploymentValues = CreateDeploymentDto;

export const emptyCreateDeploymentValues: CreateDeploymentValues = {
    configurationId: "",
    deviceId: [],
};

export const CreateDeploymentValidationSchema =
    yup.object<CreateDeploymentValues>({
        configurationId: yup.string().required("configuration id is required"),
        deviceId: yup
            .array()
            .required("device id is required")
            .of(yup.string().required("device id is required")),
    });
