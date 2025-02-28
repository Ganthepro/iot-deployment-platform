export type ConfigurationResponseDto = {
    id: string;
    status: ConfigurationStatus;
    configurationId: string;
};

export enum ConfigurationStatus {
    NeverDeployed = "Never Deployed",
    Deployed = "Deployed",
}
