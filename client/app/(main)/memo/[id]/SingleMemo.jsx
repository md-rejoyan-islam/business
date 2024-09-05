"use client";
import TableSkeleton from "@/components/skeleton/TableSkeleton";
import { Skeleton } from "@/components/ui/skeleton";
import { useGetCustomerChalanByIdQuery } from "@/features/customers/customerApi";
import React, { useEffect, useState } from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import Link from "next/link";
import CreatableSelect from "react-select/creatable";
import BuyProduct from "../card/BuyProduct";
import SelectedProduct from "../card/SelectedProduct";
import CountCost from "../card/CountCost";
import PaymentCount from "../card/PaymentCount";
import { format } from "date-fns";

export default function SingleMemo({ payments = [], products = [], customer }) {
  const [allSelectedProducts, setAllSelectedProducts] = useState(products);

  // console.log(allSelectedProducts);

  const [payment, setPayment] = useState(payments);

  useEffect(() => {
    setAllSelectedProducts(products);
  }, [products]);

  return (
    <div className="py-4">
      <Card>
        <CardContent className="p-0">
          <ResizablePanelGroup
            direction="horizontal"
            className="max-w-full rounded-lg"
          >
            <ResizablePanel defaultSize={50} minSize={30} className="pb-3 ">
              <div className="w-full ">
                <h2 className="text-xl font-medium bg-slate-100 text-center py-2">
                  Products
                </h2>
                <div
                  className={` ${
                    allSelectedProducts?.length
                      ? "justify-between"
                      : " justify-center"
                  } px-3 py-4 flex gap-6 `}
                >
                  <div>
                    {/* if product found add button show up  */}
                    <div
                      className={
                        allSelectedProducts?.length ? "pb-3" : "hidden"
                      }
                    >
                      <BuyProduct
                        setAllSelectedProducts={setAllSelectedProducts}
                        allSelectedProducts={allSelectedProducts}
                      />
                    </div>
                    <div
                      className=" flex justify-between items-center  gap-x-6 gap-y-8 w-full
                      "
                    >
                      {/* products  */}
                      <div className=" flex-1 ">
                        <SelectedProduct
                          allSelectedProducts={allSelectedProducts}
                          setAllSelectedProducts={setAllSelectedProducts}
                          type="update"
                        />
                        {!allSelectedProducts?.length && (
                          <p className=" text-red-500 py-3 text-center">
                            No product selected
                          </p>
                        )}
                      </div>
                      <div
                        className={allSelectedProducts?.length ? "hidden" : ""}
                      >
                        <BuyProduct
                          setAllSelectedProducts={setAllSelectedProducts}
                          allSelectedProducts={allSelectedProducts}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </ResizablePanel>
            <ResizableHandle withHandle />
            <ResizablePanel defaultSize={50} className="pb-3">
              <div className="w-full">
                <h2 className="text-xl font-medium bg-slate-100 text-center py-2">
                  Count
                </h2>
                <div className="px-3 py-4 flex flex-col gap-6 justify-between">
                  <CountCost allSelectedProducts={allSelectedProducts} />
                  <div>
                    <PaymentCount
                      allSelectedProducts={allSelectedProducts}
                      setPayment={setPayment}
                      payment={payment}
                      customer={customer}
                      setAllSelectedProducts={setAllSelectedProducts}
                      type={"update"}
                    />
                  </div>
                </div>
              </div>
            </ResizablePanel>
          </ResizablePanelGroup>
        </CardContent>
      </Card>
    </div>
  );
}
