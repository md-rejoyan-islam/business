import { Card, CardContent } from "@/components/ui/card";

export default function CashOutCard({ graysPayments, dyeingsPayments }) {
  console.log(dyeingsPayments);

  return (
    <>
      <Card className="mt-4 bg-slate-100/60">
        <CardContent className="overflow-hidden">
          {graysPayments?.map((payment) => (
            <div
              className="py-2 bg-slate-200/40 rounded-md p-2 mt-2"
              key={payment?.id}
            >
              <p className="flex justify-between items-center gap-4 ">
                <span>{payment?.gray?.name} </span>
                <span> {payment?.amount}</span>
              </p>
            </div>
          ))}
          {dyeingsPayments?.map((payment) => (
            <div
              className="py-2 bg-slate-200/40 rounded-md p-2 mt-2"
              key={payment?.id}
            >
              <p className="flex justify-between items-center gap-4 ">
                <span>{payment?.dyeing?.name} </span>
                <span> {payment?.amount}</span>
              </p>
            </div>
          ))}

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
