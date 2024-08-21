import { Card, CardContent } from "@/components/ui/card";

export default function CashOutCard() {
  return (
    <>
      <Card className="mt-4 bg-slate-100/60">
        <CardContent className="overflow-hidden">
          <div className="py-2 bg-slate-200/40 rounded-md p-2 mt-2">
            <p className="flex justify-between items-center gap-4 ">
              <span>Gray Company-1 </span>
              <span> 2300</span>
            </p>
          </div>
          <div className="py-2 bg-slate-200/40 rounded-md p-2 mt-2">
            <p className="flex justify-between items-center gap-4 ">
              <span>Gray Company-2 </span>
              <span> 1900</span>
            </p>
          </div>
          <div className="py-2 bg-slate-200/40 rounded-md p-2 mt-2">
            <p className="flex justify-between items-center gap-4 ">
              <span>Dyeing Company-1 </span>
              <span> 4300</span>
            </p>
          </div>
          <div className="py-2 bg-slate-200/40 rounded-md p-2 mt-2">
            <p className="flex justify-between items-center gap-4 ">
              <span>Others </span>
              <span> 300</span>
            </p>
          </div>
          <div className="py-2 mt-4 bg-red-50/80 rounded-md p-2 flex gap-2 justify-between items-center">
            <p className=" font-semibold py-1">Total Cash Out</p>
            <p className="flex justify-between gap-2 items-center py-1">8900</p>
          </div>
        </CardContent>
      </Card>
    </>
  );
}
