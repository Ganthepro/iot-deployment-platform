import { Fragment } from "react/jsx-runtime";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

export default function ContainerCard() {
    return (
        <Fragment>
            <Card className={cn("w-[280px]")}>
                <CardHeader className="text-left space-y-4">
                    <div className="space-y-1">
                        <CardTitle>API</CardTitle>
                        <CardDescription>
                            tamtikorn.azurecr.io/api
                        </CardDescription>
                    </div>
                    <div className="flex flex-wrap gap-2 justify-start">
                        <Badge variant={"secondary"} className="w-fit">
                            v0.5
                        </Badge>
                        <Badge variant={"secondary"} className="w-fit">
                            v0.5
                        </Badge>
                        <Badge variant={"secondary"} className="w-fit">
                            v0.5
                        </Badge>
                        <Badge variant={"secondary"} className="w-fit">
                            v0.5
                        </Badge>
                        <Badge variant={"secondary"} className="w-fit">
                            v0.5
                        </Badge>
                    </div>
                </CardHeader>
            </Card>
        </Fragment>
    );
}
