/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";
import { useLazyTrackParcelQuery } from "../../features/parcels/parcelApi";
import toast from "react-hot-toast";

export default function TrackParcelPage() {
  const [trackingId, setTrackingId] = useState("");
  const [trackParcel, { data, isFetching }] = useLazyTrackParcelQuery();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) return toast.error("Please enter a tracking ID");

    try {
      await trackParcel(trackingId).unwrap();
    } catch (err: any) {
      toast.error(err?.data?.message || "Parcel not found");
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-gray-300  rounded shadow">
      <h2 className="text-2xl font-semibold mb-4 text-center">Track Parcel</h2>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          type="text"
          placeholder="Enter Tracking ID"
          value={trackingId}
          onChange={(e) => setTrackingId(e.target.value)}
          className="flex-1 p-2 border rounded"
        />
        <button
          type="submit"
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          disabled={isFetching}
        >
          {isFetching ? "Tracking..." : "Track"}
        </button>
      </form>

      {data && (
        <div className="mt-4 border-t pt-4">
          <h3 className="text-xl font-medium mb-2">Parcel Details</h3>
          <p><strong>Tracking ID:</strong> {data.trackingId}</p>
          <p><strong>Current Status:</strong> {data.currentStatus}</p>

          <h4 className="text-lg font-semibold mt-4">Status Log</h4>
          {data.statusLog && data.statusLog.length > 0 ? (
            <ul className="list-disc pl-6">
              {data.statusLog.map((log: any) => (
                <li key={log._id}>
                  <strong>{log.status}</strong> at {new Date(log.timestamp).toLocaleString()} 
                  {log.note ? ` - Note: ${log.note}` : ""}
                </li>
              ))}
            </ul>
          ) : <p>No status updates yet.</p>}
        </div>
      )}
    </div>
  );
}
