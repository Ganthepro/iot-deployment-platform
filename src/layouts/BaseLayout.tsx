import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import CreateDeploymentCard from "@/components/common/CreateDeploymentCard";
import CreateConfigurationCard from "@/components/common/CreateConfigurationCard";

export const BaseLayout = () => {
    const [showCreateBtn, setShowCreBtn] = useState(false);
    const [isCreateDeploymentOpen, setIsCreateDeploymentOpen] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const prefix = toUpperPrefix(location.pathname.split("/")[1]);

    function handleSelectChange(value: string) {
        navigate(value);
    }

    function handleCreateDeployment() {
        setIsCreateDeploymentOpen(true);
    }

    function toUpperPrefix(str: string) {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    useEffect(() => {
        document.title = `Dashboard - ${prefix}`;
        setShowCreBtn(prefix === "Deployment" || prefix === "Configuration");
    }, [prefix]);

    return (
        <div className="flex flex-col w-full space-y-4">
            <div className="flex justify-between items-center">
                <Select
                    defaultValue={`/${prefix}`}
                    onValueChange={handleSelectChange}
                >
                    <SelectTrigger className="w-[200px] border-none shadow-none text-2xl font-bold">
                        <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent className="text-2xl">
                        <SelectItem value="/">Home</SelectItem>
                        <SelectItem value="/deployment">Deployments</SelectItem>
                        <SelectItem value="/configuration">
                            Configuration
                        </SelectItem>
                    </SelectContent>
                </Select>
                {showCreateBtn && (
                    <Button onClick={handleCreateDeployment} variant="outline">
                        {`Create ${toUpperPrefix(prefix)}`}
                    </Button>
                )}
                {isCreateDeploymentOpen &&
                    (prefix === "Deployment" ? (
                        <CreateDeploymentCard
                            onClose={() => setIsCreateDeploymentOpen(false)}
                        />
                    ) : (
                        <CreateConfigurationCard
                            onClose={() => setIsCreateDeploymentOpen(false)}
                        />
                    ))}
            </div>
            <hr />
            <Outlet />
        </div>
    );
};
