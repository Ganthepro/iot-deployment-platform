import { Badge } from "../ui/badge";
import { DeploymentResponseDto } from "@/dtos/deployment/deployment-response.dto";
import { useConfiguration } from "@/hooks/UseConfiguration";

export default function ModuleAccordion({
    configurationId,
}: DeploymentResponseDto) {
    const { modules, isModulesLoading } = useConfiguration(configurationId);

    return (
        <div className="flex flex-col divide-y-2">
            {!isModulesLoading &&
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
                })}
        </div>
    );
}
