/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import {
  Package,
  CheckCircle,
  Truck,
  XCircle,
  Users,
} from "lucide-react";
import DashboardCard from   "../../components/DashboardCard"

export default function Dashboard() {
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    fetch("/api/parcels/dashboard", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    })
      .then((res) => res.json())
      .then(setStats)
      .catch(console.error);
  }, []);

  if (!stats) return <p>Loading dashboard...</p>;

  let cards: any[] = [];

  if (stats.role === "admin") {
    cards = [
      { label: "Total Parcels", value: stats.totalParcels, icon: Package, color: "bg-blue-500" },
      { label: "Pending", value: stats.pendingParcels, icon: Truck, color: "bg-yellow-500" },
      { label: "Delivered", value: stats.deliveredParcels, icon: CheckCircle, color: "bg-green-500" },
      { label: "Cancelled", value: stats.cancelledParcels, icon: XCircle, color: "bg-red-500" },
      { label: "Active Users", value: stats.activeUsers, icon: Users, color: "bg-purple-500" },
    ];
  } else if (stats.role === "sender") {
    cards = [
      { label: "Parcels Sent", value: stats.totalParcels, icon: Package, color: "bg-blue-500" },
      { label: "Delivered", value: stats.deliveredParcels, icon: CheckCircle, color: "bg-green-500" },
      { label: "Cancelled", value: stats.cancelledParcels, icon: XCircle, color: "bg-red-500" },
    ];
  } else if (stats.role === "receiver") {
    cards = [
      { label: "Parcels Received", value: stats.totalParcels, icon: Package, color: "bg-blue-500" },
      { label: "Delivered", value: stats.deliveredParcels, icon: CheckCircle, color: "bg-green-500" },
      { label: "Pending", value: stats.pendingParcels, icon: Truck, color: "bg-yellow-500" },
    ];
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6 p-6">
      {cards.map((c) => (
        <DashboardCard key={c.label} {...c} />
      ))}
    </div>
  );
}
