import { z } from "zod";

const graySchema = z.object({
  id: z.number(),
  name: z.string({
    required_error: "Gray name is required",
    invalid_type_error: "Gray name must be string",
  }),
  address: z.string({
    required_error: "Gray address is required.",
    invalid_type_error: "Gray address must be string",
  }),
  phone: z.string({
    required_error: "Gray phone number is required.",
    invalid_type_error: "Gray name must be string.",
  }),
  // products: productSchema.optional(),
});

export default graySchema;
