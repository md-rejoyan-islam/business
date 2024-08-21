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
import ElahiVorsa from "@/components/ElahiVorsa";
import PageTitle from "@/components/PageTitle";

export default function AllProduct() {
  const { data: { data: products = [] } = {}, isLoading } =
    useGetAllProductsQuery();

  const processData = products?.map((product) => {
    const finishedProduct = product?.finished_products?.reduce((sum, thaan) => {
      return sum + thaan?.amount;
    }, 0);

    const gray_cost =
      product?.gray_rate && product?.gray_amount
        ? product?.gray_rate * product?.gray_amount
        : null;
    const dyeing_cost =
      product?.dyeing_rate && finishedProduct
        ? product?.dyeing_rate * finishedProduct
        : null;

    const unit_cost =
      gray_cost && dyeing_cost && finishedProduct
        ? ((gray_cost + dyeing_cost) / finishedProduct).toFixed(2)
        : null;
    const all_unit_cost =
      product?.gray_rate && product?.dyeing_rate
        ? product?.gray_rate * product?.dyeing_rate
        : null;
    // const rate_with_benefit = all_unit_cost ? all_unit_cost + 2 : null;

    return {
      // id: product?.id,
      // name: product?.name,
      gray_cost,
      dyeing_cost,
      total_unit: finishedProduct,
      unit_cost,
      all_unit_cost,

      ...product,

      // gray_rate: product?.gray_rate,
      // dyeing_rate: product?.dyeing_rate,
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
            <BreadcrumbLink className="text-black">All Products</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <ElahiVorsa />

      <PageTitle title={"All Product Data"} />

      {isLoading ? (
        <TableSkeleton />
      ) : (
        <ProductTable data={processData || []} />
      )}
    </div>
  );
}
