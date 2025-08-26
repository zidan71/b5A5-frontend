/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from "../../app/api";
import { setCredentials } from "./authslice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      { user: any; token: string },
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
      // ❌ no toasts here, just update state
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data));
        } catch {
          // handled in component
        }
      },
    }),
    register: builder.mutation<
      { user: any; token: string },
      { name: string; email: string; password: string; role: string }
    >({
      query: (newUser) => ({
        url: "/auth/register",
        method: "POST",
        body: newUser,
      }),
      async onQueryStarted(arg, { dispatch, queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          dispatch(setCredentials(data));
        } catch {
          // handled in component
        }
      },
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
