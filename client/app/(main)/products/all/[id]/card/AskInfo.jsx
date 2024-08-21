import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FaRegEdit } from "react-icons/fa";
import { LuCalendarDays } from "react-icons/lu";

export default function AskInfo() {
  return (
    <Card className="shadow-md">
      <CardHeader className="bg-slate-100 rounded-t-md py-3">
        <CardTitle className="text-center flex justify-between items-center">
          <span>Ask</span>
          <Button className="py-2 h-8 rounded-md flex items-center px-3 bg-white active:scale-95 transition-all duration-100 text-black hover:bg-black/5 hover:text-blue-400  border">
            <FaRegEdit />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-2">
          <p className="flex items-center justify-between gap-4 bg-slate-50 py-1 px-3 rounded-md">
            <span className="font-medium">Due Ask Rate</span>
            <span>17</span>
          </p>
          <p className="flex items-center justify-between gap-4 bg-slate-50 py-1 px-3 rounded-md">
            <span className="font-medium">Due Sell Rate</span>
            <span>17</span>
          </p>
          <p className="flex items-center justify-between gap-4 bg-slate-50 py-1 px-3 rounded-md">
            <span className="font-medium">Cash Ask Rate</span>
            <span>17</span>
          </p>
          <p className="flex items-center justify-between gap-4 bg-slate-50 py-1 px-3 rounded-md">
            <span className="font-medium">Cash Sell Rate</span>
            <span>17</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
