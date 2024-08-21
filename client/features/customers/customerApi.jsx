import { customersSlice } from "./customerSlice";

const customerApi = customersSlice.injectEndpoints({
  endpoints: (builder) => ({
    addCustomer: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Customers"],
    }),
    getAllCustomers: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["Customers"],
    }),
    updateCustomerById: builder.mutation({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Customer", "Customers"],
    }),
    deleteCustomeryId: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Customers"],
    }),
    getCustomerById: builder.query({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),
      providesTags: ["Customer"],
    }),
    // dyeingPayment: builder.mutation({
    //   query: (data) => ({
    //     url: "/dyeing-payment",
    //     method: "POST",
    //     body: data,
    //   }),
    //   invalidatesTags: ["Dyeing", "Dyeings"],
    // }),
    // updateDyeingPaymentById: builder.mutation({
    //   query: (data) => ({
    //     url: `/dyeing-payment/${data.id}`,
    //     method: "PATCH",
    //     body: data,
    //   }),
    //   invalidatesTags: ["Dyeing", "Dyeings"],
    // }),
    // deleteDyeingPaymentById: builder.mutation({
    //   query: (id) => ({
    //     url: `/dyeing-payment/${id}`,
    //     method: "DELETE",
    //   }),
    //   invalidatesTags: ["Dyeing", "Dyeings"],
    // }),
  }),
});

export const {
  useAddCustomerMutation,
  useDeleteCustomeryIdMutation,
  useGetAllCustomersQuery,
  useGetCustomerByIdQuery,
  useUpdateCustomerByIdMutation,
} = customerApi;
