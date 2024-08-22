"use client";

import { RxCross2 } from "react-icons/rx";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { format, parse } from "date-fns";
import { useState } from "react";
import PaymentForm from "@/app/(main)/components/form/PaymentForm";
import { useCustomerChalanPaymentMutation } from "@/features/customers/customerApi";

export default function CustomerCard({ chalan }) {
  const totalChalanProductCost = chalan?.customerProducts?.reduce(
    (sum, product) => {
      const totalAmount = product?.finishedProducts?.reduce(
        (acc, item) => acc + item?.amount,
        0
      );
      return sum + product?.product_rate * totalAmount;
    },
    0
  );

  const totalChalanPayment = chalan?.payments?.reduce(
    (acc, payment) => acc + payment?.amount,
    0
  );

  const totalDue = totalChalanProductCost - totalChalanPayment;

  const [addPayment, { isLoading }] = useCustomerChalanPaymentMutation();

  const [open, setOpen] = useState();

  return (
    <Card className="h-full  min-w-[600px] hover:scale-[1.01] transition-all duration-300  drop-shadow-sm rounded-md border">
      <CardHeader className="bg-slate-200/60 rounded-t-md py-4">
        <CardTitle className="flex gap-5 justify-between items-center text-xl ">
          {/* <span>Gray Name</span> */}
          <span className="text-base">
            {chalan?.date &&
              format(
                parse(chalan?.date, "yyyy-MM-dd", new Date()),
                "d MMMM yyyy"
              )}
          </span>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger
              className="bg-black/10 disabled:bg-gray-200 disabled:hover:bg-gray-200 disabled:text-slate-500 disabled:hover:text-slate-500 rounded-md text-black text-[12px] border hover:bg-black/15 hover:text-black h-8 px-2"
              // disabled={totalCost ? false : true}
            >
              Add Payment
            </DialogTrigger>
            <DialogContent className="overflow-scroll ">
              <DialogHeader>
                <DialogTitle className="pb-6  text-3xl font-bold tracking-tight text-center">
                  Add Payment
                </DialogTitle>
                <DialogDescription></DialogDescription>
              </DialogHeader>
              <PaymentForm
                setOpen={setOpen}
                type="edit"
                addPayment={addPayment}
                dueAmount={totalDue}
                isLoading={isLoading}
                data={{
                  customerId: chalan?.customerId,
                  customerChalanId: chalan?.customerProducts[0]?.chalanId,
                }}
              />
            </DialogContent>
          </Dialog>
        </CardTitle>
      </CardHeader>
      <CardContent className="py-4 bg-[#fff] ">
        <ResizablePanelGroup
          direction="horizontal"
          className="max-w-full rounded-lg"
        >
          <ResizablePanel defaultSize={40} className="pr-5" minSize={35}>
            <div className="space-y-3">
              {chalan?.payments?.map((payment, index) => (
                <div className="flex justify-between" key={payment?.id}>
                  <p>
                    <span className="font-bold">{index + 1}. </span>
                    <span className="text-sm">
                      {payment?.date &&
                        format(
                          parse(payment?.date, "yyyy-MM-dd", new Date()),
                          "d MMMM yyyy"
                        )}
                    </span>
                  </p>
                  <p>{payment?.amount}</p>
                </div>
              ))}

              <div>
                <hr />
                <p className="flex justify-between items-center py-3">
                  <span className="font-medium">Total Payment</span>
                  <span>{totalChalanPayment}</span>
                </p>
                <div className="flex justify-between items-center pb-3">
                  <p className="flex gap-2 items-center">
                    <span>Due</span>
                    <Button className="text-[12px] bg-black/5 text-black border hover:bg-black/10 hover:text-black h-fit px-2">
                      Mark Paid
                    </Button>
                  </p>
                  <span className="text-sm text-red-500">
                    {totalChalanProductCost - totalChalanPayment}
                  </span>
                </div>
              </div>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={60} className="pr-5 pl-10" minSize={35}>
            <div className="left space-y-4 w-full  ">
              {chalan?.customerProducts?.map((product) => {
                const totalAmount = product?.finishedProducts?.reduce(
                  (acc, item) => acc + item?.amount,
                  0
                );

                return (
                  <div
                    className="bg-slate-100/80 p-2 border rounded-md shadow-[4px_4px_2px_1px__#eee]"
                    key={product?.id}
                  >
                    <p className="text-lg font-semibold">
                      <Link href={`/products/all/${product?.product?.id}`}>
                        {product?.product?.name}
                      </Link>
                    </p>
                    <p className="flex justify-between items-center">
                      <span>{totalAmount}</span>
                      <span>
                        <RxCross2 />
                      </span>
                      <span>{product?.product_rate}</span>
                      <span>=</span>
                      <span>{product?.product_rate * totalAmount}</span>
                    </p>
                  </div>
                );
              })}

              <div>
                <hr />
              </div>
              <div className="">
                <p className="flex justify-between gap-4 items-center">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-semibold">
                    {totalChalanProductCost}
                  </span>
                </p>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </CardContent>
    </Card>
  );
}
