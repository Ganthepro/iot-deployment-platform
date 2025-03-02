import { useQuery, useMutation } from "react-query";
import { deploymentService } from "@/services/deployment.service";
import { DeploymentResponseDto } from "@/dtos/deployment/deployment-response.dto";
import { useState } from "react";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ErrorDto } from "@/dtos/shared/error.dto";

const DEPLOYMENTS_QUERY_KEY = "deployments";
const DEPLOYMENT_QUERY_KEY = "deployment";
const DEPLOYMENT_BY_DEVICE_QUERY_KEY = "deploymentByDeviceId";

export const useDeployment = (
    id?: string,
    deviceId?: string,
    query?: { isLatest: boolean },
) => {
    const [deployments, setDeployments] = useState<DeploymentResponseDto[]>([]);
    const [deployment, setDeployment] = useState<DeploymentResponseDto | null>(
        null,
    );

    const createDeployment = useMutation(deploymentService.createDeployment, {
        onSuccess: () => {
            toast.success("Deployment created successfully");
            refetch();
        },
        onError: (error: AxiosError) => {
            console.error(error);
            toast.error("Error creating deployment", {
                description: (error as AxiosError<ErrorDto>).response?.data
                    .message,
            });
            throw new Error("Error creating deployment");
        },
    });

    const fetchDeployments = async (): Promise<DeploymentResponseDto[]> => {
        return await deploymentService.getDeployments();
    };

    const fetchDeployment = async (
        id: string,
    ): Promise<DeploymentResponseDto> => {
        return await deploymentService.getDeploymentById(id);
    };

    const fetchDeploymentByDeviceId = async (
        deviceId: string,
    ): Promise<DeploymentResponseDto[]> => {
        return await deploymentService.getDeploymentByDeviceId(
            deviceId,
            query?.isLatest,
        );
    };

    const {
        isLoading: isDeploymentByDeviceLoading,
        isError: isDeploymentByDeviceError,
    } = useQuery({
        queryKey: [DEPLOYMENT_BY_DEVICE_QUERY_KEY, deviceId, query?.isLatest],
        queryFn: async () => {
            try {
                if (deviceId) {
                    const deployments = await fetchDeploymentByDeviceId(
                        deviceId!,
                    );
                    setDeployments(deployments);
                    return deployments;
                }
            } catch (error) {
                console.error(error);
                throw new Error("Error fetching deployments");
            }
        },
        onError: (error: AxiosError<ErrorDto>) => {
            console.error(error);
            toast.error("Error fetching deployments", {
                description: error.message,
            });
            throw new Error("Error fetching deployments");
        },
    });

    const {
        isLoading: isDeploymentsLoading,
        isError: isDeploymentsError,
        refetch,
    } = useQuery({
        queryKey: [DEPLOYMENTS_QUERY_KEY],
        queryFn: async () => {
            try {
                if (!deviceId) {
                    const deployments = await fetchDeployments();
                    setDeployments(deployments);
                    return deployments;
                }
            } catch (error) {
                if (error instanceof AxiosError) {
                    console.error(error);
                    toast.error("Error fetching deployments", {
                        description: (error as AxiosError<ErrorDto>).response
                            ?.data.message,
                    });
                    throw new Error("Error fetching deployments");
                }
            }
        },
    });

    const { isLoading: isDeploymentLoading, isError: isDeploymentError } =
        useQuery({
            queryKey: [DEPLOYMENT_QUERY_KEY, id],
            queryFn: async () => {
                try {
                    if (id) {
                        const deployment = await fetchDeployment(id!);
                        setDeployment(deployment);
                        return deployment;
                    }
                } catch (error) {
                    if (error instanceof AxiosError) {
                        console.error(error);
                        toast.error("Error fetching deployment", {
                            description: (error as AxiosError<ErrorDto>)
                                .response?.data.message,
                        });
                        throw new Error("Error fetching deployment");
                    }
                }
            },
        });

    return {
        deployments,
        refetch,
        isDeploymentsLoading,
        isDeploymentsError,
        deployment,
        isDeploymentLoading,
        isDeploymentError,
        isDeploymentByDeviceLoading,
        isDeploymentByDeviceError,
        createDeployment,
    };
};
