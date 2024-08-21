import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { LuCalendarDays } from "react-icons/lu";

export default function GrayInfo({ name, amount, rate, date, id }) {
  return (
    <Card className="shadow-md">
      <CardHeader className="bg-slate-100 rounded-t-md py-3">
        <CardTitle className="text-center flex justify-between items-center">
          <Link href={`/grays/all/${id}`}>Gray</Link>
          <span className=" flex gap-1 items-center flex-col">
            <LuCalendarDays /> <span className="text-sm">{date}</span>
          </span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-2">
          <p className="flex items-center justify-between gap-4 bg-slate-50 py-1 px-3 rounded-md">
            <span className="font-medium">Name</span>
            <span>{name}</span>
          </p>
          <p className="flex items-center justify-between gap-4 bg-slate-50 py-1 px-3 rounded-md">
            <span className="font-medium">Amount</span>
            <span>{amount}</span>
          </p>
          <p className="flex items-center justify-between gap-4 bg-slate-50 py-1 px-3 rounded-md">
            <span className="font-medium"> Rate</span>
            <span>{rate}</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
