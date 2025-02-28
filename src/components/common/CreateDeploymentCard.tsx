import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { cn } from "@/lib/utils";
import CardLayout from "@/layouts/CardLayout";
import { Button } from "../ui/button";
import { Select } from "../ui/select";
import {
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import { Label } from "../ui/label";
import { useRegistry } from "@/hooks/UseRegistry";
import { useConfiguration } from "@/hooks/UseConfiguration";
import { useState } from "react";
import ModuleAccordion from "./ModuleAccordion";
import { useFormik } from "formik";
import {
    CreateDeploymentValidationSchema,
    CreateDeploymentValues,
    emptyCreateDeploymentValues,
} from "@/formik/create-deployment.formik";
import { toast } from "sonner";
import { useDeployment } from "@/hooks/UseDeployment";

interface CreateDeploymentCardProps {
    onClose: () => void;
}

export default function CreateDeploymentCard({
    onClose,
}: CreateDeploymentCardProps) {
    const { devices, isDevicesLoading } = useRegistry();
    const { configurations, isConfigurationsLoading } = useConfiguration();
    const { createDeployment } = useDeployment();
    const [showAccordion, setShowAccordion] = useState(false);
    const [selectedConfiguration, setSelectedConfiguration] = useState<
        string | null
    >(null);

    function handleSelectConfiguration(configurationId: string) {
        setShowAccordion(true);
        setSelectedConfiguration(configurationId);
        createDeploymentFormik.setFieldValue(
            "configurationId",
            configurationId,
        );
    }

    function handleClose() {
        setShowAccordion(false);
        setSelectedConfiguration(null);
        onClose();
    }

    async function handleSubmit(values: CreateDeploymentValues) {
        try {
            await createDeployment.mutateAsync(values);
            onClose();
            return;
        } catch (error) {
            console.error(error);
        }
    }

    const createDeploymentFormik = useFormik<CreateDeploymentValues>({
        initialValues: {
            ...emptyCreateDeploymentValues,
        },
        initialErrors: {
            ...emptyCreateDeploymentValues,
        },
        validateOnChange: true,
        enableReinitialize: true,
        validationSchema: CreateDeploymentValidationSchema,
        onSubmit: handleSubmit,
    });

    return (
        <CardLayout>
            <Card className={cn("w-[300px]")}>
                <form onSubmit={createDeploymentFormik.handleSubmit}>
                    <CardHeader>
                        <CardTitle>Create Deployment</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="flex flex-col gap-4">
                            <div className="flex flex-col gap-2">
                                <Label className="self-start">
                                    Configuration
                                </Label>
                                <Select
                                    onValueChange={handleSelectConfiguration}
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a Configuration" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {!isConfigurationsLoading &&
                                            configurations.map(
                                                (configuration) => {
                                                    return (
                                                        <SelectItem
                                                            key={
                                                                configuration.configurationId
                                                            }
                                                            value={
                                                                configuration.configurationId
                                                            }
                                                        >
                                                            {`${configuration.configurationId} (${configuration.status})`}
                                                        </SelectItem>
                                                    );
                                                },
                                            )}
                                    </SelectContent>
                                </Select>
                            </div>
                            {showAccordion && selectedConfiguration && (
                                <ModuleAccordion
                                    configurationId={selectedConfiguration}
                                />
                            )}
                            <div className="flex flex-col gap-2">
                                <Label className="self-start">Device</Label>
                                <Select
                                    onValueChange={(value) =>
                                        createDeploymentFormik.setFieldValue(
                                            "deviceId",
                                            value,
                                        )
                                    }
                                >
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select a Device" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {!isDevicesLoading &&
                                            devices.map((device) => {
                                                return (
                                                    <SelectItem
                                                        key={device.deviceId}
                                                        value={device.deviceId}
                                                    >
                                                        {device.deviceId}
                                                    </SelectItem>
                                                );
                                            })}
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button
                            type="submit"
                            onClick={() => {
                                !createDeploymentFormik.isValid &&
                                    toast.error("Please fill in all fields");
                            }}
                        >
                            Create
                        </Button>
                        <Button
                            type="button"
                            onClick={handleClose}
                            variant="destructive"
                        >
                            Cancel
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </CardLayout>
    );
}
