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
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { useGetAllGraysQuery } from "@/features/gray/grayApi";
import { useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { useAddProductMutation } from "@/features/products/productApi";
import { useGetAllChalanQuery } from "@/features/chalan/chalanApi";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ProductForm from "@/components/form/ProductForm";

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
  gray_date: z
    .date({
      invalid_type_error: "Gray date must be date type",
    })
    .optional(),

  dyeing_rate: z
    .number({
      invalid_type_error: "Dyeing rate must be number",
    })
    .min(1, "Dyeing rate must be at least 1 character")
    .optional(),
  dyeing_date: z
    .date({
      invalid_type_error: "Dyeing date must be date type",
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

export default function AddProduct() {
  const [addProduct, { isLoading, isSuccess, error, isError, data }] =
    useAddProductMutation();
  // chalan data
  const { data: chalans } = useGetAllChalanQuery();
  const { data: grays } = useGetAllGraysQuery();

  // console.log(grays);

  const lastChalanNumber = chalans?.data[chalans?.data.length - 1].chalanNumber;

  // console.log(lastChalanNumber);

  // 1. Define your form.
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      grayName: "",
      delivery_status: "RUNNING",
      gray_amount: 0,
      gray_rate: 0,
      chalanNumber: 0,
    },
  });

  const sub = useRef(null);

  const onSubmit = (values) => {
    const { grayName } = values;
    const grayId = grays?.data.find((gray) => gray.name === grayName).id;

    delete values.grayName;
    const data = {
      ...values,
      grayId,
    };

    addProduct(data);
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
            <BreadcrumbLink className="text-black">Add Product</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="pb-6 pt-10">
        <div className="max-w-[450px] mx-auto border p-6 rounded-md shadow-xl">
          <h2 className=" pb-6  text-3xl font-bold tracking-tight text-center">
            Add Product Data
          </h2>
          <ProductForm />
        </div>
      </div>
    </div>
  );
}
