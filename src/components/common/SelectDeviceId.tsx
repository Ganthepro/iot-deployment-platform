import { useState } from "react";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
    SelectGroup,
    SelectLabel,
} from "../ui/select";
import { DeviceResponseDto } from "@/dtos/registry/device-response.dto";

interface SelectDeviceIdProps {
    devices: DeviceResponseDto[];
    deviceIds: (string | null)[];
    isDevicesLoading: boolean;
    index: number;
    handleDeviceIdChange: (index: number, deviceId: string) => void;
}

export default function SelectDeviceId({
    devices,
    isDevicesLoading,
    deviceIds,
    index,
    handleDeviceIdChange,
}: SelectDeviceIdProps) {
    const [deviceId, setDeviceId] = useState<string | null>(null);

    function getRemainingDeviceIds() {
        const devicesMap = devices.map((device) => device.deviceId);
        const filtered = devicesMap.filter((m) => !deviceIds.includes(m));
        if (deviceId) filtered.push(deviceId);
        return filtered;
    }

    return (
        <Select
            onValueChange={(value) => {
                setDeviceId(value);
                handleDeviceIdChange(index, value);
            }}
        >
            <SelectTrigger>
                <SelectValue placeholder="Select a Device" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Devices</SelectLabel>
                    {!isDevicesLoading &&
                        getRemainingDeviceIds().map((device) => {
                            return (
                                <SelectItem key={device} value={device!}>
                                    {device}
                                </SelectItem>
                            );
                        })}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
}
