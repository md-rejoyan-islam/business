import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
export default function FinishedProductInfo({ product }) {
  const [open, setOpen] = useState(false);

  return (
    <Card className="shadow-md">
      <CardHeader className="bg-slate-100 rounded-t-md py-3">
        <CardTitle className="text-center flex justify-between items-center">
          <span>Finished Product</span>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
              className="py-2 h-8 rounded-md flex items-center px-3  bg-white active:scale-95 transition-all duration-100 text-black hover:bg-black/5 hover:text-blue-400 disabled:bg-black/5 disabled:text-slate-400  border"
              disabled={!product?.dyeing_amount}
            >
              <FaRegEdit className="text-sm" />
            </DialogTrigger>
            <DialogContent className="overflow-scroll ">
              <DialogHeader>
                <DialogTitle className="pb-6  text-3xl font-bold tracking-tight text-center">
                  {product?.finished_products?.length
                    ? "Update Finished Product"
                    : "Add Finished Product"}
                </DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <ThaanAddForm product={product} setOpen={setOpen} />
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="grid grid-cols-5 ">
          <div
            className={`flex gap-6 items-center flex-wrap   ${
              product?.finished_products?.length ? "col-span-3" : "col-span-5"
            }`}
          >
            {product?.finished_products?.map((item, index) => (
              <span
                className={`${
                  item?.is_sold ? "bg-red-100" : ""
                } border min-w-12 h-12 rounded-md flex items-center justify-center`}
                key={item.id}
              >
                {item?.amount}
              </span>
            ))}

            {/* if finished_products is empty  */}
            {!product?.finished_products?.length && (
              <p className="text-center w-full text-red-500">
                No Finished Product
              </p>
            )}
          </div>
          {product?.finished_products?.length > 0 && (
            <div className="flex flex-wrap gap-4 h-full w-full justify-center col-span-2 items-center border-l ml-4 ">
              <p className="flex items-center justify-center gap-1 flex-col border p-2 w-[70px] text-sm rounded-md bg-green-50">
                <span className="font-semibold">Stock</span>
                <span>
                  {product?.finished_products.reduce((acc, item) => {
                    if (!item.is_sold) {
                      acc += item.amount;
                    }
                    return acc;
                  }, 0)}
                </span>
              </p>
              <p className="flex items-center justify-center gap-1 flex-col border p-2 w-[70px] text-sm rounded-md bg-slate-50">
                <span className="font-semibold">Sold</span>
                <span>
                  {product?.finished_products.reduce((acc, item) => {
                    if (item.is_sold) {
                      acc += item.amount;
                    }
                    return acc;
                  }, 0)}
                </span>
              </p>
              <p className="flex w-[70px] items-center justify-center gap-1 flex-col border p-2 text-sm rounded-md bg-red-50">
                <span className="font-semibold">Defect</span>
                <span>{product?.total_defected}</span>
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
