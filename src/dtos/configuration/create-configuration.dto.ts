export type CreateConfigurationDto = {
    baseTemplateConfigurationId: string;
    configurationId: string;
    modules: ModuleDto[];
};

export type ModuleDto = {
    moduleId: Module;
    tag?: string;
};

export enum Module {
    RabbitMQ = "rabbitmq",
    Postgres = "postgres",
    DataLoggerAgent = "data-logger",
    IQASensorAgent = "iaq-sensor",
    API = "api",
}
