import { apiSlice } from './apiSlice';
const POSTS_URL = '/api/posts';
const COMMENTS_URL = '/api/comments';

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (params) => ({
        url: POSTS_URL,
        params,
      }),
      keepUnusedDataFor: 5,
    }),
    getLastPosts: builder.query({
      query: () => ({
        url: `${POSTS_URL}/last`,
      }),
      keepUnusedDataFor: 5,
    }),
    getPostDetails: builder.query({
      query: (id) => ({
        url: `${POSTS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createPost: builder.mutation({
      query: () => ({
        url: POSTS_URL,
        method: 'POST',
      }),
      invalidatesTags: ['Post'],
    }),
    updatePost: builder.mutation({
      query: (data) => ({
        url: `${POSTS_URL}/${data.postId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Posts'],
    }),
    deletePost: builder.mutation({
      query: (postId) => ({
        url: `${POSTS_URL}/${postId}`,
        method: 'DELETE',
      }),
    }),
    createComment: builder.mutation({
      query: (data) => ({
        url: COMMENTS_URL,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Post'],
    }),
    updateComment: builder.mutation({
      query: (data) => ({
        url: `${COMMENTS_URL}/${data.commentId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Posts'],
    }),
    adminUpdateComment: builder.mutation({
      query: (data) => ({
        url: `${COMMENTS_URL}/${data.commentId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Comments'],
    }),
    deleteComment: builder.mutation({
      query: (commentId) => ({
        url: `${COMMENTS_URL}/${commentId}`,
        method: 'DELETE',
      }),
    }),
    getComments: builder.query({
      query: () => ({
        url: COMMENTS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getCommentDetails: builder.query({
      query: (id) => ({
        url: `${COMMENTS_URL}/${id}`,
      }),
      keepUnusedDataFor: 5,
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostDetailsQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useLastNumPostsQuery,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useAdminUpdateCommentMutation,
  useDeleteCommentMutation,
  useGetCommentsQuery,
  useGetCommentDetailsQuery,
} = postsApiSlice;
