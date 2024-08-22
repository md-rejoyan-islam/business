"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useGetAllCustomersQuery } from "@/features/customers/customerApi";
import Link from "next/link";
import CustomersTable from "./CustomersTable";
import PageTitle from "@/components/PageTitle";
import ElahiVorsa from "@/components/ElahiVorsa";

export default function AllCustomers() {
  const { data: { data: customers = [] } = {}, isLoading } =
    useGetAllCustomersQuery();

  const processData = customers?.map((customer) => {
    const totalAmount = customer?.products?.reduce((sum, product) => {
      const finishedSum = product?.finishedProducts?.reduce((sum, product) => {
        return sum + product?.amount;
      }, 0);

      return sum + finishedSum;
    }, 0);

    const totalCost = customer?.products?.reduce((sum, product) => {
      const finishedSum = product?.finishedProducts?.reduce((sum, product) => {
        return sum + product?.amount;
      }, 0);

      return sum + (finishedSum || 0 * product?.product_rate);
    }, 0);

    const totalPaid = customer?.customerPayments?.reduce((sum, payment) => {
      return sum + payment?.amount || 0;
    }, 0);

    return {
      id: customer?.id,
      name: customer?.name,
      address: customer?.address,
      phone: customer?.phone,
      total_amount: totalAmount || 0,
      due: totalCost - totalPaid || null,
    };
  });

  return (
    <div className=" px-4 sm:px-6 md:px-8 lg:px-10 py-2 sm:py-3  lg:py-4">
      <Breadcrumb className="">
        <BreadcrumbList>
          <BreadcrumbItem>
            <Link className="transition-colors hover:text-slate-950" href={"/"}>
              Home
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink className="text-black">
              All Customers
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <ElahiVorsa />

      <PageTitle title={"All Customers Data"} />

      <CustomersTable data={processData || []} />
    </div>
  );
}
