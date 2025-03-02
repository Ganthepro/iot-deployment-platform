export type ConfigurationResponseDto = {
    id: string;
    status: ConfigurationStatus;
    configurationId: string;
};

export enum ConfigurationStatus {
    Undeployed = "Undeployed",
    Deployed = "Deployed",
}
