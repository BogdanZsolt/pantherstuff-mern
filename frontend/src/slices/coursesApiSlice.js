import { apiSlice } from './apiSlice';
const COURSES_URL = '/api/courses';
const UPLOAD_URL = '/api/upload';

export const coursesApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCourses: builder.query({
      query: (params) => ({
        url: COURSES_URL,
        params,
      }),
      keepUnusedDataFor: 5,
    }),
    getCourseDetails: builder.query({
      query: (courseId) => ({
        url: `${COURSES_URL}/${courseId}`,
      }),
      keepUnusedDataFor: 5,
    }),
    getCoursesMinMaxPrice: builder.query({
      query: () => ({
        url: `${COURSES_URL}/minmax`,
      }),
      keepUnusedDataFor: 5,
    }),
    createCourse: builder.mutation({
      query: () => ({
        url: COURSES_URL,
        method: 'POST',
      }),
      invalidatesTags: ['Course'],
    }),
    updateCourse: builder.mutation({
      query: (data) => ({
        url: `${COURSES_URL}/${data.courseId}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Course'],
    }),
    uploadCourseImage: builder.mutation({
      query: (data) => ({
        url: UPLOAD_URL,
        method: 'POST',
        body: data,
      }),
    }),
    copyCourse: builder.mutation({
      query: (courseId) => ({
        url: `${COURSES_URL}/${courseId}`,
        method: 'POST',
      }),
      invalidatesTags: ['Course'],
    }),
    deleteCourse: builder.mutation({
      query: (courseId) => ({
        url: `${COURSES_URL}/${courseId}`,
        method: 'DELETE',
      }),
    }),
    courseCreateReview: builder.mutation({
      query: (data) => ({
        url: `${COURSES_URL}/${data.courseId}/reviews`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Course'],
    }),
    addNewLesson: builder.mutation({
      query: (data) => ({
        url: `${COURSES_URL}/${data.courseId}/lesson`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Course'],
    }),
    updateLesson: builder.mutation({
      query: (data) => ({
        url: `${COURSES_URL}/${data.courseId}/update`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Course'],
    }),
    curriculumLessonsSortChange: builder.mutation({
      query: (data) => ({
        url: `${COURSES_URL}/${data.courseId}/sortchange`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Course'],
    }),
    lessonArrayMove: builder.mutation({
      query: (data) => ({
        url: `${COURSES_URL}/${data.courseId}/arraymove`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Course'],
    }),
    removeLesson: builder.mutation({
      query: (data) => ({
        url: `${COURSES_URL}/${data.courseId}/delete`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Course'],
    }),
    getUserCourseProgress: builder.query({
      query: (data) => ({
        url: `${COURSES_URL}/${data.courseId}/getprogress`,
        data,
      }),
    }),
  }),
});

export const {
  useGetCoursesQuery,
  useGetCourseDetailsQuery,
  useGetCoursesMinMaxPriceQuery,
  useCreateCourseMutation,
  useUpdateCourseMutation,
  useUploadCourseImageMutation,
  useCopyCourseMutation,
  useDeleteCourseMutation,
  useCourseCreateReviewMutation,
  useAddNewLessonMutation,
  useUpdateLessonMutation,
  useCurriculumLessonsSortChangeMutation,
  useLessonArrayMoveMutation,
  useRemoveLessonMutation,
  useGetUserCourseProgressQuery,
} = coursesApiSlice;
