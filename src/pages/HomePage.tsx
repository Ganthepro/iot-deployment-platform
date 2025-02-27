import DeviceCard from "@/components/common/DeviceCard";

export default function HomePage() {
  return (
    <div className="flex flex-wrap gap-4">
      <DeviceCard />
      <DeviceCard />
      <DeviceCard />
      <DeviceCard />
    </div>
  );
}
