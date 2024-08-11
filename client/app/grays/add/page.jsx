import GrayForm from "@/components/form/GrayForm";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";

export default function AddGray() {
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
            <BreadcrumbLink className="text-black">Add Gray</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="pb-6 pt-10">
        <div className="max-w-[450px] mx-auto border p-6 rounded-md shadow-xl">
          <h2 className=" pb-6  text-3xl font-bold tracking-tight text-center">
            Add Gray Data
          </h2>
          <GrayForm />
        </div>
      </div>
    </div>
  );
}
