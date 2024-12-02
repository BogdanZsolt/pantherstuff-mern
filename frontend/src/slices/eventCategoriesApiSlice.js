import { apiSlice } from './apiSlice';
const EVENTCATEGORIES_URL = '/api/eventcategories';

export const eventCategoriesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEventCategories: builder.query({
      query: (params) => ({
        url: EVENTCATEGORIES_URL,
        params,
      }),
      keepUnusedDataFor: 5,
    }),
    getEventCategoryDetails: builder.query({
      query: (eventCategoryId) => ({
        url: `${EVENTCATEGORIES_URL}/${eventCategoryId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createEventCategory: builder.mutation({
      query: () => ({
        url: EVENTCATEGORIES_URL,
        method: 'POST',
      }),
      invalidatesTags: ['EventCategory'],
    }),
    updateEventCategory: builder.mutation({
      query: (data) => ({
        url: `${EVENTCATEGORIES_URL}/${data.eventCategoryId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['EventCategory'],
    }),
    deleteEventCategory: builder.mutation({
      query: (eventCategoryId) => ({
        url: `${EVENTCATEGORIES_URL}/${eventCategoryId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetEventCategoriesQuery,
  useGetEventCategoryDetailsQuery,
  useCreateEventCategoryMutation,
  useUpdateEventCategoryMutation,
  useDeleteEventCategoryMutation,
} = eventCategoriesApiSlice;
