import { apiSlice } from './apiSlice';
const UPLOAD_URL = '/api/upload';

export const uploadImageApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    uploadImage: builder.mutation({
      query: (data) => ({
        url: UPLOAD_URL,
        method: 'POST',
        body: data,
      }),
    }),
    getImages: builder.query({
      query: () => ({
        url: UPLOAD_URL,
      }),
      keepUnusedDataFor: 5,
    }),
    deleteImage: builder.mutation({
      query: (id) => ({
        url: `${UPLOAD_URL}/${id}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useUploadImageMutation,
  useGetImagesQuery,
  useDeleteImageMutation,
} = uploadImageApiSlice;
