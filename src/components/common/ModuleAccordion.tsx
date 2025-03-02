import { Badge } from "../ui/badge";
import { useConfiguration } from "@/hooks/useConfiguration";

interface ModuleAccordionProps {
    configurationId: string;
    id: string;
    deviceId: string;
}

export default function ModuleAccordion({
    configurationId,
    id,
    deviceId,
}: Partial<ModuleAccordionProps>) {
    const { modules, isModulesLoading } = useConfiguration(
        configurationId,
        id,
        deviceId,
    );

    return (
        <div className="flex flex-col divide-y-2">
            {!isModulesLoading ? (
                modules.length > 0 ? (
                    modules.map((module) => {
                        return (
                            <div
                                key={module.moduleId}
                                className="flex justify-between py-2"
                            >
                                <h6>{module.moduleId}</h6>
                                {module.tag && <Badge>{module.tag}</Badge>}
                            </div>
                        );
                    })
                ) : (
                    <div className="text-red-500">No modules</div>
                )
            ) : (
                <div>Loading...</div>
            )}
        </div>
    );
}
