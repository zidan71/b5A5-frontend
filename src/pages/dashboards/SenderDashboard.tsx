/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useAppSelector } from "../../hooks/useApp";
import {
  useCreateParcelMutation,
  useMyParcelsQuery,
  useCancelParcelMutation,
} from "../../features/parcels/parcelApi";
import { useGetAdminDashboardQuery } from "../../features/dashboardApi";
import toast from "react-hot-toast";
import Navbar from "../../components/layout/Navbar";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import Spinner from "../public/Spinner";
import SkeletonTable from "../public/SkeletonTable";

const parcelSchema = yup.object().shape({
  type: yup.string().required("Parcel type is required"),
  weight: yup
    .number()
    .typeError("Weight must be a number")
    .positive("Weight must be greater than 0")
    .required("Weight is required"),
  receiver: yup.string().required("Receiver ID is required"),
  address: yup.string().required("Delivery address is required"),
});

type ParcelFormValues = yup.InferType<typeof parcelSchema>;

export default function SenderDashboard() {
  const [selectedParcel, setSelectedParcel] = useState<any | null>(null);
  const [timelineOpen, setTimelineOpen] = useState(false);

  const handleViewTimeline = (parcel: any) => {
    setSelectedParcel(parcel);
    setTimelineOpen(true);
  };

  const auth = useAppSelector((state: any) => state.auth);

  const { data: stats, isLoading: loadingStats } = useGetAdminDashboardQuery();
  const { data: parcels, isLoading, refetch } = useMyParcelsQuery();
  const [createParcel, { isLoading: creating }] = useCreateParcelMutation();
  const [cancelParcel, { isLoading: cancelling }] = useCancelParcelMutation();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ParcelFormValues>({
    resolver: yupResolver(parcelSchema),
  });

  const onSubmit = async (data: ParcelFormValues) => {
    try {
      await createParcel({
        type: data.type,
        weight: data.weight,
        receiver: data.receiver,
        deliveryAddress: data.address,
      }).unwrap();

      toast.success("Parcel created!");
      reset();
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
    <div>
      <Navbar />

      <div className="p-6">
        <h1 className="text-2xl font-semibold mb-6">Sender Dashboard</h1>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          {loadingStats ? (
            <Spinner />) : (
            <>
              <div className="p-4 bg-white rounded shadow">
                <h2 className="font-medium">Parcels Sent</h2>
                <p className="text-2xl font-bold">{stats?.totalParcels || 0}</p>
              </div>
              <div className="p-4 bg-white rounded shadow">
                <h2 className="font-medium">Delivered</h2>
                <p className="text-2xl font-bold">
                  {stats?.deliveredParcels || 0}
                </p>
              </div>
              <div className="p-4 bg-white rounded shadow">
                <h2 className="font-medium">Cancelled</h2>
                <p className="text-2xl font-bold">
                  {stats?.cancelledParcels || 0}
                </p>
              </div>
            </>
          )}
        </div>

        {/* ✅ Create Parcel Form */}
        <div className="mb-10 p-4 bg-white rounded shadow">
          <h2 className="text-xl font-medium mb-4">Create New Parcel</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div>
              <input
                type="text"
                placeholder="Parcel Type"
                {...register("type")}
                className="w-full p-2 border rounded"
              />
              {errors.type && (
                <p className="text-red-500 text-sm">{errors.type.message}</p>
              )}
            </div>

            <div>
              <input
                type="number"
                placeholder="Weight (kg)"
                {...register("weight")}
                className="w-full p-2 border rounded"
              />
              {errors.weight && (
                <p className="text-red-500 text-sm">{errors.weight.message}</p>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="Receiver ID"
                {...register("receiver")}
                className="w-full p-2 border rounded"
              />
              {errors.receiver && (
                <p className="text-red-500 text-sm">
                  {errors.receiver.message}
                </p>
              )}
            </div>

            <div>
              <input
                type="text"
                placeholder="Delivery Address"
                {...register("address")}
                className="w-full p-2 border rounded"
              />
              {errors.address && (
                <p className="text-red-500 text-sm">{errors.address.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={creating}
              className="px-4 py-2 bg-blue-600 cursor-pointer text-white rounded hover:bg-blue-700 disabled:opacity-50"
            >
              {creating ? "Creating..." : "Create Parcel"}
            </button>
          </form>
        </div>

        {/* My Parcels */}
        <div className="p-4 bg-white rounded shadow overflow-x-auto">
          <h2 className="text-xl font-medium mb-4">My Parcels</h2>
          {isLoading ? (
           <SkeletonTable/>
          ) : parcels && parcels.length > 0 ? (
            <table className="w-full border border-gray-400">
              <thead>
                <tr className="bg-gray-200">
                  <th className="p-2">Tracking ID</th>
                  <th className="p-2">Type</th>
                  <th className="p-2">Weight</th>
                  <th className="p-2">Status</th>
                  <th className="p-2">Actions</th>
                  <th className="p-2">View</th>
                </tr>
              </thead>
              <tbody>
                {parcels.map((p: any) => (
                  <tr key={p._id} className="border-t text-center">
                    <td className="p-2">{p.trackingId}</td>
                    <td className="p-2">{p.type}</td>
                    <td className="p-2">{p.weight} kg</td>
                    <td className="p-2">{p.currentStatus}</td>
                    <td className="p-2">
                      {p.currentStatus === "Requested" ? (
                        <button
                          onClick={() => handleCancel(p._id)}
                          disabled={cancelling}
                          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 disabled:opacity-50"
                        >
                          {cancelling ? "Cancelling..." : "Cancel"}
                        </button>
                      ) : (
                        "-"
                      )}
                    </td>
                    <td className="p-2">
                      <button
                        onClick={() => handleViewTimeline(p)}
                        className="px-3 py-1 bg-blue-500 cursor-pointer text-white rounded hover:bg-blue-600"
                      >
                        View Timeline
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No parcels yet.</p>
          )}

          {/* ✅ Timeline Modal */}
          {timelineOpen && selectedParcel && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-200 bg-opacity-50 z-50">
              <div className="bg-white p-6 rounded shadow w-96 max-h-[80vh] overflow-y-auto">
                <h3 className="text-xl font-semibold mb-4">Parcel Timeline</h3>
                <ul className="space-y-2">
                  {selectedParcel.statusLog?.length > 0 ? (
                    selectedParcel.statusLog.map((log: any, idx: number) => (
                      <li key={idx} className="border-b pb-2">
                        <p>
                          <strong>Status:</strong> {log.status}
                        </p>
                        <p>
                          <strong>Time:</strong>{" "}
                          {new Date(log.timestamp).toLocaleString()}
                        </p>
                        {log.note && (
                          <p>
                            <strong>Note:</strong> {log.note}
                          </p>
                        )}
                        {log.updatedBy?.name && (
                          <p>
                            <strong>Updated By:</strong> {log.updatedBy.name}
                          </p>
                        )}
                      </li>
                    ))
                  ) : (
                    <p>No history available.</p>
                  )}
                </ul>
                <button
                  onClick={() => setTimelineOpen(false)}
                  className="mt-4 px-4 py-2 bg-gray-300 cursor-pointer rounded hover:bg-gray-400"
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
