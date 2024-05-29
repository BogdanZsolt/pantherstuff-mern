import { apiSlice } from './apiSlice';
const PRODUCTSIZES_URL = '/api/productsizes';

export const productSizesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductSizes: builder.query({
      query: (params) => ({
        url: PRODUCTSIZES_URL,
        params,
      }),
      keepUnusedDataFor: 5,
    }),
    getProductSizeDetails: builder.query({
      query: (id) => ({
        url: `${PRODUCTSIZES_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createProductSize: builder.mutation({
      query: () => ({
        url: PRODUCTSIZES_URL,
        method: 'POST',
      }),
      invalidatesTags: ['ProductSize'],
    }),
    updateProductSize: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTSIZES_URL}/${data.productSizeId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['ProductSizes'],
    }),
    deleteProductSize: builder.mutation({
      query: (id) => ({
        url: `${PRODUCTSIZES_URL}/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetProductSizesQuery,
  useGetProductSizeDetailsQuery,
  useCreateProductSizeMutation,
  useUpdateProductSizeMutation,
  useDeleteProductSizeMutation,
} = productSizesApiSlice;
