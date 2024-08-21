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

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import {
  useAddGrayMutation,
  useUpdateGrayByIdMutation,
} from "@/features/gray/grayApi";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";

const formSchema = z.object({
  name: z
    .string({
      required_error: "Gray name is required",
      invalid_type_error: "Gray name must be string",
    })
    .min(3, "Gray name must be at least 3 character"),
  address: z
    .string({
      required_error: "Gray address is required.",
      invalid_type_error: "Gray address must be string",
    })
    .min(3, "Gray address must be at least 3 character"),
  phone: z
    .string({
      required_error: "Gray phone number is required.",
      invalid_type_error: "Gray name must be string.",
    })
    .min(8, "Gray phone number must be at least 8 character"),
});

export default function GrayForm({ type = "edit", formData = {}, setOpen }) {
  const [
    updateGray,
    {
      isError: isUpdateError,
      error: updateError,
      isLoading: isUpdateLoading,
      isSuccess: isUpdateSuccess,
      data: updateData,
    },
  ] = useUpdateGrayByIdMutation();
  const [addGray, { isLoading, isSuccess, error, isError, data }] =
    useAddGrayMutation();

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: type === "update" ? formData?.name : "",
      address: type === "update" ? formData?.address : "",
      phone: type === "update" ? formData?.phone : "",
    },
  });

  const onSubmit = async (values) => {
    let errorMessage = "";
    let successMessage = "";

    // for update form
    if (type === "update") {
      const res = await updateGray({
        id: formData.id,
        data: values,
      });
      if (res.data?.success) {
        successMessage = res.data?.message;
        setOpen && setOpen(false);
      } else if (!res?.error?.data?.success) {
        errorMessage = res?.error?.data?.error?.message;
      }
    }
    // for edit form
    else if (type === "edit") {
      const res = await addGray(values);
      if (res.data?.success) {
        form.reset();
        setOpen && setOpen(false);
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
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gray Name</FormLabel>
                <FormControl>
                  <Input
                    className="   focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-slate-400/80"
                    placeholder="Enter gray name"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gray Address</FormLabel>
                <FormControl>
                  <Input
                    className="   focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-slate-400/80"
                    placeholder="Enter gray address"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gray Phone </FormLabel>
                <FormControl>
                  <Input
                    className="   focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-slate-400/80"
                    placeholder="Enter gray phone"
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
