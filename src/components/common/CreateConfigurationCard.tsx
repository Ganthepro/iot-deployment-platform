import CardLayout from "@/layouts/CardLayout";
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "../ui/card";
import { cn } from "@/lib/utils";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { useState } from "react";
import {
    CreateConfigurationDto,
    ModuleDto,
} from "@/dtos/configuration/create-configuration.dto";
import SelectContainer from "./SelectContainer";
import { toast } from "sonner";
import { useConfiguration } from "@/hooks/useConfiguration";
import { useFormik } from "formik";
import {
    CreateConfigurationValidationSchema,
    CreateConfigurationValues,
    emptyCreateConfigurationValues,
} from "@/formik/create-configuration.formik";

interface CreateConfigurationCardProps {
    onClose: () => void;
}

export default function CreateConfigurationCard({
    onClose,
}: CreateConfigurationCardProps) {
    const [modules, setModules] = useState<(ModuleDto | null)[]>([]);
    const { createConfiguration } = useConfiguration();

    async function handleSubmit(values: CreateConfigurationDto) {
        try {
            await createConfiguration.mutateAsync(values);
            onClose();
            return;
        } catch (error) {
            console.error(error);
        }
    }

    const createConfigurationFormik = useFormik<CreateConfigurationValues>({
        initialValues: {
            ...emptyCreateConfigurationValues,
        },
        initialErrors: {
            ...emptyCreateConfigurationValues,
        },
        validateOnChange: true,
        enableReinitialize: true,
        validationSchema: CreateConfigurationValidationSchema,
        onSubmit: handleSubmit,
    });

    function handleAddModule() {
        if (modules.length === 5) {
            toast.error("Cannot add more than 5 modules");
            return;
        }
        setModules([...modules, null]);
    }

    function handleModuleChange(index: number, module: ModuleDto) {
        const newModules = [...modules];
        newModules[index] = module;
        setModules(newModules);
        createConfigurationFormik.setFieldValue("modules", newModules);
    }

    function handleRemoveModule(index: number) {
        const newModules = [...modules];
        newModules.splice(index, 1);
        setModules(newModules);
        createConfigurationFormik.setFieldValue("modules", newModules);
    }

    function handleTagChange(index: number, tag: string) {
        const newModules = [...modules];
        newModules[index] = {
            ...newModules[index]!,
            tag,
        };
        setModules(newModules);
        createConfigurationFormik.setFieldValue("modules", newModules);
    }

    return (
        <CardLayout>
            <Card className={cn("w-[380px]")}>
                <form onSubmit={createConfigurationFormik.handleSubmit}>
                    <CardHeader>
                        <CardTitle>Create Configuration</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-4">
                        <div className="gap-2 flex flex-col">
                            <Label
                                htmlFor="base-template"
                                className="self-start"
                            >
                                Base-Template Configuration ID
                            </Label>
                            <Input
                                id="base-template"
                                placeholder="Enter Base-Template Configuration Id"
                                onChange={(e) => {
                                    createConfigurationFormik.setFieldValue(
                                        "baseTemplateConfigurationId",
                                        e.target.value,
                                    );
                                }}
                            />
                        </div>
                        <div className="gap-2 flex flex-col">
                            <Label
                                htmlFor="configuration-id"
                                className="self-start"
                            >
                                Configuration ID
                            </Label>
                            <Input
                                id="configuration-id"
                                placeholder="Enter Configuration Id"
                                onChange={(e) => {
                                    createConfigurationFormik.setFieldValue(
                                        "configurationId",
                                        e.target.value,
                                    );
                                }}
                            />
                        </div>
                        <div className="gap-2 flex flex-col">
                            <Label className="self-start">Modules</Label>
                            <div className="divide-y-2">
                                {modules.map((_, index) => {
                                    return (
                                        <SelectContainer
                                            modules={modules}
                                            index={index}
                                            handleRemoveModule={
                                                handleRemoveModule
                                            }
                                            handleModuleChange={
                                                handleModuleChange
                                            }
                                            handleTagChange={handleTagChange}
                                        />
                                    );
                                })}
                            </div>
                            {modules.length < 5 && (
                                <Button
                                    variant="outline"
                                    onClick={handleAddModule}
                                >
                                    + Add Module
                                </Button>
                            )}
                        </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                        <Button
                            type="submit"
                            onClick={() => {
                                !createConfigurationFormik.isValid &&
                                    toast.error("Please fill in all fields");
                            }}
                        >
                            Create
                        </Button>
                        <Button
                            type="button"
                            variant="destructive"
                            onClick={onClose}
                        >
                            Close
                        </Button>
                    </CardFooter>
                </form>
            </Card>
        </CardLayout>
    );
}
