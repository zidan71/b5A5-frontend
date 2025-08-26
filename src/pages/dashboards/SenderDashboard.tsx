/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useAppSelector } from "../../hooks/useApp";
import { useCreateParcelMutation, useMyParcelsQuery, useCancelParcelMutation } from "../../features/parcels/parcelApi";
import { useGetAdminDashboardQuery } from "../../features/dashboardApi";
import toast from "react-hot-toast";

export default function SenderDashboard() {
  const auth = useAppSelector((state: any) => state.auth);

  // Unified dashboard stats
  const { data: stats, isLoading: loadingStats } = useGetAdminDashboardQuery();

  // Sender-specific parcels
  const { data: parcels, isLoading, refetch } = useMyParcelsQuery();
  const [createParcel] = useCreateParcelMutation();
  const [cancelParcel] = useCancelParcelMutation();

  // Form state
  const [type, setType] = useState("");
  const [weight, setWeight] = useState("");
  const [receiver, setReceiver] = useState("");
  const [address, setAddress] = useState("");

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createParcel({
        type,
        weight: parseFloat(weight),
        receiver,
        deliveryAddress: address,
      }).unwrap();
      toast.success("Parcel created!");
      setType(""); setWeight(""); setReceiver(""); setAddress("");
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to create parcel");
    }
  };

  const handleCancel = async (id: string) => {
    try {
      await cancelParcel(id).unwrap();
      toast.success("Parcel cancelled!");
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to cancel parcel");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">Sender Dashboard</h1>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        {loadingStats ? (
          <p>Loading stats...</p>
        ) : (
          <>
            <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
              <h2 className="font-medium">Parcels Sent</h2>
              <p className="text-2xl font-bold">{stats?.totalParcels || 0}</p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
              <h2 className="font-medium">Delivered</h2>
              <p className="text-2xl font-bold">{stats?.deliveredParcels || 0}</p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
              <h2 className="font-medium">Cancelled</h2>
              <p className="text-2xl font-bold">{stats?.cancelledParcels || 0}</p>
            </div>
          </>
        )}
      </div>

      {/* Create Parcel Form */}
      <div className="mb-10 p-4 bg-white dark:bg-gray-800 rounded shadow">
        <h2 className="text-xl font-medium mb-4">Create New Parcel</h2>
        <form onSubmit={handleCreate} className="space-y-3">
          <input
            type="text"
            placeholder="Parcel Type"
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="number"
            placeholder="Weight (kg)"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Receiver ID"
            value={receiver}
            onChange={(e) => setReceiver(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <input
            type="text"
            placeholder="Delivery Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Create Parcel
          </button>
        </form>
      </div>

      {/* My Parcels */}
      <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
        <h2 className="text-xl font-medium mb-4">My Parcels</h2>
        {isLoading ? (
          <p>Loading...</p>
        ) : parcels && parcels.length > 0 ? (
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="p-2">Tracking ID</th>
                <th className="p-2">Type</th>
                <th className="p-2">Weight</th>
                <th className="p-2">Status</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((p: any) => (
                <tr key={p._id} className="border-t">
                  <td className="p-2">{p.trackingId}</td>
                  <td className="p-2">{p.type}</td>
                  <td className="p-2">{p.weight} kg</td>
                  <td className="p-2">{p.currentStatus}</td>
                  <td className="p-2">
                    {p.currentStatus === "Requested" ? (
                      <button
                        onClick={() => handleCancel(p._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Cancel
                      </button>
                    ) : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No parcels yet.</p>
        )}
      </div>
    </div>
  );
}
