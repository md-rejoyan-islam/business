"use client";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import { useGetGrayByIdQuery } from "@/features/gray/grayApi";
import TableSkeleton from "@/components/skeleton/TableSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { FiPhone } from "react-icons/fi";
import { IoLocationOutline } from "react-icons/io5";

import GrayCard from "./GrayCard";
import ElahiVorsa from "@/components/ElahiVorsa";
import { DatePickerWithRange } from "./DatePickerWithRange";
import { addMonths, format, parseISO } from "date-fns";
import { useState } from "react";

export default function SingleGray({ params }) {
  const { id } = params;

  const [date, setDate] = useState({
    from: addMonths(new Date(), -1),
    to: new Date(),
  });

  const from =
    date?.from &&
    format(parseISO(new Date(date?.from)?.toISOString()), "yyyy-MM-dd");
  const to =
    date?.to &&
    format(parseISO(new Date(date?.to)?.toISOString()), "yyyy-MM-dd");

  const eql = !to && from;

  const query =
    from && to && from !== to
      ? `?date[gte]=${from}&date[lte]=${to}`
      : eql
      ? `&date[eq]=${eql}`
      : from && from === to
      ? `&date[eq]=${from}`
      : "";

  const { data: { data: grayData = {} } = {}, isLoading } = useGetGrayByIdQuery(
    `${id}?${query}`
  );

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
      <div>
        <ElahiVorsa />
      </div>

      {/* infomation */}
      <div className="w-full  rounded-md pt-8 px-4 pb-5">
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
      <div className="py-3">
        <DatePickerWithRange setDate={setDate} date={date} />
      </div>

      <div className="flex gap-6 flex-wrap pb-16">
        {grayData?.chalans?.map((chalan) => (
          <GrayCard key={chalan?.id} data={chalan} />
        ))}
        {grayData?.chalans?.length === 0 && (
          <div
            className="text-center text-lg
          font-semibold w-full py-10 text-red-500"
          >
            Couldn&apos;t find any chalan data
          </div>
        )}
      </div>
    </div>
  );
}
