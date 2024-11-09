import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const API_URI = import.meta.env.VITE_API_URI;

const baseQuery = fetchBaseQuery({
  baseUrl: API_URI,
  credentials: "include",
  prepareHeaders: (headers) => {
    headers.set("Access-Control-Allow-Credentials", "true");
    const token = localStorage.getItem("token");
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: [],
  endpoints: (builder) => ({}),
});
