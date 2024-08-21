import { Card, CardContent } from "@/components/ui/card";

export default function CashInCard() {
  return (
    <>
      <Card className="mt-4 bg-slate-100/60">
        <CardContent className="pt-4 overflow-hidden">
          <div className="py-2 bg-slate-200/40  rounded-md p-2 mt-2">
            <p className="flex justify-between items-center gap-4 ">
              <span>Customer Name</span>
              <span> 2300</span>
            </p>
          </div>
          <div className="py-2 bg-slate-200/40  rounded-md p-2 mt-2">
            <p className="flex justify-between items-center gap-4">
              <span>Customer Name</span>
              <span> 2300</span>
            </p>
          </div>
          <div className="py-2 mt-4 bg-green-100/70 rounded-md p-2 flex gap-2 justify-between items-center">
            <p className=" font-semibold py-1">Sold</p>
            <p className="flex justify-between gap-2 items-center py-1">4600</p>
          </div>
          <div className="p-2 py-2">
            <p className="flex justify-between items-center gap-4 ">
              <span className="font-semibold">Previous</span>
              <span>18000</span>
            </p>
          </div>
          <div>
            <hr />
          </div>
          <div className="p-2 py-2">
            <p className="flex justify-between items-center gap-4 ">
              <span className="font-semibold">Today&apos;s Cash</span>
              <span>18000</span>
            </p>
          </div>
          <div className="p-2 py-2">
            <p className="flex justify-between items-center gap-4 ">
              <span className="font-semibold">Cash Out</span>
              <span>8000</span>
            </p>
          </div>
          <div>
            <hr />
          </div>
          <div className="p-2 py-2">
            <p className="flex justify-between items-center gap-4 ">
              <span className="font-semibold">Total Cash In</span>
              <span>800</span>
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
