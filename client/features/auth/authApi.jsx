import { authSlice } from "./authSlice";

const authApi = authSlice.injectEndpoints({
  endpoints: (builder) => ({
    authLogin: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Auth"],
    }),
    authLogout: builder.mutation({
      query: (data) => ({
        url: "/logout",
        method: "POST",
        data: data,
      }),
      //   invalidatesTags: ["Auth"],
    }),
  }),
});

export const { useAuthLoginMutation, useAuthLogoutMutation } = authApi;
