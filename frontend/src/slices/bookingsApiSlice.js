import { apiSlice } from './apiSlice';
const BOOKINGS_URL = '/api/bookings';

export const bookingApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBookings: builder.query({
      query: (params) => ({
        url: BOOKINGS_URL,
        params,
      }),
      keepUnusedDataFor: 5,
    }),
    getBookingDetails: builder.query({
      query: (bookingId) => ({
        url: `${BOOKINGS_URL}/${bookingId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getMyBookings: builder.query({
      query: () => ({
        url: `${BOOKINGS_URL}/mine`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetBookingsQuery,
  useGetBookingDetailsQuery,
  useGetMyBookingsQuery,
} = bookingApiSlice;
