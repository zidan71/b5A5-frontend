/* eslint-disable @typescript-eslint/no-explicit-any */
import { apiSlice } from "../../app/api";

export const parcelApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // Sender
    createParcel: builder.mutation<any, { type: string; weight: number; receiver: string; deliveryAddress: string }>({
      query: (parcel) => ({ url: "/parcels", method: "POST", body: parcel }),
    }),
    myParcels: builder.query<any[], void>({
      query: () => "/parcels/me",
      transformResponse: (res: any) => res.parcels,
    }),
    cancelParcel: builder.mutation<any, string>({
      query: (id) => ({ url: `/parcels/cancel/${id}`, method: "PATCH" }),
    }),

    

    // Receiver
   incomingParcels: builder.query<any[], void>({
  query: () => "/parcels/incoming",
  transformResponse: (res: any) => Array.isArray(res) ? res : res.parcels || [],
}),

    deliveredParcels: builder.query<any[], void>({
      query: () => "/parcels/delivered",
      transformResponse: (res: any) => res.parcels,
    }),
    confirmParcelDelivery: builder.mutation<any, string>({
      query: (id) => ({ url: `/parcels/confirm/${id}`, method: "PATCH" }),
    }),

    // admin
    allParcels: builder.query<any[], void>({
      query: () => "/parcels",
      transformResponse: (res: any) => res.parcels,
    }),
    updateParcelStatus: builder.mutation<any, { id: string; status: string }>({
      query: ({ id, status }) => ({
        url: `/parcels/status/${id}`,
        method: "PATCH",
        body: { status },
      }),
    }),
    blockParcel: builder.mutation<any, string>({
      query: (id) => ({ url: `/parcels/block/${id}`, method: "PATCH" }),
    }),


    



    // public

    trackParcel: builder.query<any, string>({
      query: (trackingId) => `/public/track/${trackingId}`, 
    }),


  }),
});

export const {
  useCreateParcelMutation,
  useMyParcelsQuery,
  useCancelParcelMutation,
  useIncomingParcelsQuery,
  useDeliveredParcelsQuery,
  useConfirmParcelDeliveryMutation,
  useAllParcelsQuery,
  useUpdateParcelStatusMutation,
  useLazyTrackParcelQuery,
  

} = parcelApi;
