import { useQuery } from "react-query";
import { registryService } from "@/services/registry.service";
import { DeviceResponseDto } from "@/dtos/registry/device-response.dto";
import { useState } from "react";

const DEVICE_QUERY_KEY = "device";
const CONNECTION_QUERY_KEY = "connection";

export const useRegistry = () => {
    const [devices, setDevices] = useState<DeviceResponseDto[]>([]);
    const [connectionStatus, setConnectionStatus] = useState<boolean>(false);

    const fetchDivices = async (): Promise<DeviceResponseDto[]> => {
        return await registryService.getDevices();
    };

    const {
        isLoading: isDevicesLoading,
        isError: isDevicesError,
        refetch,
    } = useQuery({
        queryKey: [DEVICE_QUERY_KEY],
        queryFn: async () => {
            try {
                const devices = await fetchDivices();
                setDevices(devices);
                return devices;
            } catch (error) {
                console.error(error);
                throw new Error("Error fetching devices");
            }
        },
    });

    const { isLoading: isConnectionLoading, isError: isConnectionError } =
        useQuery(CONNECTION_QUERY_KEY, registryService.checkConnection, {
            onSuccess: () => setConnectionStatus(true),
        });

    return {
        devices,
        isConnectionLoading,
        isConnectionError,
        refetch,
        isDevicesLoading,
        isDevicesError,
        connectionStatus,
    };
};
