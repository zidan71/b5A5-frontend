/* eslint-disable @typescript-eslint/no-explicit-any */
import toast from "react-hot-toast";
import {
  useGetAllUsersQuery,
  useBlockUserMutation,
  useUnblockUserMutation,
} from "../../features/users/userApi";
import {
  useAllParcelsQuery,
  useUpdateParcelStatusMutation,
} from "../../features/parcels/parcelApi";
import { useGetAdminDashboardQuery } from "../../features/dashboardApi";
import { BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell, } from "recharts";

  const COLORS = ["#3b82f6", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];


  


export default function AdminDashboard() {
  // Dashboard stats
  const { data: stats, isLoading: loadingStats } = useGetAdminDashboardQuery();

  // Users
  const {
    data: users,
    refetch: refetchUsers,
    isLoading: loadingUsers,
  } = useGetAllUsersQuery();
  const [blockUser] = useBlockUserMutation();
  const [unblockUser] = useUnblockUserMutation();

  // Parcels
  const { data: parcels, refetch: refetchParcels, isLoading: loadingParcels } =
    useAllParcelsQuery();
  const [updateParcelStatus] = useUpdateParcelStatusMutation();

  // Handlers
  const handleBlockUser = async (id: string) => {
    try {
      await blockUser(id).unwrap();
      toast.success("User blocked!");
      refetchUsers();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to block user");
    }
  };

  const handleUnblockUser = async (id: string) => {
    try {
      await unblockUser(id).unwrap();
      toast.success("User unblocked!");
      refetchUsers();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to unblock user");
    }
  };

  const handleUpdateParcelStatus = async (id: string, status: string) => {
    try {
      await updateParcelStatus({ id, status }).unwrap();
      toast.success("Parcel status updated!");
      refetchParcels();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed to update parcel");
    }
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-semibold">Admin Dashboard</h1>

      {/* Dashboard Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {loadingStats ? (
          <p>Loading stats...</p>
        ) : stats ? (
          <>
            <div className="p-4 bg-white dark:bg-gray-800 rounded shadow text-center">
              <p className="text-gray-500">Total Parcels</p>
              <p className="text-2xl font-bold">{stats.totalParcels}</p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 rounded shadow text-center">
              <p className="text-gray-500">Pending</p>
              <p className="text-2xl font-bold">{stats.pendingParcels}</p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 rounded shadow text-center">
              <p className="text-gray-500">Delivered</p>
              <p className="text-2xl font-bold">{stats.deliveredParcels}</p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 rounded shadow text-center">
              <p className="text-gray-500">Cancelled</p>
              <p className="text-2xl font-bold">{stats.cancelledParcels}</p>
            </div>
            <div className="p-4 bg-white dark:bg-gray-800 rounded shadow text-center">
              <p className="text-gray-500">Active Users</p>
              <p className="text-2xl font-bold">{stats.activeUsers}</p>
            </div>
          </>
        ) : null}
      </div>

{/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
        {/* Monthly Shipments */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Monthly Shipments</h2>
          {stats?.monthlyTrend && stats.monthlyTrend.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={stats.monthlyTrend}>
                <XAxis
                  dataKey="_id.month"
                  tickFormatter={(m) => `M${m}`}
                />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p>No trend data available.</p>
          )}
        </div>



        {/* Status Distribution */}
        <div className="bg-white dark:bg-gray-800 p-4 rounded shadow">
          <h2 className="text-lg font-semibold mb-4">Parcel Status Distribution</h2>
          {stats?.statusDistribution && stats.statusDistribution.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stats.statusDistribution}
                  dataKey="count"
                  nameKey="_id"
                  outerRadius={120}
                  label
                >
                  {stats.statusDistribution.map((_: any, index: number) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p>No distribution data available.</p>
          )}
        </div>
      </div>


      {/* Users Management */}
      <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
        <h2 className="text-xl font-medium mb-4">Users</h2>
        {loadingUsers ? (
          <p>Loading users...</p>
        ) : users && users.length > 0 ? (
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Role</th>
                <th className="p-2">Blocked</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u: any) => (
                <tr key={u._id} className="border-t">
                  <td className="p-2">{u.name}</td>
                  <td className="p-2">{u.email}</td>
                  <td className="p-2">{u.role}</td>
                  <td className="p-2">{u.isBlocked ? "Yes" : "No"}</td>
                  <td className="p-2 space-x-2">
                    {u.isBlocked ? (
                      <button
                        onClick={() => handleUnblockUser(u._id)}
                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                      >
                        Unblock
                      </button>
                    ) : (
                      <button
                        onClick={() => handleBlockUser(u._id)}
                        className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                      >
                        Block
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No users found.</p>
        )}
      </div>

      {/* Parcels Management */}
      <div className="p-4 bg-white dark:bg-gray-800 rounded shadow">
        <h2 className="text-xl font-medium mb-4">Parcels</h2>
        {loadingParcels ? (
          <p>Loading parcels...</p>
        ) : parcels && parcels.length > 0 ? (
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200 dark:bg-gray-700">
                <th className="p-2">Tracking ID</th>
                <th className="p-2">Sender</th>
                <th className="p-2">Receiver</th>
                <th className="p-2">Status</th>
                <th className="p-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((p: any) => (
                <tr key={p._id} className="border-t">
                  <td className="p-2">{p.trackingId}</td>
                  <td className="p-2">{p.sender.name}</td>
                  <td className="p-2">{p.receiver.name}</td>
                  <td className="p-2">{p.currentStatus}</td>
                  <td className="p-2">
                    <select
                      value={p.currentStatus}
                      onChange={(e) =>
                        handleUpdateParcelStatus(p._id, e.target.value)
                      }
                      className="p-1 border rounded"
                    >
                      {[
                        "Requested",
                        "Approved",
                        "Dispatched",
                        "In Transit",
                        "Delivered",
                        "Cancelled",
                      ].map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No parcels found.</p>
        )}
      </div>
    </div>
  );
}
