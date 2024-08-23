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
import {
  totalSingleCustomerAmount,
  totalSingleCustomerCost,
  totalSingleCustomerDiscount,
  totalSingleCustomerPaid,
} from "./customer.helper";

export default function AllCustomers() {
  const { data: { data: customers = [] } = {}, isLoading } =
    useGetAllCustomersQuery();

  const processData = customers?.map((customer) => {
    const totalAmount = totalSingleCustomerAmount(customer);
    const totalCost = totalSingleCustomerCost(customer);
    const totalPaid = totalSingleCustomerPaid(customer);
    const totalDiscount = totalSingleCustomerDiscount(customer);
    const totalDue =
      (totalCost && totalCost - (totalPaid + totalDiscount)) || 0;

    return {
      id: customer?.id,
      name: customer?.name,
      address: customer?.address,
      phone: customer?.phone,
      total_amount: totalAmount || 0,
      due: totalDue,
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

      <CustomersTable data={processData || []} isLoading={isLoading} />
    </div>
  );
}
