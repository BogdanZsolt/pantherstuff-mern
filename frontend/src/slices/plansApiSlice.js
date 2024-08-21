import { apiSlice } from './apiSlice';
const PLANS_URL = '/api/plans';

export const plansApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPlans: builder.query({
      query: (params) => ({
        url: PLANS_URL,
        params,
      }),
      keepUnusedDataFor: 5,
    }),
    getPlanDetails: builder.query({
      query: (planId) => ({
        url: `${PLANS_URL}/${planId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createPlan: builder.mutation({
      query: () => ({
        url: PLANS_URL,
        method: 'POST',
      }),
      invalidatesTags: ['Plan'],
    }),
    updatePlan: builder.mutation({
      query: (data) => ({
        url: `${PLANS_URL}/${data.planId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Plan'],
    }),
    deletePlan: builder.mutation({
      query: (planId) => ({
        url: `${PLANS_URL}/${planId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetPlansQuery,
  useGetPlanDetailsQuery,
  useCreatePlanMutation,
  useUpdatePlanMutation,
  useDeletePlanMutation,
} = plansApiSlice;
