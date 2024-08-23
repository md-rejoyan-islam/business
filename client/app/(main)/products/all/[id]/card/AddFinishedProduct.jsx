import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { FaRegEdit } from "react-icons/fa";
import ThaanAddForm from "./ThaanAddForm";
import { useState } from "react";

export default function AddFinishedProduct({ product }) {
  const [open, setOpen] = useState();

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="py-2 h-8 rounded-md flex items-center px-3  bg-white active:scale-95 transition-all duration-100 text-black hover:bg-black/5 hover:text-blue-400 disabled:bg-black/5 disabled:text-slate-400  border">
        <FaRegEdit className="text-sm" />
      </DialogTrigger>
      <DialogContent className="overflow-scroll ">
        <DialogHeader>
          <DialogTitle className="pb-6  text-3xl font-bold tracking-tight text-center">
            Add Finished Product
          </DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <ThaanAddForm
          type="add"
          setOpen={setOpen}
          showDefect={Boolean(product.finished_products.length)}
          product={{
            id: product?.id,

            finished_products: [],
          }}
        />
      </DialogContent>
    </Dialog>
  );
}
