"use client";
import { arabicDate, banglaDate, dayName, englishDate } from "@/lib/helper";
import { siliguri } from "../layout";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import BoughtCard from "./components/home/BoughtCard";
import SoldCard from "./components/home/SoldCard";
import CashInCard from "./components/home/CashInCard";
import CashOutCard from "./components/home/CashOutCard";
import CardTitle from "./components/home/CardTitle";
import { Button } from "@/components/ui/button";
import BuyModal from "./components/home/BuyModal";
import ElahiVorsa from "@/components/ElahiVorsa";
import { useGetAllGraysQuery } from "@/features/gray/grayApi";
import { format } from "date-fns";

const today = new Date();

export default function Home() {
  const {
    data: { data: grays = [] } = {},
    isLoading: isGrayLoading,
    refetch: refetchGrays,
  } = useGetAllGraysQuery(`?date[eq]=${format(today, "yyyy-MM-dd")}`);

  return (
    <main className="p-4 ">
      <ElahiVorsa />
      <div className="flex justify-between items-center gap-6  pt-3  px-4">
        <p className={`${siliguri.variable} font-bangla`}>
          {banglaDate(today)}
        </p>
        <p className={`${siliguri.variable} font-bangla`}>
          {arabicDate(today)} ({dayName(today)})
        </p>
        <p>{englishDate(today)}</p>
      </div>
      <div className="mb-10 pt-4 px-4  gap-2 flex">
        <BuyModal refetchGrays={refetchGrays} />
        <Button className="bg-black/5 hover:bg-black/10 text-black border">
          Cash Out
        </Button>
      </div>
      {/* <div className="py-4 text-center">
        <p>{dayName(today)}</p>
      </div> */}

      <ResizablePanelGroup
        direction="horizontal"
        className="max-w-full rounded-lg"
      >
        <ResizablePanel defaultSize={25} className="p-3 ">
          <div className="w-full ">
            <CardTitle title={"Bought Fabric"} />
            <BoughtCard grays={grays} />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={25} className="p-3">
          <div className="w-full">
            <CardTitle title={"Sold Fabric"} />

            <SoldCard />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={25} className="p-3">
          <div className="w-full">
            <CardTitle title={"Cash In"} />

            <CashInCard />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={25} className="p-3">
          <div className="w-full">
            <CardTitle title={"Cash Out"} />

            <CashOutCard />
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
