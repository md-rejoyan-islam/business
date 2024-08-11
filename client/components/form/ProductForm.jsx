"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  useAddGrayMutation,
  useGetAllGraysQuery,
  useUpdateGrayByIdMutation,
} from "@/features/gray/grayApi";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import {
  useAddProductMutation,
  useUpdateProductByIdMutation,
} from "@/features/products/productApi";
import { useGetAllChalanQuery } from "@/features/chalan/chalanApi";
import { useRef } from "react";
import { useGetAllDyeingsQuery } from "@/features/dyeing/dyeingApi";

const formSchema = z.object({
  name: z
    .string({
      required_error: "Product name is required",
      invalid_type_error: "Product name must be string",
    })
    .min(2, "Product name must be at least 2 character"),
  grayName: z
    .string({
      required_error: "Gray name is required.",
      invalid_type_error: "Gray name must be string",
    })
    .min(1, "Gray name must be at least 1 character"),
  gray_amount: z.coerce
    .number({
      required_error: "Gray amount is required.",
      invalid_type_error: "Gray amount must be number",
    })
    .min(1, "Gray amount must be at least 1 character"),
  gray_rate: z.coerce
    .number({
      required_error: "Gray rate is required.",
      invalid_type_error: "Gray rate must be number",
    })
    .min(1, "Gray amount must be at least 1 character"),
  // gray_date: z
  //   .date({
  //     invalid_type_error: "Gray date must be date type",
  //   })
  //   .optional(),
  dyeing_rate: z.coerce
    .number({
      invalid_type_error: "Dyeing rate must be number",
    })
    .optional(),
  dyeing_amount: z.coerce
    .number({
      invalid_type_error: "Dyeing amount must be number",
    })
    .optional(),
  dyeing_date: z
    .date({
      invalid_type_error: "Dyeing date must be date type",
    })
    .optional(),
  dyeing_name: z
    .string({
      invalid_type_error: "Dyeing name must be string",
    })
    .optional(),
  dyeingId: z.coerce
    .number({
      invalid_type_error: "Dyeing id must be number",
    })
    .optional(),

  // chalan
  chalanNumber: z.coerce
    .number({
      invalid_type_error: "Chalan id must be number",
    })
    .optional(),
  // delivery
  delivery_status: z
    .enum(["IN_MILL", "IN_HOUSE", "RUNNING"])
    .optional()
    .default("RUNNING"),
});

export default function ProductForm({ type = "edit", formData = {}, setOpen }) {
  const [
    updateProduct,
    {
      isError: isUpdateError,
      error: updateError,
      isLoading: isUpdateLoading,
      isSuccess: isUpdateSuccess,
      data: updateData,
    },
  ] = useUpdateProductByIdMutation();
  const selectRef = useRef();

  const [addProduct, { isSuccess, error, isError, data }] =
    useAddProductMutation();
  // chalan data
  const { data: chalans } = useGetAllChalanQuery();
  const { data: grays, isLoading } = useGetAllGraysQuery();
  const { data: dyeings } = useGetAllDyeingsQuery();

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: type === "update" ? formData?.name : "",
      grayName: type === "update" ? formData?.gray?.name : "",
      delivery_status:
        type === "update" ? formData?.delivery_status : "RUNNING",
      gray_amount: type === "update" ? formData?.gray_amount : 0,
      gray_rate: type === "update" ? formData?.gray_rate : 0,
      chalanNumber: type === "update" ? formData?.chalanNumber : 0,
      dyeing_amount: type === "update" ? formData?.dyeing_amount || 0 : 0,
      dyeing_name: type === "update" ? formData?.dyeing?.name || "" : "",
      dyeing_rate: type === "update" ? formData?.dyeing_rate || 0 : 0,
      // gray_date: type === "update" ? formData?.gray_date : "",
    },
  });

  const onSubmit = async (values) => {
    const { grayName, dyeing_name } = values;
    let errorMessage = "";
    let successMessage = "";

    // for update form
    if (type === "update") {
      const grayId = grays?.data?.find((gray) => gray.name === grayName).id;

      delete values.grayName;
      const data = {
        ...values,
        grayId,
      };

      if (dyeing_name) {
        const dyeingId = dyeings?.data?.find(
          (dyeing) => dyeing?.name === dyeing_name
        ).id;

        if (!data.dyeing_amount)
          return toast.error("Dyeing amount is reduired with dyeing name.");
        if (!data.dyeing_rate)
          return toast.error("Dyeing rate is reduired with dyeing name.");

        data.dyeingId = dyeingId;
        delete data.dyeing_name;
      } else {
        delete data.dyeing_name;
        delete data.dyeing_amount;
        delete data.dyeing_rate;
      }

      const res = await updateProduct({
        id: formData.id,
        data,
      });
      if (res.data?.success) {
        setOpen && setOpen();
        successMessage = res.data?.message;
      } else if (!res?.error?.data?.success) {
        errorMessage = res?.error?.data?.error?.message;
      }
    }
    // for edit form
    else if (type === "edit") {
      const grayId = grays?.data?.find((gray) => gray.name === grayName).id;

      delete values.grayName;

      const data = {
        ...values,
        grayId,
      };

      if (dyeing_name) {
        const dyeingId = dyeings?.data?.find(
          (dyeing) => dyeing?.name === dyeing_name
        ).id;

        if (!data.dyeing_amount)
          return toast.error("Dyeing amount is reduired with dyeing name.");
        if (!data.dyeing_rate)
          return toast.error("Dyeing rate is reduired with dyeing name.");

        data.dyeingId = dyeingId;
        delete data.dyeing_name;
      } else {
        delete data.dyeing_name;
        delete data.dyeing_amount;
        delete data.dyeing_rate;
      }

      const res = await addProduct(data);
      if (res.data?.success) {
        setOpen && setOpen();
        form.reset();
        successMessage = res.data?.message;
      } else if (!res?.error?.data?.success) {
        errorMessage = res?.error?.data?.error?.message;
      }
    }

    // message show
    if (successMessage) toast.success(successMessage);
    else if (errorMessage) toast.error(errorMessage);
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 w-full"
          ref={selectRef}
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input
                    className="   focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-slate-400/80"
                    placeholder="Enter product name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="chalanNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Chalan Number </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    className="   focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-slate-400/80"
                    placeholder="Enter chalan number"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="grayName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gray Name</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={type === "update" ? formData?.gray?.name : ""}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Gray Name" />
                    </SelectTrigger>
                    <SelectContent {...field}>
                      {grays?.data?.map((gray) => (
                        <SelectItem value={gray.name} key={gray.id}>
                          {gray.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gray_amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gray Amount </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    className="   focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-slate-400/80"
                    min={0}
                    placeholder="Enter gray amount"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gray_rate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gray Rate </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    className="   focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-slate-400/80"
                    placeholder="Enter gray rate"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="dyeing_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dyeing Name</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={
                      type === "update" ? formData?.dyeing?.name : ""
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select Dyeing Name" />
                    </SelectTrigger>
                    <SelectContent {...field}>
                      {dyeings?.data?.map((dyeing) => (
                        <SelectItem value={dyeing.name} key={dyeing.id}>
                          {dyeing.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dyeing_amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dyeing Amount </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    className="   focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-slate-400/80"
                    placeholder="Enter dyeing amount"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="dyeing_rate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dyeing Rate </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    className="   focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-slate-400/80"
                    placeholder="Enter dyeing rate"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button type="submit"> {isLoading ? "Loading" : "Submit"} </Button>
        </form>
      </Form>
    </>
  );
}
