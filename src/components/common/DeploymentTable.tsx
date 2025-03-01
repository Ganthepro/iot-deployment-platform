import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { DeploymentStatus } from "@/dtos/deployment/deployment-response.dto";
import { useDeployment } from "@/hooks/useDeployment";
import { useState } from "react";
import ModuleCard from "./ModuleCard";

export default function DeploymentTable() {
    const { deployments, isDeploymentsLoading } = useDeployment();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedIds, setSelectedIds] = useState<{
        configurationId: string;
    } | null>(null);

    function handleModalOpen(configurationId: string) {
        setIsModalOpen(true);
        setSelectedIds({
            configurationId,
        });
    }

    return (
        <>
            {isModalOpen && selectedIds && (
                <ModuleCard
                    ids={{
                        configurationId: selectedIds.configurationId,
                    }}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Configuration Id</TableHead>
                        <TableHead>Device ID</TableHead>
                        <TableHead>Deploy At</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Modules</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="text-start">
                    {!isDeploymentsLoading ? (
                        deployments.map((deployment) => {
                            const date = new Date(deployment.createdAt);
                            const createdAt = date.toLocaleString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                                second: "2-digit",
                            });
                            const statusStyle =
                                deployment.status === DeploymentStatus.Success
                                    ? "text-green-500"
                                    : "text-red-500";
                            return (
                                <TableRow key={deployment.id}>
                                    <TableCell className="font-medium">
                                        {deployment.id}
                                    </TableCell>
                                    <TableCell>
                                        {deployment.configurationId}
                                    </TableCell>
                                    <TableCell>{deployment.deviceId}</TableCell>
                                    <TableCell>{createdAt}</TableCell>
                                    <TableCell className={statusStyle}>
                                        {deployment.status}
                                    </TableCell>
                                    <TableCell
                                        onClick={() =>
                                            handleModalOpen(
                                                deployment.configurationId,
                                            )
                                        }
                                        className="text-right cursor-pointer text-blue-500 hover:underline"
                                    >
                                        {"More >"}
                                    </TableCell>
                                </TableRow>
                            );
                        })
                    ) : (
                        <p>Loading...</p>
                    )}
                </TableBody>
            </Table>
        </>
    );
}
