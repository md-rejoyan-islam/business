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
import ElahiVorsa from "@/components/ElahiVorsa";
import PageTitle from "@/components/PageTitle";

export default function AllGrays() {
  const { data, isLoading } = useGetAllGraysQuery();

  const processData = data?.data?.map((gray) => {
    const totalAmount = gray?.products?.reduce((sum, product) => {
      return sum + (product?.gray_amount || 0);
    }, 0);

    const totalCost = gray?.products?.reduce((sum, product) => {
      return sum + product?.gray_amount * product?.gray_rate;
    }, 0);

    const totalPaid = gray?.grayPayments?.reduce((sum, payment) => {
      return sum + (payment?.amount || 0);
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
    <div className=" px-4 sm:px-6 md:px-8 lg:px-10 py-2 sm:py-3  lg:py-4">
      <Breadcrumb>
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

      <ElahiVorsa />

      <PageTitle title={"All Gray Data"} />

      {isLoading ? <TableSkeleton /> : <GrayTable data={processData || []} />}
    </div>
  );
}
