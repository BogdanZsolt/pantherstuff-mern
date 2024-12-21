import { apiSlice } from './apiSlice';
const COURSECATEGORIES_URL = '/api/coursecategories';

export const coursesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourseCategories: builder.query({
      query: (params) => ({
        url: COURSECATEGORIES_URL,
        params,
      }),
      keepUnusedDataFor: 5,
    }),
    getCourseCategoryDetails: builder.query({
      query: (courseId) => ({
        url: `${COURSECATEGORIES_URL}/${courseId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    createCourseCategory: builder.mutation({
      query: () => ({
        url: COURSECATEGORIES_URL,
        method: 'POST',
      }),
      invalidatesTags: ['Coursecategory'],
    }),
    updateCourse: builder.mutation({
      query: (data) => ({
        url: `${COURSECATEGORIES_URL}/${data.courseId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Coursecategory'],
    }),
    copyCourseCategory: builder.mutation({
      query: (courseId) => ({
        url: `${COURSECATEGORIES_URL}/${courseId}`,
        method: 'POST',
      }),
      invalidatesTags: ['Coursecategory'],
    }),
    deleteCourseCategory: builder.mutation({
      query: (courseId) => ({
        url: `${COURSECATEGORIES_URL}/${courseId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useGetCourseCategoriesQuery,
  useGetCourseCategoryDetailsQuery,
  useCreateCourseCategoryMutation,
  useUpdateCourseMutation,
  useCopyCourseCategoryMutation,
  useDeleteCourseCategoryMutation,
} = coursesApiSlice;
