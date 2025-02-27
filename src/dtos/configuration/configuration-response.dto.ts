export type ConfigurationResponseDto = {
    id: string;
    status: ConfigurationStatus;
};

enum ConfigurationStatus {
    NotDeployed = "notDeployed",
    Deployed = "deployed",
}
