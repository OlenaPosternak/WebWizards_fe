import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import cookie from 'utils/functions/cookies';
import { Appointment } from 'services/types/appointment.type';

export const appointmentApi = createApi({
  reducerPath: 'appointmentApi',
  tagTypes: ['Appointment'],
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_REACT_APP_BASE_URL_SERVER,
    prepareHeaders: (headers) => {
      const token = cookie.get('accessToken');
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      headers.set('Content-Type', 'application/json');
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getSpecializationById: builder.query({
      query: (id: number | string) => ({
        url: `/availability/specialization/${id}`,
        method: 'GET',
      }),
      providesTags: ['Appointment'],
    }),
    getAppointmentForWeek: builder.query<
      Appointment[],
      { id: number; year: number; week: number }
    >({
      query: ({ id, year, week }) => ({
        url: `appointment/patient/${id}/week/${year}/${week}`,
        method: 'GET',
      }),
      providesTags: ['Appointment'],
    }),
  }),
});

export const { useGetSpecializationByIdQuery, useGetAppointmentForWeekQuery } =
  appointmentApi;
