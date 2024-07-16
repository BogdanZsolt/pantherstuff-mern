import { apiSlice } from './apiSlice';
const SUPPLYCATEGORIES_URL = '/api/supplycategories';

export const supplyCategoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSupplyCategories: builder.query({
      query: (params) => ({
        url: SUPPLYCATEGORIES_URL,
        params,
      }),
      keepUnusedDataFor: 5,
    }),
    getSupplyCategoryDetails: builder.query({
      query: (id) => ({
        url: `${SUPPLYCATEGORIES_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createSupplyCategory: builder.mutation({
      query: () => ({
        url: SUPPLYCATEGORIES_URL,
        method: 'POST',
      }),
      invalidatesTags: ['SupplyCategory'],
    }),
    updateSupplyCategory: builder.mutation({
      query: (data) => ({
        url: `${SUPPLYCATEGORIES_URL}/${data.supplyCatId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['SupplyCategories'],
    }),
    deleteSupplyCategory: builder.mutation({
      query: (id) => ({
        url: `${SUPPLYCATEGORIES_URL}/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetSupplyCategoriesQuery,
  useGetSupplyCategoryDetailsQuery,
  useCreateSupplyCategoryMutation,
  useUpdateSupplyCategoryMutation,
  useDeleteSupplyCategoryMutation,
} = supplyCategoriesApiSlice;
