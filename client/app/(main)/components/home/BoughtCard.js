import { Card, CardContent } from "@/components/ui/card";

export default function BoughtCard({ grays }) {
  const chalans = grays
    ?.reduce((acc, gray) => {
      return [...acc, ...gray?.chalans];
    }, [])
    ?.sort(
      (a, b) =>
        new Date(b?.createAt).getTime() - new Date(a?.createAt).getTime()
    );

  return (
    <>
      {chalans?.map((chalan) => (
        <Card className="mt-4 bg-slate-100/30" key={chalan?.id}>
          <CardContent className="overflow-hidden">
            <h4 className="text-center text-lg pt-3 font-semibold pb-3 text-nowrap">
              {chalan?.gray?.name}
            </h4>

            {chalan?.products?.map((product) => (
              <div
                className="py-2 bg-slate-200/40 rounded-md p-2 mt-3 shadow-[4px_4px_2px_1px__#eee] border"
                key={product.id}
              >
                <p className=" font-semibold py-1">{product?.name}</p>
                <p className="flex justify-between gap-2 items-center py-1">
                  <span title="Amount">{product?.gray_amount}</span>
                  <span>x</span>
                  <span title="Rate">{product?.gray_rate}</span>
                  <span>=</span>
                  <span title="Total">
                    {product?.gray_amount * product?.gray_rate}
                  </span>
                </p>
              </div>
            ))}

            <div className="py-2 mt-4 bg-green-100/50 border rounded-md p-2 flex gap-2 justify-between items-center shadow-sm ">
              <p className=" font-semibold">Total</p>
              <p className="flex justify-between gap-2 items-center py-1 font-medium">
                2400
              </p>
            </div>
          </CardContent>
        </Card>
      ))}
      {!chalans?.length ? (
        <div className="py-2">
          <p className="text-red-500 font-medium text-center ">
            No product buy.
          </p>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
