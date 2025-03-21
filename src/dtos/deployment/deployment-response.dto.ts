export type DeploymentResponseDto = {
    id: string;
    deviceId: string[];
    configurationId: string;
    status: DeploymentStatus;
    isLatest: boolean;
    createdAt: string;
    message?: string;
};

export enum DeploymentStatus {
    Success = "Success",
    Failure = "Failure",
}
