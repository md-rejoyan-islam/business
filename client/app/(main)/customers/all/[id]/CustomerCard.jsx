"use client";

import { RxCross2 } from "react-icons/rx";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Button } from "@/components/ui/button";

export default function CustomerCard() {
  return (
    <Card className="h-full  min-w-[600px] hover:scale-[1.01] transition-all duration-300  drop-shadow-sm rounded-md border">
      <CardHeader className="bg-slate-200/60 rounded-t-md py-4">
        <CardTitle className="flex gap-5 justify-center items-center text-xl">
          {/* <span>Gray Name</span> */}
          <span className="text-base">17 June 2024</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="py-4 bg-[#fff] ">
        <ResizablePanelGroup
          direction="horizontal"
          className="max-w-full rounded-lg"
        >
          <ResizablePanel defaultSize={40} className="pr-5" minSize={35}>
            <div className="space-y-3">
              <div className="flex justify-between">
                <p>
                  <span className="font-bold">1.</span>
                  <span> 17 June 2025</span>
                </p>
                <p>1200</p>
              </div>
              <div className="flex justify-between">
                <p>
                  <span className="font-bold">2.</span>
                  <span> 19 June 2025</span>
                </p>
                <p>1200</p>
              </div>
              <div className="flex justify-between">
                <p>
                  <span className="font-bold">2.</span>
                  <span> 24 June 2025</span>
                </p>
                <p>1200</p>
              </div>
              <div>
                <hr />
                <p className="flex justify-between items-center py-3">
                  <span>Total Payment</span>
                  <span>29000</span>
                </p>
                <div className="flex justify-between items-center pb-3">
                  <p className="flex gap-2 items-center">
                    <span>Due</span>
                    <Button className="text-[12px] bg-black/5 text-black border hover:bg-black/10 hover:text-black h-fit px-2">
                      Mark Paid
                    </Button>
                  </p>
                  <span>1200</span>
                </div>
              </div>
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={60} className="pr-5 pl-10" minSize={35}>
            <div className="left space-y-4 w-full  ">
              <div className="bg-slate-100/80 p-2 border rounded-md shadow-[4px_4px_2px_1px__#eee]">
                <p className="text-lg font-semibold">Fabric-1</p>
                <p className="flex justify-between items-center">
                  <span>120</span>
                  <span>
                    <RxCross2 />
                  </span>
                  <span>30</span>
                  <span>=</span>
                  <span>1200</span>
                </p>
              </div>
              <div className="bg-slate-100/80 p-2 border rounded-md shadow-[4px_4px_2px_1px__#eee]">
                <p className="text-lg font-semibold">Fabric-1</p>
                <p className="flex justify-between items-center">
                  <span>120</span>
                  <span>
                    <RxCross2 />
                  </span>
                  <span>30</span>
                  <span>=</span>
                  <span>1200</span>
                </p>
              </div>
              <div className="bg-slate-100/80 p-2 border rounded-md shadow-[4px_4px_2px_1px__#eee]">
                <p className="text-lg font-semibold">Fabric-1</p>
                <p className="flex justify-between items-center">
                  <span>120</span>
                  <span>
                    <RxCross2 />
                  </span>
                  <span>30</span>
                  <span>=</span>
                  <span>1200</span>
                </p>
              </div>

              <div>
                <hr />
              </div>
              <div className="">
                <p className="flex justify-between gap-4 items-center">
                  <span className="font-bold text-lg">Total</span>
                  <span className="font-semibold">7800</span>
                </p>
              </div>
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </CardContent>
    </Card>
  );
}
