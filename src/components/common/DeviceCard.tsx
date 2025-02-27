import { Fragment } from "react/jsx-runtime";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function DeviceCard() {
  return (
    <Fragment>
      <Card className={cn("w-[380px]")}>
        <CardHeader className="text-left">
          <CardTitle className="">Building A</CardTitle>
          <CardDescription>Device</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </Fragment>
  );
}
