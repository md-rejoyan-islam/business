"use client";
import GrayTable from "@/components/table/GrayTable";
import { useGetAllGraysQuery } from "@/features/gray/grayApi";
import TableSkeleton from "@/components/skeleton/TableSkeleton";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

export default function AllGrays() {
  const { data, isLoading } = useGetAllGraysQuery();

  const processData = data?.data?.map((gray) => {
    const totalAmount = gray?.products?.reduce((sum, product) => {
      return sum + (product?.gray_amount || 0);
    }, 0);

    const totalCost = gray?.products?.reduce((sum, product) => {
      return sum + product?.gray_amount * product?.gray_rate;
    }, 0);

    const totalPaid = gray?.products?.reduce((sum, product) => {
      return (
        sum +
        product?.gray_payments.reduce(
          (sum, payment) => sum + (payment?.amount || 0),
          0
        )
      );
    }, 0);

    return {
      id: gray?.id,
      name: gray?.name,
      address: gray?.address,
      phone: gray?.phone,
      products: gray?.products,
      total_amount: totalAmount || 0,
      due: totalCost - totalPaid || null,
    };
  });

  return (
    <div className=" p-4 sm:p-6 md:p-8 lg:p-10">
      <Breadcrumb className="">
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link className="transition-colors hover:text-slate-950" href={"/"}>
              Home
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink className="text-black">All Gray</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h2 className="pt-8 pb-4  text-3xl font-bold tracking-tight">
        All Gray Data
      </h2>

      {isLoading ? <TableSkeleton /> : <GrayTable data={processData || []} />}
    </div>
  );
}
