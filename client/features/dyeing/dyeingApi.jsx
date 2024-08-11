import { dyeingSlice } from "./dyeingSlice";

const dyeingApi = dyeingSlice.injectEndpoints({
  endpoints: (builder) => ({
    addDyeing: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Dyeings"],
    }),
    getAllDyeings: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["Dyeings"],
    }),
    updateDyeingById: builder.mutation({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Dyeings", "Dyeing"],
    }),
    deleteDyeingById: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Dyeings"],
    }),
    getDyeingById: builder.query({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),
      providesTags: ["Dyeing"],
    }),
    dyeingPayment: builder.mutation({
      query: (data) => ({
        url: "/dyeing-payment",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Dyeing", "Dyeings"],
    }),
    updateDyeingPaymentById: builder.mutation({
      query: (data) => ({
        url: `/dyeing-payment/${data.id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Dyeing", "Dyeings"],
    }),
    deleteDyeingPaymentById: builder.mutation({
      query: (id) => ({
        url: `/dyeing-payment/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Dyeing", "Dyeings"],
    }),
  }),
});

export const {
  useAddDyeingMutation,
  useGetAllDyeingsQuery,
  useUpdateDyeingByIdMutation,
  useDeleteDyeingByIdMutation,
  useGetDyeingByIdQuery,
  useDyeingPaymentMutation,
  useDeleteDyeingPaymentByIdMutation,
  useUpdateDyeingPaymentByIdMutation,
} = dyeingApi;
