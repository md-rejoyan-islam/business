"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import TableSkeleton from "@/components/skeleton/TableSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetProductByIdQuery } from "@/features/products/productApi";
import SingleProductTable from "@/components/table/SingleProductTable";
import ElahiVorsa from "@/components/ElahiVorsa";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import PageTitle from "@/components/PageTitle";
import { LuCalendarDays } from "react-icons/lu";
import { Button } from "@/components/ui/button";
import { FaRegEdit } from "react-icons/fa";
import ProductInformation from "./card/ProductInformation";
import GrayInfo from "./card/GrayInfo";
import { format, parse } from "date-fns";
import DyeingInfo from "./card/DyeingInfo";
import ProductInfo from "./card/ProductInfo";
import AskInfo from "./card/AskInfo";
import FinishedProductInfo from "./card/FinishedProductInfo";

export default function SingleProduct({ params }) {
  const { id } = params;

  const { data: { data: productData = {} } = {}, isLoading } =
    useGetProductByIdQuery(id);

  console.log(productData);

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 md:p-8 lg:p-10">
        <Skeleton className="h-[30px] w-[300px] rounded-md" />
        <div className="mx-auto pt-6 space-y-2">
          <Skeleton className="h-[20px] w-full rounded-md" />
          <Skeleton className="h-[20px] w-full rounded-md" />
        </div>
        <TableSkeleton />;
      </div>
    );
  }

  return (
    <div className="px-4 sm:px-6 md:px-8 lg:px-10 py-2 sm:py-3  lg:py-4">
      <Breadcrumb className="">
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link className="transition-colors hover:text-slate-950" href={"/"}>
              Home
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <Link
              className="transition-colors hover:text-slate-950"
              href={"/products/all"}
            >
              All Product
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink className="text-black">
              {productData?.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <ElahiVorsa />

      {/* product information  */}
      <ProductInformation
        name={productData?.name}
        id={productData?.id}
        status={productData?.delivery_status}
      />

      <div className="py-10 grid lg:grid-cols-2 gap-6 ">
        {/* gray info  */}
        <GrayInfo
          name={productData?.gray?.name}
          amount={productData?.gray_amount}
          rate={productData?.gray_rate}
          id={productData?.gray?.id}
          date={
            productData?.gray_date &&
            format(
              parse(productData?.gray_date, "yyyy-MM-dd", new Date()),
              "d MMMM yyyy"
            )
          }
        />
        {/* dyeing info  */}
        <DyeingInfo
          name={productData?.dyeing?.name}
          amount={productData?.dyeing_amount}
          id={productData?.dyeing?.id}
          rate={productData?.dyeing_rate}
          date={
            productData?.dyeing_date &&
            format(
              parse(productData?.dyeing_date, "yyyy-MM-dd", new Date()),
              "d MMMM yyyy"
            )
          }
        />

        {/* product info  */}
        <ProductInfo product={productData} />

        {/* ask info  */}
        <AskInfo />

        {/* finished product info  */}
        <FinishedProductInfo product={productData} />
      </div>
    </div>
  );
}
