export type ConfigurationResponseDto = {
    id: string;
    status: ConfigurationStatus;
    configurationId: string;
};

enum ConfigurationStatus {
    NeverDeployed = "Never Deployed",
    Deployed = "Deployed",
}
