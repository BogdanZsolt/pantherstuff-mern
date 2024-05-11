import { apiSlice } from './apiSlice';
const PRODUCTCATEGORIES_URL = '/api/productcategories';

export const productCategoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProductCategories: builder.query({
      query: (params) => ({
        url: PRODUCTCATEGORIES_URL,
        params,
      }),
      keepUnusedDataFor: 5,
    }),
    getProductCategoryDetails: builder.query({
      query: (id) => ({
        url: `${PRODUCTCATEGORIES_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createProductCategory: builder.mutation({
      query: () => ({
        url: PRODUCTCATEGORIES_URL,
        method: 'POST',
      }),
      invalidatesTags: ['ProductCategory'],
    }),
    updateProductCategory: builder.mutation({
      query: (data) => ({
        url: `${PRODUCTCATEGORIES_URL}/${data.productCatId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['ProductCategories'],
    }),
    deleteProductCategory: builder.mutation({
      query: (id) => ({
        url: `${PRODUCTCATEGORIES_URL}/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetProductCategoriesQuery,
  useGetProductCategoryDetailsQuery,
  useCreateProductCategoryMutation,
  useUpdateProductCategoryMutation,
  useDeleteProductCategoryMutation,
} = productCategoriesApiSlice;
