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

export const BaseLayout = () => {
  const [showCreateDeploymentBtn, setShowCreateDeploymentBtn] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const prefix = location.pathname.split("/")[1];

  function handleSelectChange(value: string) {
    navigate(value);
  }

  useEffect(() => {
    document.title = `Dashboard - ${prefix}`;
    setShowCreateDeploymentBtn(prefix === "deployment");
  }, [prefix]);

  return (
    <div className="flex flex-col w-full space-y-4">
      <div className="flex justify-between items-center">
        <Select defaultValue={`/${prefix}`} onValueChange={handleSelectChange}>
          <SelectTrigger className="w-[200px] border-none shadow-none text-2xl font-bold">
            <SelectValue placeholder="Theme" />
          </SelectTrigger>
          <SelectContent className="text-2xl">
            <SelectItem value="/">Home</SelectItem>
            <SelectItem value="/deployment">Deployments</SelectItem>
            <SelectItem value="/container">Containers</SelectItem>
          </SelectContent>
        </Select>
        {showCreateDeploymentBtn && (
          <Button variant="outline">Create Deployment</Button>
        )}
      </div>
      <hr />
      <Outlet />
    </div>
  );
};
