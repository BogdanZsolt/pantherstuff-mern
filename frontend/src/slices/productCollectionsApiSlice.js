import { apiSlice } from './apiSlice';
const PRODUCTCOLLECTIONS_URL = '/api/productcollections';

export const productCollectionsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductCollections: builder.query({
      query: (params) => ({
        url: PRODUCTCOLLECTIONS_URL,
        params,
      }),
      keepUnusedDataFor: 5,
    }),
    getProductCollectionDetails: builder.query({
      query: (id) => ({
        url: `${PRODUCTCOLLECTIONS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createProductCollection: builder.mutation({
      query: () => ({
        url: PRODUCTCOLLECTIONS_URL,
        method: 'POST',
      }),
      invalidatesTags: ['ProductCollection'],
    }),
    updateProductCollection: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTCOLLECTIONS_URL}/${data.productCollId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['ProductCollections'],
    }),
    deleteProductCollection: builder.mutation({
      query: (id) => ({
        url: `${PRODUCTCOLLECTIONS_URL}/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetProductCollectionsQuery,
  useGetProductCollectionDetailsQuery,
  useCreateProductCollectionMutation,
  useUpdateProductCollectionMutation,
  useDeleteProductCollectionMutation,
} = productCollectionsApiSlice;
