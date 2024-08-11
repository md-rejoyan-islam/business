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

import { useGetAllChalanQuery } from "@/features/chalan/chalanApi";
import ChalanTable from "@/components/table/ChalanTable";
export default function AllChalan() {
  const { data, isLoading } = useGetAllChalanQuery();

  const processData = data?.data?.map((chalan) => {
    return {
      id: chalan?.id,
      chalan_number: chalan?.chalanNumber,
      gray_name: chalan?.gray?.name,
      dyeing_name: chalan?.dyeing?.name,
      product_name: chalan?.product?.name,
      status: chalan?.product?.delivery_status,
    };
  });

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
            <BreadcrumbLink className="text-black">All Chalan</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h2 className="pt-8 pb-4  text-3xl font-bold tracking-tight">
        All Chalan Data
      </h2>
      {isLoading ? <TableSkeleton /> : <ChalanTable data={processData || []} />}
    </div>
  );
}
