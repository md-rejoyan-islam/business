import ElahiVorsa from "@/components/ElahiVorsa";
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
            <BreadcrumbLink className="text-black">Add Gray</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <ElahiVorsa />

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
