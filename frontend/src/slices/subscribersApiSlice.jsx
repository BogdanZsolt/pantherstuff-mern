import { apiSlice } from './apiSlice';
const SUBSCRIBERS_URL = '/api/subscribers';
const GROUPS_URL = '/api/groups';

export const subscribersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getSubscribers: builder.query({
      query: () => ({
        url: SUBSCRIBERS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getGroupSubscribers: builder.query({
      query: (id) => ({
        url: `${GROUPS_URL}/${id}/subscribers`,
      }),
      keepUnusedDataFor: 5,
    }),
    createSubscriber: builder.mutation({
      query: (subscriber) => ({
        url: SUBSCRIBERS_URL,
        method: 'POST',
        body: subscriber,
      }),
    }),
    getGroups: builder.query({
      query: () => ({
        url: GROUPS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    checkEmail: builder.mutation({
      query: (data) => ({
        url: `${SUBSCRIBERS_URL}/check`,
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const {
  useGetSubscribersQuery,
  useGetGroupSubscribersQuery,
  useCreateSubscriberMutation,
  useGetGroupsQuery,
  useCheckEmailMutation,
} = subscribersApiSlice;
