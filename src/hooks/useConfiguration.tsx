import { useQuery, useMutation } from "react-query";
import { configurationService } from "@/services/configuration.service";
import { ConfigurationResponseDto } from "@/dtos/configuration/configuration-response.dto";
import { useState } from "react";
import { toast } from "sonner";
import { AxiosError } from "axios";
import { ConfigurationModuleResponseDto } from "@/dtos/configuration/configuration-module-response.dto";

const CONFIGURATIONS_QUERY_KEY = "configurations";
const CONFIGURATION_QUERY_KEY = "configuration";
const MODULES_QUERY_KEY = "modulesById";

export const useConfiguration = (id?: string) => {
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
                refetch();
            },
            onError: (error: AxiosError) => {
                console.error(error);
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
        id: string,
    ): Promise<ConfigurationResponseDto> => {
        return await configurationService.getConfigurationById(id);
    };

    const fetchModules = async (
        id: string,
    ): Promise<ConfigurationModuleResponseDto[]> => {
        return await configurationService.getModules(id);
    };

    const { isLoading: isModulesLoading, isError: isModulesError } = useQuery({
        queryKey: [MODULES_QUERY_KEY, id],
        queryFn: async () => {
            try {
                if (id) {
                    const modules = await fetchModules(id!);
                    setModules(modules);
                    return modules;
                }
            } catch (error) {
                console.error(error);
                throw new Error("Error fetching configurations");
            }
        },
        onError: (error: AxiosError) => {
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
                        description: error.message,
                    });
                    throw new Error("Error fetching configurations");
                }
            }
        },
    });

    const { isLoading: isConfigurationLoading, isError: isConfigurationError } =
        useQuery({
            queryKey: [CONFIGURATION_QUERY_KEY, id],
            queryFn: async () => {
                try {
                    if (id) {
                        const configuration = await fetchConfiguration(id!);
                        setConfiguration(configuration);
                        return configuration;
                    }
                } catch (error) {
                    if (error instanceof AxiosError) {
                        console.error(error);
                        toast.error("Error fetching configuration", {
                            description: error.message,
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
