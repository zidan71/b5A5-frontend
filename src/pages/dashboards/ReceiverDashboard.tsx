/* eslint-disable @typescript-eslint/no-explicit-any */
import { useGetAdminDashboardQuery} from "../../features/dashboardApi";
import { useIncomingParcelsQuery, useDeliveredParcelsQuery, useConfirmParcelDeliveryMutation } from "../../features/parcels/parcelApi";
import toast from "react-hot-toast";

export default function ReceiverDashboard() {
  // Unified dashboard stats
  const { data: stats, isLoading: loadingStats } = useGetAdminDashboardQuery();

  // Receiver-specific parcels
  const { data: incoming, isLoading: loadingIncoming, refetch: refetchIncoming } = useIncomingParcelsQuery();
  const { data: delivered, isLoading: loadingDelivered, refetch: refetchDelivered } = useDeliveredParcelsQuery();
  const [confirmDelivery] = useConfirmParcelDeliveryMutation();

  const handleConfirm = async (id: string) => {
    try {
      await confirmDelivery(id).unwrap();
      toast.success("Delivery confirmed!");
      refetchIncoming();
      refetchDelivered();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to confirm delivery");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Receiver Dashboard</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {loadingStats ? (
          <p>Loading stats...</p>
        ) : (
          <>
            <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
              <h2 className="font-medium">Parcels Received</h2>
              <p className="text-2xl font-bold">{stats?.totalParcels || 0}</p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
              <h2 className="font-medium">Delivered</h2>
              <p className="text-2xl font-bold">{stats?.deliveredParcels || 0}</p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
              <h2 className="font-medium">Pending</h2>
              <p className="text-2xl font-bold">{stats?.pendingParcels || 0}</p>
            </div>
          </>
        )}
      </div>

      {/* Incoming Parcels */}
      <div className="mb-10 p-4 bg-white dark:bg-gray-800 rounded shadow">
        <h2 className="text-xl font-medium mb-4">Incoming Parcels</h2>
        {loadingIncoming ? <p>Loading...</p> : Array.isArray(incoming) && incoming.length > 0 ? (
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="p-2">Tracking ID</th>
                <th className="p-2">Sender</th>
                <th className="p-2">Type</th>
                <th className="p-2">Weight</th>
                <th className="p-2">Status</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {incoming.map((p: any) => (
                <tr key={p._id} className="border-t">
                  <td className="p-2">{p.trackingId}</td>
                  <td className="p-2">{p.sender.name}</td>
                  <td className="p-2">{p.type}</td>
                  <td className="p-2">{p.weight} kg</td>
                  <td className="p-2">{p.currentStatus}</td>
                  <td className="p-2">
                    {p.currentStatus !== "Delivered" ? (
                      <button
                        onClick={() => handleConfirm(p._id)}
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Confirm Delivery
                      </button>
                    ) : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : <p>No incoming parcels.</p>}
      </div>

      {/* Delivered Parcels */}
      <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
        <h2 className="text-xl font-medium mb-4">Delivery History</h2>
        {loadingDelivered ? <p>Loading...</p> : Array.isArray(delivered) && delivered.length > 0 ? (
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="p-2">Tracking ID</th>
                <th className="p-2">Sender</th>
                <th className="p-2">Type</th>
                <th className="p-2">Weight</th>
                <th className="p-2">Status</th>
              </tr>
            </thead>
            <tbody>
              {delivered.map((p: any) => (
                <tr key={p._id} className="border-t">
                  <td className="p-2">{p.trackingId}</td>
                  <td className="p-2">{p.sender.name}</td>
                  <td className="p-2">{p.type}</td>
                  <td className="p-2">{p.weight} kg</td>
                  <td className="p-2">{p.currentStatus}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : <p>No delivered parcels yet.</p>}
      </div>
    </div>
  );
}
