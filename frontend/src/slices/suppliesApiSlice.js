import { apiSlice } from './apiSlice';
const SUPPLIES_URL = '/api/supplies';
const UPLOAD_URL = '/api/upload';

export const suppliesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSupplies: builder.query({
      query: (params) => ({
        url: SUPPLIES_URL,
        params,
      }),
      keepUnusedDataFor: 5,
    }),
    getSupplyDetails: builder.query({
      query: (supplyId) => ({
        url: `${SUPPLIES_URL}/${supplyId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getSuppliesMinMaxPrice: builder.query({
      query: () => ({
        url: `${SUPPLIES_URL}/minmax`,
      }),
      keepUnusedDataFor: 5,
    }),
    createSupply: builder.mutation({
      query: () => ({
        url: SUPPLIES_URL,
        method: 'POST',
      }),
      invalidatesTags: ['Supply'],
    }),
    updateSupply: builder.mutation({
      query: (data) => ({
        url: `${SUPPLIES_URL}/${data.supplyId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Supply'],
    }),
    uploadSupplyImage: builder.mutation({
      query: (data) => ({
        url: UPLOAD_URL,
        method: 'POST',
        body: data,
      }),
    }),
    deleteSupply: builder.mutation({
      query: (supplyId) => ({
        url: `${SUPPLIES_URL}/${supplyId}`,
        method: 'DELETE',
      }),
    }),
    supplyCreateReview: builder.mutation({
      query: (data) => ({
        url: `${SUPPLIES_URL}/${data.supplyId}/reviews`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Supply'],
    }),
    getTopSupplies: builder.query({
      query: () => ({
        url: `${SUPPLIES_URL}/top`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetSuppliesQuery,
  useGetSupplyDetailsQuery,
  useGetSuppliesMinMaxPriceQuery,
  useCreateSupplyMutation,
  useUpdateSupplyMutation,
  useUploadSupplyImageMutation,
  useDeleteSupplyMutation,
  useSupplyCreateReviewMutation,
  useGetTopSuppliesQuery,
} = suppliesApiSlice;
