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
import ElahiVorsa from "@/components/ElahiVorsa";
import PageTitle from "@/components/PageTitle";
export default function AllDyeing() {
  const { data: { data: dyeings = [] } = {}, isLoading } =
    useGetAllDyeingsQuery();

  const processData = dyeings?.map((dyeing) => {
    const totalAmount = dyeing?.products?.reduce((sum, product) => {
      return sum + (product?.dyeing_amount || 0);
    }, 0);

    const totalCost = dyeing?.products?.reduce((sum, product) => {
      return sum + product?.dyeing_amount * product?.dyeing_rate;
    }, 0);

    const totalPaid = dyeing?.dyeingPayments?.reduce((sum, payment) => {
      return sum + (payment?.amount || 0);
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
            <BreadcrumbLink className="text-black">All Dyeing</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <ElahiVorsa />

      <PageTitle title={"All Dyeing Data"} />
      {isLoading ? <TableSkeleton /> : <DyeingTable data={processData || []} />}
    </div>
  );
}
