import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useConfiguration } from "@/hooks/useConfiguration";
import { useState } from "react";
import ModuleCard from "./ModuleCard";
import { ConfigurationStatus } from "@/dtos/configuration/configuration-response.dto";

export default function ConfigurationTable() {
    const { configurations, isConfigurationsLoading } = useConfiguration();
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
                        <TableHead>Configuration ID</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead className="text-right">Modules</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody className="text-start">
                    {!isConfigurationsLoading ? (
                        configurations.map((configuration) => {
                            const statusStyle =
                                configuration.status ===
                                ConfigurationStatus.Deployed
                                    ? "text-green-500"
                                    : "text-red-500";
                            return (
                                <TableRow key={configuration.id}>
                                    <TableCell className="font-medium">
                                        {configuration.id}
                                    </TableCell>
                                    <TableCell>
                                        {configuration.configurationId}
                                    </TableCell>
                                    <TableCell className={statusStyle}>
                                        {configuration.status}
                                    </TableCell>
                                    <TableCell
                                        onClick={() =>
                                            handleModalOpen(
                                                configuration.configurationId,
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
