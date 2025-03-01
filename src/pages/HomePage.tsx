import DeviceCard from "@/components/common/DeviceCard";
import { useRegistry } from "@/hooks/useRegistry";
import { useEffect } from "react";
import { toast } from "sonner";

export default function HomePage() {
    const { devices, isDevicesLoading, isConnectionError, isDevicesError } =
        useRegistry();

    useEffect(() => {
        if (isConnectionError)
            toast.error("Connection error. Please try again later.");
    }, [isConnectionError]);

    useEffect(() => {
        if (isDevicesError)
            toast.error("Devices error. Please try again later.");
    }, [isDevicesError]);

    return (
        <div className="flex flex-wrap gap-4">
            {!isDevicesLoading &&
                devices.map((device) => {
                    return <DeviceCard key={device.deviceId} {...device} />;
                })}
        </div>
    );
}
