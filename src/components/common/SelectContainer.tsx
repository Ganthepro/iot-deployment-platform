import {
    Module,
    ModuleDto,
} from "@/dtos/configuration/create-configuration.dto";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../ui/select";
import SelectTag from "./SelectTag";
import { useState } from "react";
import { Button } from "../ui/button";

interface SelectContainerProps {
    modules: (ModuleDto | null)[];
    index: number;
    handleModuleChange: (index: number, module: ModuleDto) => void;
    handleRemoveModule: (index: number) => void;
    handleTagChange: (index: number, tag: string) => void;
}

export default function SelectContainer({
    modules,
    index,
    handleModuleChange,
    handleRemoveModule,
    handleTagChange,
}: SelectContainerProps) {
    const [moduleId, setModuleId] = useState<Module | null>(null);

    function getRemainingModules() {
        const selectedModules = modules
            .filter((m) => m !== null)
            .map((m) => m?.moduleId);
        const filtered = Object.values(Module).filter(
            (m) => !selectedModules.includes(m),
        );
        if (moduleId) {
            filtered.push(moduleId);
        }
        return filtered;
    }

    function handleTag(tag: string) {
        handleTagChange(index, tag);
    }

    return (
        <div className="py-2 flex gap-2" key={index}>
            <Select
                key={index}
                onValueChange={(value) => {
                    setModuleId(value as Module);
                    handleModuleChange(index, {
                        moduleId: value as Module,
                    });
                }}
            >
                <SelectTrigger>
                    <SelectValue placeholder="Select a Module" />
                </SelectTrigger>
                <SelectContent>
                    {getRemainingModules().map((m) => {
                        return (
                            <SelectItem key={m} value={m}>
                                {m}
                            </SelectItem>
                        );
                    })}
                </SelectContent>
            </Select>
            {moduleId &&
                [
                    Module.API,
                    Module.DataLoggerAgent,
                    Module.IQASensorAgent,
                ].includes(moduleId) && (
                    <SelectTag
                        repositoryName={moduleId}
                        handleTag={handleTag}
                    />
                )}
            <Button variant="outline" onClick={() => handleRemoveModule(index)}>
                Remove
            </Button>
        </div>
    );
}
