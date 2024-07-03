import { apiSlice } from './apiSlice';
const FAQS_URL = '/api/faqs';

export const faqsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getFaqs: builder.query({
      query: (params) => ({
        url: FAQS_URL,
        params,
      }),
      keepUnusedDataFor: 5,
    }),
    getFaqDetails: builder.query({
      query: (id) => ({
        url: `${FAQS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createFaq: builder.mutation({
      query: () => ({
        url: FAQS_URL,
        method: 'POST',
      }),
      invalidatesTags: ['Faq'],
    }),
    updateFaq: builder.mutation({
      query: (data) => ({
        url: `${FAQS_URL}/${data.faqId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Faqs'],
    }),
    deleteFaq: builder.mutation({
      query: (faqId) => ({
        url: `${FAQS_URL}/${faqId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetFaqsQuery,
  useGetFaqDetailsQuery,
  useCreateFaqMutation,
  useUpdateFaqMutation,
  useDeleteFaqMutation,
} = faqsApiSlice;
