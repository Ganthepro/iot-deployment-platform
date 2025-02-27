export type DeploymentResponseDto = {
    deviceId: string;
    configurationId: string;
    status: DeploymentStatus;
    isLatest: boolean;
    createdAt: string;
};

enum DeploymentStatus {
    Success = "Success",
    Failure = "Failure",
}
