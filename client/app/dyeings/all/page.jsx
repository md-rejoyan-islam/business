"use client";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

import DyeingTable from "@/components/table/DyeingTable";
import TableSkeleton from "@/components/skeleton/TableSkeleton";
import { useGetAllDyeingsQuery } from "@/features/dyeing/dyeingApi";
export default function AllDyeing() {
  const { data, isLoading } = useGetAllDyeingsQuery();

  const processData = data?.data?.map((dyeing) => {
    const totalAmount = dyeing?.products?.reduce((sum, product) => {
      return sum + (product?.dyeing_amount || 0);
    }, 0);

    const totalCost = dyeing?.products?.reduce((sum, product) => {
      return sum + product?.dyeing_amount * product?.dyeing_rate;
    }, 0);

    console.log(totalCost);

    const totalPaid = dyeing?.products?.reduce((sum, product) => {
      return (
        sum +
        product?.dyeing_payments.reduce(
          (sum, payment) => sum + (payment?.amount || 0),
          0
        )
      );
    }, 0);
    return {
      id: dyeing?.id,
      name: dyeing?.name,
      address: dyeing?.address,
      phone: dyeing?.phone,
      products: dyeing?.products,
      total_amount: totalAmount || 0,
      due: totalCost - totalPaid || null,
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
            <BreadcrumbLink className="text-black">All Dyeing</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h2 className="pt-8 pb-4  text-3xl font-bold tracking-tight">
        All Dyeing Data
      </h2>
      {isLoading ? <TableSkeleton /> : <DyeingTable data={processData || []} />}
    </div>
  );
}
