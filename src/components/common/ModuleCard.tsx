import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useConfiguration } from "@/hooks/useConfiguration";
import { Badge } from "../ui/badge";
import CardLayout from "@/layouts/CardLayout";
import { Button } from "../ui/button";
import { cn } from "@/lib/utils";

interface ModuleCardProps {
    ids: {
        configurationId: string;
    };
    onClose: () => void;
}

export default function ModuleCard({ ids, onClose }: ModuleCardProps) {
    const { modules, isModulesLoading } = useConfiguration(ids.configurationId);

    return (
        <CardLayout>
            <Card className={cn("w-[300px]")}>
                <CardHeader>
                    <CardTitle>Modules</CardTitle>
                    <CardDescription>{ids.configurationId}</CardDescription>
                </CardHeader>
                <CardContent>
                    {!isModulesLoading ? (
                        modules.map((module) => {
                            return (
                                <div
                                    key={module.moduleId}
                                    className="flex justify-between py-2"
                                >
                                    <h6>{module.moduleId}</h6>
                                    {module.tag && <Badge>{module.tag}</Badge>}
                                </div>
                            );
                        })
                    ) : (
                        <p>Loading...</p>
                    )}
                </CardContent>
                <CardFooter className="justify-center">
                    <Button onClick={onClose} variant={"destructive"}>
                        Close
                    </Button>
                </CardFooter>
            </Card>
        </CardLayout>
    );
}
