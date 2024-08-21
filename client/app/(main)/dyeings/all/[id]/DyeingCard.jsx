"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { format, parseISO } from "date-fns";
import { FaCalendarDays } from "react-icons/fa6";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import GrayPaymentForm from "@/components/form/GrayPaymentForm";
import EditDyeingCard from "./EditDyeingCard";
import { EditGrayPayment } from "@/app/(main)/grays/all/[id]/EditGrayPayment";

export default function DyeingCard({ data }) {
  const totalCost = data?.products.reduce((sum, product) => {
    return sum + (product?.dyeing_amount * product?.dyeing_rate || 0);
  }, 0);

  const totalPayment =
    data?.payments?.reduce((sum, payment) => {
      return sum + payment?.amount;
    }, 0) || 0;

  const totalDue = totalCost - totalPayment;

  const [open, setOpen] = useState();
  return (
    <Card className="h-full  min-w-[600px] hover:scale-[1.01]  transition-all duration-300  drop-shadow-sm rounded-md border">
      <CardHeader className="bg-slate-200/60 rounded-t-md py-4">
        <CardTitle className="flex gap-5 justify-between items-center text-xl">
          <span className="text-base flex gap-2 items-center">
            <FaCalendarDays />
            {data?.date ? format(parseISO(data?.date), "d MMMM  yyyy") : " "}
          </span>
          <div className="flex items-center gap-2">
            <Dialog>
              <DialogTrigger
                className="bg-black/10 disabled:bg-gray-200 disabled:hover:bg-gray-200 disabled:text-slate-500 disabled:hover:text-slate-500 rounded-md text-black text-[12px] border hover:bg-black/15 hover:text-black h-8 px-2"
                // disabled={totalCost ? false : true}
              >
                Edit
              </DialogTrigger>
              <DialogContent className="overflow-scroll ">
                <DialogHeader>
                  <DialogTitle className="pb-6  text-3xl font-bold tracking-tight text-center">
                    Edit Dyeing
                  </DialogTitle>
                  <DialogDescription></DialogDescription>
                </DialogHeader>
                <EditDyeingCard
                  type="edit"
                  // setOpen={setOpen}
                  data={data}
                  products={data?.products}
                  // from="dyeing"
                  // due={totalDue}
                />
              </DialogContent>
            </Dialog>
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger
                className="bg-black/10 disabled:bg-gray-200 disabled:hover:bg-gray-200 disabled:text-slate-500 disabled:hover:text-slate-500 rounded-md text-black text-[12px] border hover:bg-black/15 hover:text-black h-8 px-2"
                disabled={totalCost ? false : true}
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
                <GrayPaymentForm
                  type="edit"
                  setOpen={setOpen}
                  data={data}
                  from="dyeing"
                  due={totalDue}
                />
              </DialogContent>
            </Dialog>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="py-4 bg-[#fff] ">
        <ResizablePanelGroup
          direction="horizontal"
          className="max-w-full rounded-lg"
        >
          <ResizablePanel defaultSize={60} className="pr-5" minSize={35}>
            <div className="left space-y-4 w-full  ">
              {data?.products?.map((product) => (
                <div
                  className="bg-slate-100/80 p-2 border rounded-md shadow-[4px_4px_2px_1px__#eee]"
                  key={product?.id}
                >
                  <p className="text-lg font-semibold">{product?.name}</p>
                  <p className="flex justify-between items-center">
                    <span>Gray Order</span>
                    <span>{product?.gray_amount}</span>
                  </p>
                  <p className="flex justify-between items-center">
                    <span>Dyeing Amount</span>
                    <span>{product?.dyeing_amount}</span>
                  </p>
                  <p className="flex justify-between items-center">
                    <span>Dyeing Rate</span>
                    <span>{product?.dyeing_amount}</span>
                  </p>
                  <p className="flex justify-between items-center ">
                    <span>Difference</span>
                    <span>
                      {product?.gray_amount && product?.dyeing_amount
                        ? product?.gray_amount - product?.dyeing_amount
                        : null}
                    </span>
                  </p>
                  <p className="flex justify-between items-center ">
                    <span>Finished Product</span>
                    <span>{product?.finishedProduct}</span>
                  </p>
                  <p className="flex justify-between items-center ">
                    <span>Finished Product * Rate</span>
                    <span>
                      {product?.finishedProduct * product?.dyeing_rate || ""}
                    </span>
                  </p>
                  {/* <p className="flex gap-4 justify-between items-center">
                  <span>Thaan Amount * Rate</span>
                  <span>1200</span>
                </p> */}
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
                        from="dyeing"
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
