"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-toastify";
import {
  useAddDyeingMutation,
  useUpdateDyeingByIdMutation,
} from "@/features/dyeing/dyeingApi";

const formSchema = z.object({
  name: z
    .string({
      required_error: "Dyeing name is required",
      invalid_type_error: "Dyeing name must be string",
    })
    .min(3, "Dyeing name must be at least 3 character"),
  address: z
    .string({
      required_error: "Dyeing address is required.",
      invalid_type_error: "Dyeing address must be string",
    })
    .min(3, "Dyeing address must be at least 3 character"),
  phone: z
    .string({
      required_error: "Dyeing phone number is required.",
      invalid_type_error: "Dyeing name must be string.",
    })
    .min(8, "Dyeing phone must be at least 8 character"),
});

export default function DyeingForm({ type = "edit", formData = {}, setOpen }) {
  const [AddDyeing, { isLoading, isSuccess, error, isError, data }] =
    useAddDyeingMutation();
  const [
    updateDyeing,
    {
      isError: isUpdateError,
      error: updateError,
      isLoading: isUpdateLoading,
      isSuccess: isUpdateSuccess,
      data: updateData,
    },
  ] = useUpdateDyeingByIdMutation();

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
      const res = await updateDyeing({
        id: formData.id,
        data: values,
      });

      if (res.data?.success) {
        successMessage = res.data?.message;
      } else if (!res?.error?.data?.success) {
        errorMessage = res?.error?.data?.error?.message;
      }
    }
    // for edit form
    else if (type === "edit") {
      const res = await AddDyeing(values);
      if (res.data?.success) {
        setOpen && setOpen(false);
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
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Dyeing Name</FormLabel>
                <FormControl>
                  <Input
                    className="   focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-slate-400/80"
                    placeholder="Enter dyeing name"
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
                <FormLabel>Dyeing Address</FormLabel>
                <FormControl>
                  <Input
                    className="   focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-slate-400/80"
                    placeholder="Enter dyeing address"
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
                <FormLabel>Dyeing Phone </FormLabel>
                <FormControl>
                  <Input
                    className="   focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-slate-400/80"
                    placeholder="Enter dyeing phone"
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
