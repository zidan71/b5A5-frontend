import type { LucideIcon } from "lucide-react";

interface CardProps {
  label: string;
  value: number;
  icon: LucideIcon;
  color: string;
}

export default function DashboardCard({ label, value, icon: Icon, color }: CardProps) {
  return (
    <div className="flex items-center p-4 bg-white dark:bg-gray-800 rounded-2xl shadow">
      <div className={`${color} p-3 rounded-full text-white`}>
        <Icon size={24} />
      </div>
      <div className="ml-4">
        <p className="text-gray-500">{label}</p>
        <p className="text-xl font-bold">{value}</p>
      </div>
    </div>
  );
}
