import { Card, CardContent } from "@/components/ui/card";

export default function SoldCard() {
  return (
    <>
      <Card className="mt-4 bg-slate-100/60">
        <CardContent className="overflow-hidden">
          <h4 className="text-center text-lg pt-3 font-semibold pb-3 text-nowrap">
            Customer Name
          </h4>

          <div className="py-2 bg-slate-200/40 rounded-md p-2 mt-2">
            <p className=" font-semibold py-1">Febric-1</p>
            <p className="flex justify-between gap-2 items-center py-1">
              <span title="Amount">120</span>
              <span>x</span>
              <span title="Rate">30</span>
              <span>=</span>
              <span title="Total"> 1200</span>
            </p>
          </div>
          <div className="py-2 bg-slate-200/40 rounded-md p-2 mt-2">
            <p className=" font-semibold py-1">Febric-2</p>
            <p className="flex justify-between gap-2 items-center py-1">
              <span title="Amount">120</span>
              <span>x</span>
              <span title="Rate">30</span>
              <span>=</span>
              <span title="Total"> 1200</span>
            </p>
          </div>
          <div className="py-2 mt-2 bg-slate-200/40 rounded-md p-2">
            <p className=" font-semibold py-1">Febric-1</p>
            <p className="flex justify-between gap-2 items-center py-1">
              <span title="Amount">120</span>
              <span>x</span>
              <span title="Rate">30</span>
              <span title="Total">=</span>
              <span>1200</span>
            </p>
          </div>
          <div className="py-2 mt-4 bg-green-100/70 rounded-md p-2 flex gap-2 justify-between items-center">
            <p className=" font-semibold py-1">Total</p>
            <p className="flex justify-between gap-2 items-center py-1">2400</p>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
