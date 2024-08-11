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

      {/* <div className="w-full  rounded-md pt-10 px-4 pb-3">
        <h2 className="text-3xl font-bold tracking-tight text-center">
          {productData?.name}
        </h2>
        <div className="flex items-center justify-center gap-6 pt-2">
          <p className="flex items-center gap-2">
            <span className="font-semibold flex items-center gap-2">
              <IoLocationOutline />
              <span>Id :</span>
            </span>
            <span className="text-sm">{grayData?.address}</span>
          </p>
          <p className="flex items-center gap-2">
            <span className="font-semibold flex gap-2 items-center">
              <FiPhone /> <span>Phone:</span>
            </span>
            <span className="text-sm">{grayData?.phone}</span>
          </p>
        </div>
      </div> */}
      <SingleProductTable data={productData} />
    </div>
  );
}
