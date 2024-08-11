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
import ProductTable from "@/components/table/ProductTable";

import { useGetAllProductsQuery } from "@/features/products/productApi";

export default function AllProduct() {
  const { data, isLoading } = useGetAllProductsQuery();

  const processData = data?.data?.map((product) => {
    const thaan_amount = product?.thaan_count?.reduce((sum, thaan) => {
      return sum + thaan?.amount;
    }, 0);

    const gray_cost =
      product?.gray_rate && product?.gray_amount
        ? product?.gray_rate * product?.gray_amount
        : null;
    const dyeing_cost =
      product?.dyeing_rate && thaan_amount
        ? product?.dyeing_rate * thaan_amount
        : null;

    const unit_cost =
      gray_cost && dyeing_cost && thaan_amount
        ? ((gray_cost + dyeing_cost) / thaan_amount).toFixed(2)
        : null;
    const all_unit_cost =
      product?.gray_rate && product?.dyeing_rate
        ? product?.gray_rate * product?.dyeing_rate
        : null;
    const rate_with_benefit = all_unit_cost ? all_unit_cost + 2 : null;

    return {
      // id: product?.id,
      // name: product?.name,
      gray_cost,
      dyeing_cost,
      total_unit: thaan_amount,
      unit_cost,
      all_unit_cost,
      rate_with_benefit,
      ...product,

      // gray_rate: product?.gray_rate,
      // dyeing_rate: product?.dyeing_rate,
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
            <BreadcrumbLink className="text-black">All Products</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <h2 className="pt-8 pb-4  text-3xl font-bold tracking-tight">
        All Product Data
      </h2>

      {isLoading ? (
        <TableSkeleton />
      ) : (
        <ProductTable data={processData || []} />
      )}
    </div>
  );
}
