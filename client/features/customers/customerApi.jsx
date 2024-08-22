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
      query: (query) => ({
        url: `/${query ? query : ""}`,
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
      providesTags: ["Customer", "CustomersPayments"],
    }),
    confirmPurchase: builder.mutation({
      query: (data) => ({
        url: "/confirm-purchase",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Customers", "Customer"],
    }),
    customerChalanPayment: builder.mutation({
      query: (data) => ({
        url: "/chalan-payment",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["CustomersPayments"],
    }),
    updateCustomerChalanPayment: builder.mutation({
      query: (data) => ({
        url: "/chalan-payment",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["CustomersPayments"],
    }),
    getAllcustomersPayments: builder.query({
      query: (query) => ({
        url: `/all-customers-payments${query ? query : ""}`,
        method: "GET",
      }),
      providesTags: ["CustomersPayments"],
    }),
  }),
});

export const {
  useAddCustomerMutation,
  useDeleteCustomeryIdMutation,
  useGetAllCustomersQuery,
  useGetCustomerByIdQuery,
  useUpdateCustomerByIdMutation,
  useConfirmPurchaseMutation,
  useCustomerChalanPaymentMutation,
  useGetAllcustomersPaymentsQuery,
  useUpdateCustomerChalanPaymentMutation,
} = customerApi;
