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

  const processData = customers?.map((gray) => {
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
