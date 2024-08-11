"use client";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useGetAllGraysQuery } from "@/features/gray/grayApi";
import { useEffect } from "react";
import { toast } from "react-toastify";
import { useAddChalanMutation } from "@/features/chalan/chalanApi";

const formSchema = z.object({
  chalanNumber: z.coerce
    .number({
      required_error: "Chalan number is required",
      invalid_type_error: "Chalan number must be number",
    })
    .min(1, "Chalan number must be at least 1 character"),
  grayName: z
    .string({
      required_error: "Gray name is required.",
      invalid_type_error: "Gray name must be string",
    })
    .min(1, "Gray name must be at least 1 character"),
});

export default function AddChalan() {
  const [AddChalan, { isLoading, isSuccess, error, isError, data }] =
    useAddChalanMutation();
  const { data: grays } = useGetAllGraysQuery();

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      chalanNumber: 0,
      grayName: "",
    },
  });

  const onSubmit = (values) => {
    const { grayName } = values;
    const grayId = grays?.data.find((gray) => gray.name === grayName).id;

    delete values.grayName;

    AddChalan({
      grayId,
      chalanNumber: values.chalanNumber,
    });
  };

  useEffect(() => {
    if (isError) toast.error(error?.data?.error?.message);
    else if (isSuccess) {
      toast.success(data?.message);
      form.reset();
    }
  }, [isError, error?.data?.error?.message, isSuccess, data?.message, form]);

  return (
    <div className="p-4 sm:p-6 md:p-8 lg:p-10">
      <Breadcrumb className="">
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link className="transition-colors hover:text-slate-950" href={"/"}>
              Home
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink className="text-black">Add Chalan</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="pb-6 pt-10">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 max-w-[450px] mx-auto border p-6 rounded-md shadow-xl"
          >
            <h2 className=" pb-2  text-3xl font-bold tracking-tight text-center">
              Add Chalan Data
            </h2>
            <FormField
              control={form.control}
              name="chalanNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chalan Number</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
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
                    <Select onValueChange={field.onChange}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Gray Name" />
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

            <Button type="submit"> {isLoading ? "Loading" : "Submit"} </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
