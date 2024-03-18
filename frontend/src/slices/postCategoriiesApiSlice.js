import { apiSlice } from './apiSlice';
const POSTCATEGORIES_URL = '/api/postcategories';

export const postCategoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPostCategories: builder.query({
      query: () => ({
        url: POSTCATEGORIES_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getPostCategoryDetails: builder.query({
      query: (id) => ({
        url: `${POSTCATEGORIES_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createPostCategory: builder.mutation({
      query: () => ({
        url: POSTCATEGORIES_URL,
        method: 'POST',
      }),
      invalidatesTags: ['PostCategory'],
    }),
    updatePostCategory: builder.mutation({
      query: (data) => ({
        url: `${POSTCATEGORIES_URL}/${data.postCatId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['PostCategories'],
    }),
    deletePostCategory: builder.mutation({
      query: (id) => ({
        url: `${POSTCATEGORIES_URL}/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetPostCategoriesQuery,
  useGetPostCategoryDetailsQuery,
  useCreatePostCategoryMutation,
  useUpdatePostCategoryMutation,
  useDeletePostCategoryMutation,
} = postCategoriesApiSlice;
