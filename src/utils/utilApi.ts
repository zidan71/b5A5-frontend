/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from "../app/api";

export const utilApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    calculateFee: builder.query<any, { weight: number; distance: number }>({
      query: ({ weight, distance }) => `/utils/calculate-fee?weight=${weight}&distance=${distance}`,
    }),
  }),
});

export const { useCalculateFeeQuery } = utilApi;
