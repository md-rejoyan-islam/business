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
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Calendar } from "../ui/calendar";
import { format, formatISO } from "date-fns";
import { CalendarIcon } from "lucide-react";

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
  gray_date: z.coerce.date({
    required_error: "Gray date is required.",
    invalid_type_error: "Gray date must be date",
  }),
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
  dyeing_date: z.date().optional(),
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

  const { data: grays, isLoading } = useGetAllGraysQuery();
  const { data: dyeings } = useGetAllDyeingsQuery();

  const defaultValues = {
    name: type === "update" ? formData?.name : "",
    grayName: type === "update" ? formData?.gray?.name : "",
    delivery_status: type === "update" ? formData?.delivery_status : "RUNNING",
    gray_amount: type === "update" ? formData?.gray_amount : 0,
    gray_rate: type === "update" ? formData?.gray_rate : 0,

    dyeing_amount: type === "update" ? formData?.dyeing_amount || 0 : 0,
    dyeing_name: type === "update" ? formData?.dyeing?.name || "" : "",
    dyeing_rate: type === "update" ? formData?.dyeing_rate || 0 : 0,
    gray_date: type === "update" ? formData?.gray_date : "",
  };

  if (type === "update") {
    defaultValues.gray_date = new Date(formData?.gray_date);
    // defaultValues.dyeing_date = new Date(formData?.dyeing_date)
  }

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      ...defaultValues,
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
            name="gray_date"
            type="date"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Gray Date</FormLabel>
                <Popover modal={true}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button className="bg-transparent border hover:bg-black/5 text-black">
                        {field?.value ? (
                          format(field?.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field?.value}
                      onSelect={field?.onChange}
                      defaultValue={new Date()}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>

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
