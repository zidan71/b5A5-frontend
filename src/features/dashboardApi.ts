/* eslint-disable @typescript-eslint/no-explicit-any */
// src/features/dashboard/dashboardApi.ts
import { apiSlice } from "../app/api";

export const dashboardApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAdminDashboard: builder.query<any, void>({
      query: () => "/users/dashboard",
      providesTags: ["Dashboard"],
    }),
  }),
});

export const { useGetAdminDashboardQuery } = dashboardApi; // 

