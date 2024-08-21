import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Toggle } from "@/components/ui/toggle";
import { useState } from "react";

export default function SelectFinishedAmount({
  product,
  setAllSelectedProducts,
  setOpen,
}) {
  const [selectedItem, setSelectedItem] = useState({
    id: "",
    name: "",
    sellRate: 0,
    items: [],
  });

  const [productSellRate, setProductSellRate] = useState("");

  const handleDone = () => {
    setAllSelectedProducts((prev) => {
      const newSelectedProducts = [...prev];
      const index = newSelectedProducts.findIndex(
        (product) => product.id === selectedItem.id
      );
      if (index === -1) {
        newSelectedProducts.push({
          ...selectedItem,
          sellRate: productSellRate,
        });
      } else {
        newSelectedProducts[index] = {
          ...selectedItem,
          sellRate: productSellRate,
        };
      }
      return newSelectedProducts;
    });
    setOpen(false);
  };

  return (
    <div className="flex-1 h-full">
      <h3 className="text-xl font-semibold text-center pt-2 pb-2">
        Finished Amount
      </h3>
      <div className="flex gap-3 border p-4 rounded-md ">
        {product?.finished_products?.map((item, index) => (
          <p
            className={`${
              item?.is_sold ? "bg-red-50" : ""
            } h-16 w-16 rounded-md border flex justify-center items-center`}
            key={index}
          >
            <Toggle
              className="h-full w-full data-[state=on]:bg-slate-200"
              disabled={item?.is_sold}
              onPressedChange={(state) => {
                setSelectedItem((prev) => {
                  if (state) {
                    return {
                      ...prev,
                      id: product.id,
                      name: product.name,
                      items: [...prev.items, item],
                    };
                  } else {
                    return {
                      ...prev,
                      items: prev.items.filter((i) => i.id !== item.id),
                    };
                  }
                });
              }}
            >
              {item?.amount}
            </Toggle>
          </p>
        ))}
      </div>
      <div className="pt-6">
        <h2 className="text-xl font-semibold text-center">Confirm Product </h2>
        <div className="mt-1  bg-slate-100 flex  p-4 rounded-md">
          <Input
            placeholder="Enter product sell rate here"
            className="  rounded-r-none h-10 border-slate-300   focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-slate-400/80"
            type="number"
            value={productSellRate}
            onChange={(e) => setProductSellRate(e.target.value)}
          />
          <Button
            className="bg-violet-600 rounded-l-none"
            disabled={!selectedItem.items.length || !productSellRate}
            onClick={handleDone}
          >
            Done
          </Button>
        </div>
      </div>
    </div>
  );
}
