/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useGetAdminDashboardQuery } from "../../features/dashboardApi";
import { useIncomingParcelsQuery, useDeliveredParcelsQuery, useConfirmParcelDeliveryMutation } from "../../features/parcels/parcelApi";
import toast from "react-hot-toast";
import Navbar from "../../components/layout/Navbar";
import Spinner from "../public/Spinner";
import SkeletonTable from "../public/SkeletonTable";

export default function ReceiverDashboard() {


  const [selectedParcel, setSelectedParcel] = useState<any | null>(null);
  const [timelineOpen, setTimelineOpen] = useState(false);


const handleViewTimeline = (parcel: any) => {
    setSelectedParcel(parcel);
    setTimelineOpen(true);
  };

  const { data: stats, isLoading: loadingStats } = useGetAdminDashboardQuery();

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
    <div>

      <Navbar></Navbar>

    <div className="p-6">


      <h1 className="text-2xl font-semibold mb-6">Receiver Dashboard</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {loadingStats ? (
            <Spinner />
        ) : (
          <>
            <div className="p-4 bg-white  rounded shadow">
              <h2 className="font-medium">Parcels Received</h2>
              <p className="text-2xl font-bold">{stats?.totalParcels || 0}</p>
            </div>
            <div className="p-4 bg-white  rounded shadow">
              <h2 className="font-medium">Delivered</h2>
              <p className="text-2xl font-bold">{stats?.deliveredParcels || 0}</p>
            </div>
            <div className="p-4 bg-white  rounded shadow">
              <h2 className="font-medium">Pending</h2>
              <p className="text-2xl font-bold">{stats?.pendingParcels || 0}</p>
            </div>
          </>
        )}
      </div>

      {/* Incoming Parcels */}
      <div className="mb-10 p-4 bg-white  rounded shadow">
        <h2 className="text-xl font-medium mb-4">Incoming Parcels</h2>
        {loadingIncoming ?   <Spinner />: Array.isArray(incoming) && incoming.length > 0 ? (
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200 ">
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
                <tr key={p._id} className="border-t text-center">
                  <td className="p-2">{p.trackingId}</td>
                  <td className="p-2">{p.sender.name}</td>
                  <td className="p-2">{p.type}</td>
                  <td className="p-2">{p.weight} kg</td>
                  <td className="p-2">{p.currentStatus}</td>
                  <td className="p-2">
                    {p.currentStatus !== "Delivered" ? (
                      <button
                        onClick={() => handleConfirm(p._id)}
                        className="px-3 py-1 cursor-pointer bg-green-500 text-white rounded hover:bg-green-600"
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
      <div className="p-4 bg-white  rounded shadow overflow-x-auto">
        <h2 className="text-xl font-medium mb-4">Delivery History</h2>
        {loadingDelivered ?   <SkeletonTable/> : Array.isArray(delivered) && delivered.length > 0 ? (
          <table className="w-full border border-gray-300">
            <thead>
              <tr className="bg-gray-200 ">
                <th className="p-2">Tracking ID</th>
                <th className="p-2">Sender</th>
                <th className="p-2">Type</th>
                <th className="p-2">Weight</th>
                <th className="p-2">Status</th>
                <th className="p-2">View</th>
              </tr>
            </thead>
            <tbody>
              {delivered.map((p: any) => (
                <tr key={p._id} className="border-t text-center">
                  <td className="p-2">{p.trackingId}</td>
                  <td className="p-2">{p.sender.name}</td>
                  <td className="p-2">{p.type}</td>
                  <td className="p-2">{p.weight} kg</td>
                  <td className="p-2">{p.currentStatus}</td>

                <td className="p-2">
                    <button
                      onClick={() => handleViewTimeline(p)}
                      className="px-3 py-1 bg-blue-500 text-white rounded cursor-pointer hover:bg-blue-600"
                    >
                      View Timeline
                    </button>
                  </td>

                </tr>
              ))}
            </tbody>
          </table>
        ) : <p>No delivered parcels yet.</p>}

   {timelineOpen && selectedParcel && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50 z-50">
          <div className="bg-white  p-6 rounded shadow w-96 max-h-[80vh] overflow-y-auto">
            <h3 className="text-xl font-semibold mb-4">Parcel Timeline</h3>
            <ul className="space-y-2">
              {selectedParcel.statusLog?.length > 0 ? (
                selectedParcel.statusLog.map((log: any, idx: number) => (
                  <li key={idx} className="border-b pb-2">
                    <p><strong>Status:</strong> {log.status}</p>
                    <p><strong>Time:</strong> {new Date(log.timestamp).toLocaleString()}</p>
                    {log.note && <p><strong>Note:</strong> {log.note}</p>}
                    {log.updatedBy?.name && <p><strong>Updated By:</strong> {log.updatedBy.name}</p>}
                  </li>
                ))
              ) : (
                <p>No history available.</p>
              )}
            </ul>
            <button
              onClick={() => setTimelineOpen(false)}
              className="mt-4 px-4 py-2 cursor-pointer bg-gray-300 dark:bg-gray-700 rounded hover:bg-gray-400"
            >
              Close
            </button>
          </div>
        </div>
      )}

      </div>
    </div>
    </div>
  );
}
