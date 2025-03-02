import { useQuery, useMutation } from "react-query";
import { configurationService } from "@/services/configuration.service";
import { ConfigurationResponseDto } from "@/dtos/configuration/configuration-response.dto";
import { useState } from "react";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ConfigurationModuleResponseDto } from "@/dtos/configuration/configuration-module-response.dto";
import { ErrorDto } from "@/dtos/shared/error.dto";

const CONFIGURATIONS_QUERY_KEY = "configurations";
const CONFIGURATION_QUERY_KEY = "configuration";
const MODULES_QUERY_KEY = "modulesById";

export const useConfiguration = (
    configurationId?: string,
    deploymentId?: string,
    deviceId?: string,
) => {
    const [configurations, setConfigurations] = useState<
        ConfigurationResponseDto[]
    >([]);
    const [configuration, setConfiguration] =
        useState<ConfigurationResponseDto | null>(null);
    const [modules, setModules] = useState<ConfigurationModuleResponseDto[]>(
        [],
    );

    const createConfiguration = useMutation(
        configurationService.createConfiguration,
        {
            onSuccess: () => {
                toast.success("Configuration created successfully");
                refetch();
            },
            onError: (error: AxiosError<ErrorDto>) => {
                console.error(error);
                toast.error("Error creating configuration", {
                    description: error.response?.data.message,
                });
                throw new Error("Error creating configuration");
            },
        },
    );

    const fetchConfigurations = async (): Promise<
        ConfigurationResponseDto[]
    > => {
        return await configurationService.getConfigurations();
    };

    const fetchConfiguration = async (
        configurationId: string,
    ): Promise<ConfigurationResponseDto> => {
        return await configurationService.getConfigurationById(configurationId);
    };

    const fetchModules = async (
        configurationId: string,
    ): Promise<ConfigurationModuleResponseDto[]> => {
        return await configurationService.getModules(configurationId);
    };

    const { isLoading: isModulesLoading, isError: isModulesError } = useQuery({
        queryKey: [MODULES_QUERY_KEY, configurationId, deploymentId, deviceId],
        queryFn: async () => {
            try {
                if (configurationId) {
                    const modules = await fetchModules(configurationId!);
                    setModules(modules);
                    return modules;
                }
            } catch (error) {
                console.error(error);
                throw new Error("Error fetching configurations");
            }
        },
        onError: (error: AxiosError<ErrorDto>) => {
            console.error(error);
            toast.error("Error fetching configurations", {
                description: error.message,
            });
            throw new Error("Error fetching configurations");
        },
    });

    const {
        isLoading: isConfigurationsLoading,
        isError: isConfigurationsError,
        refetch,
    } = useQuery({
        queryKey: [CONFIGURATIONS_QUERY_KEY],
        queryFn: async () => {
            try {
                const configurations = await fetchConfigurations();
                setConfigurations(configurations);
                return configurations;
            } catch (error) {
                if (error instanceof AxiosError) {
                    console.error(error);
                    toast.error("Error fetching configurations", {
                        description: (error as AxiosError<ErrorDto>).response
                            ?.data.message,
                    });
                    throw new Error("Error fetching configurations");
                }
            }
        },
    });

    const { isLoading: isConfigurationLoading, isError: isConfigurationError } =
        useQuery({
            queryKey: [...CONFIGURATION_QUERY_KEY, configurationId],
            queryFn: async () => {
                try {
                    if (configurationId) {
                        const configuration = await fetchConfiguration(
                            configurationId!,
                        );
                        setConfiguration(configuration);
                        return configuration;
                    }
                } catch (error) {
                    if (error instanceof AxiosError) {
                        console.error(error);
                        toast.error("Error fetching configuration", {
                            description: (error as AxiosError<ErrorDto>)
                                .response?.data.message,
                        });
                        throw new Error("Error fetching configuration");
                    }
                }
            },
        });

    return {
        configurations,
        refetch,
        isConfigurationsLoading,
        isConfigurationsError,
        configuration,
        isConfigurationLoading,
        isConfigurationError,
        isModulesLoading,
        isModulesError,
        createConfiguration,
        modules,
    };
};
