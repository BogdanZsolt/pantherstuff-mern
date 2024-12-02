import { apiSlice } from './apiSlice';
const EVENTS_URL = '/api/events';
const UPLOAD_URL = '/api/upload';

export const eventsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getEvents: builder.query({
      query: (params) => ({
        url: EVENTS_URL,
        params,
      }),
      keepUnusedDataFor: 5,
    }),
    getEventsMinMaxPrice: builder.query({
      query: () => ({
        url: `${EVENTS_URL}/minmax`,
      }),
      keepUnusedDataFor: 5,
    }),
    getEventDetails: builder.query({
      query: (eventId) => ({
        url: `${EVENTS_URL}/${eventId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createEvent: builder.mutation({
      query: () => ({
        url: EVENTS_URL,
        method: 'POST',
      }),
      invalidatesTags: ['Event'],
    }),
    updateEvent: builder.mutation({
      query: (data) => ({
        url: `${EVENTS_URL}/${data.eventId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Event'],
    }),
    copyEvent: builder.mutation({
      query: (eventId) => ({
        url: `${EVENTS_URL}/${eventId}`,
        method: 'POST',
      }),
      invalidatesTags: ['Event'],
    }),
    deleteEvent: builder.mutation({
      query: (eventId) => ({
        url: `${EVENTS_URL}/${eventId}`,
        method: 'DELETE',
      }),
    }),
    eventCreateReview: builder.mutation({
      query: (data) => ({
        url: `${EVENTS_URL}/${data.eventId}/review`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Event'],
    }),
    uploadEventImage: builder.mutation({
      query: (data) => ({
        url: UPLOAD_URL,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetEventsQuery,
  useGetEventsMinMaxPriceQuery,
  useGetEventDetailsQuery,
  useCreateEventMutation,
  useUpdateEventMutation,
  useCopyEventMutation,
  useDeleteEventMutation,
  useEventCreateReviewMutation,
  useUploadEventImageMutation,
} = eventsApiSlice;
