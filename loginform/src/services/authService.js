// services/authService.js
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: () => 'auth/login', // Replace with your actual login endpoint
      // Additional options for the mutation function (onSuccess, onError, etc.) can be added here
    }),
  }),
});

export const { useLoginMutation } = api;

const authService = {
  login: async () => {
    // Your login logic here
    const result = await api.useLoginMutation();
    return result.data;
  },
};

export default authService;
