import { apiSlice } from './apiSlice';
const POSTS_URL = '/api/posts';
const COMMENTS_URL = '/api/comments';

export const postsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => ({
        url: POSTS_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    getPostDetails: builder.query({
      query: (slug) => ({
        url: `${POSTS_URL}/${slug}`,
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
        url: `${POSTS_URL}/${data.slug}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Posts'],
    }),
    deletePost: builder.mutation({
      query: (slug) => ({
        url: `${POSTS_URL}/${slug}`,
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
      invalidatesTags: ['Post'],
    }),
    deleteComment: builder.mutation({
      query: (commentId) => ({
        url: `${COMMENTS_URL}/${commentId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetPostsQuery,
  useGetPostDetailsQuery,
  useCreatePostMutation,
  useUpdatePostMutation,
  useDeletePostMutation,
  useCreateCommentMutation,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
} = postsApiSlice;
