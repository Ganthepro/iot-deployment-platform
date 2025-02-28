import { Fragment } from "react/jsx-runtime";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { DeviceResponseDto } from "@/dtos/registry/device-response.dto";
import { useDeployment } from "@/hooks/UseDeployment";
import ModuleAccordion from "./ModuleAccordion";

export default function DeviceCard({
    connectionState,
    deviceId,
}: DeviceResponseDto) {
    const { deployments, isDeploymentByDeviceLoading } = useDeployment(
        undefined,
        deviceId,
        {
            isLatest: true,
        },
    );

    const descriptionStyle =
        connectionState === "Connected" ? "text-green-500" : "text-red-500";

    return (
        <Fragment>
            <Card className={cn("w-[300px]")}>
                <CardHeader className="text-left">
                    <CardTitle>{deviceId}</CardTitle>
                    <CardDescription className={descriptionStyle}>
                        {connectionState}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {!isDeploymentByDeviceLoading ? (
                        deployments.length > 0 ? (
                            deployments.map((deployment) => {
                                return <ModuleAccordion {...deployment} />;
                            })
                        ) : (
                            <p className="text-red-500">No modules</p>
                        )
                    ) : (
                        <p>Loading...</p>
                    )}
                </CardContent>
            </Card>
        </Fragment>
    );
}
