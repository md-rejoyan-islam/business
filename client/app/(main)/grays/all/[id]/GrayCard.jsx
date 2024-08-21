"use client";

import { RxCross2 } from "react-icons/rx";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { format, parseISO } from "date-fns";
import { FaRunning } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import GrayPaymentForm from "@/components/form/GrayPaymentForm";
import { useState } from "react";
import { EditGrayPayment } from "./EditGrayPayment";
import Link from "next/link";

export default function GrayCard({ data }) {
  const totalCost = data?.products.reduce((sum, product) => {
    return sum + (product?.gray_amount * product?.gray_rate || 0);
  }, 0);

  const totalPayment =
    data?.payments?.reduce((sum, payment) => {
      return sum + payment?.amount;
    }, 0) || 0;

  const totalDue = totalCost - totalPayment;

  const [open, setOpen] = useState();

  console.log(data);

  return (
    <Card className="h-full  min-w-[600px] hover:scale-[1.01] transition-all duration-500 delay-200 ">
      <CardHeader className="bg-slate-200 rounded-t-md py-4">
        <CardTitle className="flex gap-5 justify-between items-center text-xl">
          <span className="text-base">
            {format(parseISO(data?.date), "d MMMM  yyyy")}
          </span>

          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger className="bg-black/10 rounded-md text-black text-[12px] border hover:bg-black/15 hover:text-black h-8 px-2">
              Add Payment
            </DialogTrigger>
            <DialogContent className="overflow-scroll ">
              <DialogHeader>
                <DialogTitle className="pb-6  text-3xl font-bold tracking-tight text-center">
                  Add Payment
                </DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <GrayPaymentForm
                type="edit"
                setOpen={setOpen}
                data={data}
                due={totalDue}
              />
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent className="py-4 bg-[#f8fafc4f]  ">
        <ResizablePanelGroup
          direction="horizontal"
          className="max-w-full rounded-lg"
        >
          <ResizablePanel defaultSize={60} className="pr-5" minSize={35}>
            <div className="left space-y-4 w-full">
              {data?.products?.map((product) => (
                <div
                  className="bg-slate-100/80 p-2 space-y-1 border rounded-md shadow-[4px_4px_2px_1px__#eee]"
                  key={product.id}
                >
                  <p className="text-xl py-1 font-semibold flex justify-between items-center">
                    <Link href={`/products/all/${product?.id}`}>
                      {product?.name}
                    </Link>
                    <span className="flex gap-2 items-center text-sm text-slate-500 uppercase">
                      <FaRunning />{" "}
                      <span className="text-[12px]">
                        {product?.delivery_status}
                      </span>
                    </span>
                  </p>

                  {product?.dyeing?.name ? (
                    <p className="flex justify-between items-center text-[15px]">
                      <span>Dyeing</span>
                      <span className="flex gap-2 items-center text-sm text-slate-500 uppercase">
                        {product?.dyeing?.name}
                      </span>
                    </p>
                  ) : (
                    ""
                  )}

                  <p className="flex justify-between items-center text-[15px]">
                    <span title="Amount">{product?.gray_amount}</span>
                    <span>
                      <RxCross2 />
                    </span>
                    <span title="Rate">{product?.gray_rate}</span>
                    <span>=</span>
                    <span>{product?.gray_amount * product?.gray_rate}</span>
                  </p>
                </div>
              ))}

              {data?.products?.length ? (
                <>
                  <hr />
                  <div className="">
                    <p className="flex justify-between gap-4 items-center">
                      <span className="font-bold text-lg">Total</span>
                      <span className="font-semibold">{totalCost}</span>
                    </p>
                  </div>
                </>
              ) : (
                ""
              )}
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />

          {/* payment  */}
          <ResizablePanel defaultSize={40} className="pl-5" minSize={35}>
            <div className="space-y-3">
              {/* payments */}
              {data?.payments?.map((payment, index) => (
                <div
                  className="flex justify-between group show-edit relative "
                  key={payment.id}
                >
                  <p className="flex items-center">
                    <span className="font-bold">{index + 1}.</span>
                    <span className="text-sm">
                      &nbsp;
                      {format(parseISO(payment?.date), "d MMMM  yyyy")}
                    </span>
                  </p>
                  <div className="font-medium flex gap-3  items-center">
                    <div className=" invisible   group-hover:visible ">
                      <EditGrayPayment
                        data={data}
                        payment={payment}
                        due={totalDue}
                      />
                    </div>
                    <span>{payment?.amount}</span>
                  </div>
                </div>
              ))}

              {/* divider  */}
              {data?.payments?.length ? <hr /> : ""}

              {/* total  payment and due  */}
              {totalPayment ? (
                <div>
                  <p className="flex justify-between items-center py-3 font-semibold">
                    <span>Total Payment</span>
                    <span className=" font-medium">{totalPayment}</span>
                  </p>
                  <div className="flex justify-between items-center pb-3">
                    <p className="flex gap-2 items-center font-semibold">
                      <span>Due</span>
                      <Button className="text-[12px] bg-black/5 text-black border hover:bg-black/10 hover:text-black h-fit px-2">
                        Mark Paid
                      </Button>
                    </p>
                    <span className="text-red-500">{totalDue}</span>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-red-500 py-4 text-center">
                  No Payment Found
                </p>
              )}
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </CardContent>
    </Card>
  );
}
