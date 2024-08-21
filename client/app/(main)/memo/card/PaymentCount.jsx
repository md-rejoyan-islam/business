import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { FiEdit } from "react-icons/fi";
import { toast } from "react-toastify";

export default function PaymentCount({
  allSelectedProducts,
  payment,
  setPayment,
}) {
  const totalCost = allSelectedProducts?.reduce((acc, product) => {
    acc += product?.items?.reduce((acc, item) => {
      acc += item.amount * product?.sellRate;
      return acc;
    }, 0);
    return acc;
  }, 0);

  const [open, setOpen] = React.useState(false);

  // payment
  const handlePayment = (e) => {
    e.preventDefault();

    const amount = e.target.amount.value;
    if (!amount) return toast.error("Payment amount is required");

    setPayment({
      amount: +amount,
    });

    setOpen(false);
    // toast.success("Payment added successfully");
  };

  return (
    <>
      <div className="py-3">
        <div className="px-3 overflow-hidden py-4 border bg-slate-50/40 rounded-md space-y-2 shadow-sm">
          <p className="flex gap-6 justify-between px-3 bg-slate-100 py-2">
            <span className="font-semibold">Total Price</span>
            <span>{totalCost}</span>
          </p>
          <div className="flex gap-6 px-3 bg-slate-100 justify-between py-2 group ">
            <span className="font-semibold">Paid</span>
            <p className="flex gap-2 items-center ">
              <span
                className="h-[26px] invisible group-hover:visible w-[26px] flex justify-center items-center rounded-sm bg-violet-200 hover:bg-violet-300/70 cursor-pointer  text-violet-700"
                onClick={() => {
                  setOpen(true);
                }}
              >
                <FiEdit />
              </span>
              <span>{payment?.amount ? payment?.amount : 0}</span>
            </p>
          </div>
          <p className="flex gap-6 px-3 bg-slate-100 justify-between py-2">
            <span className="font-semibold flex gap-2 items-center">
              <span> Due</span>
              <Button className="text-[12px] bg-black/5 text-black border hover:bg-black/10 hover:text-black h-fit px-2">
                Mark Paid
              </Button>
            </span>
            <span>1000</span>
          </p>
        </div>
      </div>
      <div className="flex gap-6 justify-between">
        <Dialog open={open} onOpenChange={setOpen} className="">
          <DialogTrigger
            className={`py-2 h-8 rounded-md  items-center px-3 bg-transparent active:scale-95 transition-all duration-100 text-black hover:bg-black/5    border ${
              payment?.amount ? "hidden" : "flex"
            }`}
          >
            Payment
          </DialogTrigger>
          <DialogContent className="overflow-scroll">
            <DialogHeader>
              <DialogTitle className="pb-6  text-3xl font-bold tracking-tight text-center">
                Add Payment
              </DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <form onSubmit={handlePayment}>
              <div className="pb-4">
                <Label className="block py-3">Payment Amount</Label>
                <Input
                  className="   h-10    focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-slate-400/80"
                  type="number"
                  name="amount"
                  placeholder="Enter payment amount"
                />
              </div>
              <Button type="submit">Submit</Button>
            </form>
          </DialogContent>
        </Dialog>

        <Button>Submit</Button>
      </div>
    </>
  );
}
