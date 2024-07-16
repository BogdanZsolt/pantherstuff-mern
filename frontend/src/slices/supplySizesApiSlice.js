import { apiSlice } from './apiSlice';
const SUPPLYSIZES_URL = '/api/supplysizes';

export const supplySizesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSupplySizes: builder.query({
      query: (params) => ({
        url: SUPPLYSIZES_URL,
        params,
      }),
      keepUnusedDataFor: 5,
    }),
    getSupplySizeDetails: builder.query({
      query: (id) => ({
        url: `${SUPPLYSIZES_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createSupplySize: builder.mutation({
      query: () => ({
        url: SUPPLYSIZES_URL,
        method: 'POST',
      }),
      invalidatesTags: ['SupplySize'],
    }),
    updateSupplySize: builder.mutation({
      query: (data) => ({
        url: `${SUPPLYSIZES_URL}/${data.supplySizeId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['SupplySizes'],
    }),
    deleteSupplySize: builder.mutation({
      query: (id) => ({
        url: `${SUPPLYSIZES_URL}/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetSupplySizesQuery,
  useGetSupplySizeDetailsQuery,
  useCreateSupplySizeMutation,
  useUpdateSupplySizeMutation,
  useDeleteSupplySizeMutation,
} = supplySizesApiSlice;
