import { apiSlice } from './apiSlice';
const CONTACTMESSAGES_URL = '/api/contact-messages';

export const contactMessageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getContactMessages: builder.query({
      query: (params) => ({
        url: CONTACTMESSAGES_URL,
        params,
      }),
      keepUnusedDataFor: 5,
    }),
    getContactMessageDetails: builder.query({
      query: (id) => ({
        url: `${CONTACTMESSAGES_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createContactMessage: builder.mutation({
      query: (data) => ({
        url: CONTACTMESSAGES_URL,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['ContactMessage'],
    }),
    updateContactMessage: builder.mutation({
      query: (data) => ({
        url: `${CONTACTMESSAGES_URL}/${data.messageId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['ContactMessage'],
    }),
    deleteContectMessage: builder.mutation({
      query: (id) => ({
        url: `${CONTACTMESSAGES_URL}/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetContactMessagesQuery,
  useGetContactMessageDetailsQuery,
  useUpdateContactMessageMutation,
  useCreateContactMessageMutation,
} = contactMessageApiSlice;
