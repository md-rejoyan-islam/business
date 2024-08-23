import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LuCalendarDays } from "react-icons/lu";

export default function ProductInfo({ product }) {
  // finished product
  const finishedProduct = product?.finished_products?.reduce((acc, product) => {
    acc += product?.amount;
    return acc;
  }, 0);

  const gAmount = product?.gray_amount;
  const gRate = product?.gray_rate;
  const difference =
    (finishedProduct && gAmount && finishedProduct - gAmount) || 0;
  // sortage furmula
  const shortage =
    difference > 0 &&
    gRate &&
    finishedProduct &&
    ((difference * gRate) / finishedProduct).toFixed(2);

  // total
  const total = "";

  return (
    <Card className="shadow-md">
      <CardHeader className="bg-slate-100 rounded-t-md py-3">
        <CardTitle className="text-center flex justify-between items-center">
          <span>Product</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <div className="space-y-2">
          <p className="flex items-center justify-between gap-4 bg-slate-50 py-1 px-3 rounded-md">
            <span className="font-medium">Received From Dyeing - Gray Lot</span>
            <span>
              {product?.dyeing_amount &&
                product?.gray_amount &&
                product?.dyeing_amount - product?.gray_amount}
            </span>
          </p>
          <p className="flex items-center justify-between gap-4 bg-slate-50 py-1 px-3 rounded-md">
            <span className="font-medium">Finished Product</span>
            <span>{finishedProduct}</span>
          </p>
          <p className="flex items-center justify-between gap-4 bg-slate-50 py-1 px-3 rounded-md">
            <span className="font-medium">Finished Product - Dyeing</span>
            <span>
              {finishedProduct &&
                product?.dyeing_amount &&
                finishedProduct - product?.dyeing_amount}
            </span>
          </p>
          <p className="flex items-center justify-between gap-4 bg-slate-50 py-1 px-3 rounded-md">
            <span className="font-medium">Shortage</span>
            <span>{shortage}</span>
          </p>
          <p className="flex items-center justify-between gap-4 bg-slate-50 py-1 px-3 rounded-md">
            <span className="font-medium">Total</span>
            <span>100</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
