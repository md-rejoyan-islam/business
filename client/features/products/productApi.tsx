import { url } from "inspector";
import { productSlice } from "./productSlice";

const productApi = productSlice.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Products"],
    }),
    getAllProducts: builder.query({
      query: () => ({
        url: "/",
        method: "GET",
      }),
      providesTags: ["Products"],
    }),
    getProductById: builder.query({
      query: (id) => ({
        url: `/${id}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
    deleteProducById: builder.mutation({
      query: (id) => ({
        url: `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Products", "Product"],
    }),
    updateProductById: builder.mutation({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Products", "Product"],
    }),
    addThaanDataToProduct: builder.mutation({
      query: (data) => ({
        url: "/add-thaan",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Products", "Product"],
    }),
  }),
});

export const {
  useAddProductMutation,
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useDeleteProducByIdMutation,
  useUpdateProductByIdMutation,
  useAddThaanDataToProductMutation,
} = productApi;
