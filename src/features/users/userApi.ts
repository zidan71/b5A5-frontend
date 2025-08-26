/* eslint-disable @typescript-eslint/no-explicit-any */
// src/features/users/userApi.ts
import { apiSlice } from "../../app/api";

export const userApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
   getAllUsers: builder.query<any[], void>({
  query: () => "/users",
}),
blockUser: builder.mutation<any, string>({
  query: (id) => ({ url: `/users/block/${id}`, method: "PATCH" }),
}),
unblockUser: builder.mutation<any, string>({
  query: (id) => ({ url: `/users/unblock/${id}`, method: "PATCH" }),
}),
  }),
});

export const { useGetAllUsersQuery, useBlockUserMutation,useUnblockUserMutation } = userApi;
