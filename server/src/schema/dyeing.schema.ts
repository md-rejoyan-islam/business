import { z } from "zod";

const dyeingSchema = z.object({
  id: z.number(),
  name: z.string({
    required_error: "Dyeing name is required",
    invalid_type_error: "Dyeing name must be string",
  }),
  address: z.string({
    required_error: "Dyeing address is required.",
    invalid_type_error: "Dyeing address must be string",
  }),
  phone: z.string({
    required_error: "Dyeing phone number is required.",
    invalid_type_error: "Dyeing name must be string.",
  }),
});

export default dyeingSchema;
