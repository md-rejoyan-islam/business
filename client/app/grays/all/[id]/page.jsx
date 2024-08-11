"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
// import { Card } from "@/components/ui/card";
import Link from "next/link";
import SingleGrayTable from "@/components/table/SingleGrayTable";
import { useGetGrayByIdQuery } from "@/features/gray/grayApi";
import TableSkeleton from "@/components/skeleton/TableSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { FiPhone } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";

export default function SingleGray({ params }) {
  const { id } = params;

  const { data: { data: grayData = {} } = {}, isLoading } =
    useGetGrayByIdQuery(id);

  if (isLoading) {
    return (
      <div className="p-4 sm:p-6 md:p-8 lg:p-10">
        <Skeleton className="h-[30px] w-[300px] rounded-md" />
        <div className="mx-auto pt-6 space-y-2">
          <Skeleton className="h-[20px] w-full rounded-md" />
          <Skeleton className="h-[20px] w-full rounded-md" />
        </div>
        <TableSkeleton />;
      </div>
    );
  }

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
            <Link
              className="transition-colors hover:text-slate-950"
              href={"/grays/all"}
            >
              All Gray
            </Link>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink className="text-black">
              {grayData?.name}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      {/* <Card></Card> */}
      <div className="w-full  rounded-md pt-10 px-4 pb-3">
        <h2 className="text-3xl font-bold tracking-tight text-center">
          {grayData?.name}
        </h2>
        <div className="flex items-center justify-center gap-6 pt-2">
          <p className="flex items-center gap-2">
            <span className="font-semibold flex items-center gap-2">
              <IoLocationOutline />
              <span>Address :</span>
            </span>
            <span className="text-sm">{grayData?.address}</span>
          </p>
          <p className="flex items-center gap-2">
            <span className="font-semibold flex gap-2 items-center">
              <FiPhone /> <span>Phone:</span>
            </span>
            <span className="text-sm">{grayData?.phone}</span>
          </p>
        </div>
      </div>

      {/* <h2 className="pt-8 mb-8  text-3xl font-bold tracking-tight">
        Single Gray Data
      </h2> */}
      <SingleGrayTable data={grayData} />
    </div>
  );
}
