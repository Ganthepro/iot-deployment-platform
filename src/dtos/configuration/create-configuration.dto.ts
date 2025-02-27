export type CreateConfigurationDto = {
    baseTemplatedeploymentId: string;
    modules: Module[];
};

type Module = {
    moduleId: string;
    tag?: string;
    status?: "running" | "stopped";
};
