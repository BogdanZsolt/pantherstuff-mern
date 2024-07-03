import { apiSlice } from './apiSlice';
const FAQCATEGORIES_URL = '/api/faqcategories';

export const faqCategoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFaqCategories: builder.query({
      query: (params) => ({
        url: FAQCATEGORIES_URL,
        params,
      }),
      keepUnusedDataFor: 5,
    }),
    getFaqCategoryDetails: builder.query({
      query: (id) => ({
        url: `${FAQCATEGORIES_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createFaqCategory: builder.mutation({
      query: () => ({
        url: FAQCATEGORIES_URL,
        method: 'POST',
      }),
      invalidatesTags: ['FaqCategory'],
    }),
    updateFaqCategory: builder.mutation({
      query: (data) => ({
        url: `${FAQCATEGORIES_URL}/${data.faqCatId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['FaqCategories'],
    }),
    deleteFaqCategory: builder.mutation({
      query: (faqId) => ({
        url: `${FAQCATEGORIES_URL}/${faqId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetFaqCategoriesQuery,
  useGetFaqCategoryDetailsQuery,
  useCreateFaqCategoryMutation,
  useUpdateFaqCategoryMutation,
  useDeleteFaqCategoryMutation,
} = faqCategoriesApiSlice;
