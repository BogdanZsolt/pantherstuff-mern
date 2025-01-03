import { apiSlice } from './apiSlice';
const USERS_URL = '/api/users';

export const usersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/auth`,
        method: 'POST',
        body: data,
      }),
    }),
    register: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}`,
        method: 'POST',
        body: data,
      }),
    }),
    logout: builder.mutation({
      query: () => ({
        url: `${USERS_URL}/logout`,
        method: 'POST',
      }),
    }),
    profile: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/profile`,
        method: 'PUT',
        body: data,
      }),
    }),
    getUsers: builder.query({
      query: () => ({
        url: USERS_URL,
      }),
      providesTags: ['User'],
      keepUnusedDataFor: 5,
    }),
    deleteUser: builder.mutation({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
        method: 'DELETE',
      }),
    }),
    getUserDetails: builder.query({
      query: (userId) => ({
        url: `${USERS_URL}/${userId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/${data.userId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    getAuthor: builder.query({
      query: (id) => ({
        url: `${USERS_URL}/${id}/author`,
      }),
      keepUnusedDataFor: 5,
    }),
    checkAuthStatus: builder.query({
      query: () => ({
        url: `${USERS_URL}/checkauthenticated`,
      }),
      keepUnusedDataFor: 5,
    }),
    checkIsAdmin: builder.query({
      query: () => ({
        url: `${USERS_URL}/checkadmin`,
      }),
      keepUnusedDataFor: 5,
    }),
    checkIsPremium: builder.query({
      query: () => ({
        url: `${USERS_URL}/checkpremium`,
      }),
      keepUnusedDataFor: 5,
    }),
    sendEmailVerificationToken: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/account-verification-email`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['User'],
    }),
    verifyUserAccount: builder.mutation({
      query: (verifyToken) => ({
        url: `${USERS_URL}/verify-account/${verifyToken}`,
        method: 'PUT',
      }),
      invalidatesTags: ['User'],
    }),
    passwordResetRequest: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/forgot-password`,
        method: 'POST',
        body: data,
      }),
    }),
    passwordReset: builder.mutation({
      query: (data) => ({
        url: `${USERS_URL}/password-reset/${data.resetToken}`,
        method: 'POST',
        body: data,
      }),
    }),
    getCoursesList: builder.query({
      query: () => ({
        url: `${USERS_URL}/mycourses`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useLoginMutation,
  useLogoutMutation,
  useRegisterMutation,
  useProfileMutation,
  useGetUsersQuery,
  useDeleteUserMutation,
  useGetUserDetailsQuery,
  useUpdateUserMutation,
  useGetAuthorQuery,
  useCheckAuthStatusQuery,
  useCheckIsAdminQuery,
  useCheckIsPremiumQuery,
  useSendEmailVerificationTokenMutation,
  useVerifyUserAccountMutation,
  usePasswordResetRequestMutation,
  usePasswordResetMutation,
  useGetCoursesListQuery,
} = usersApiSlice;
