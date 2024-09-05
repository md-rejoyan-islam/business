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
import {
  useGetAllGraysPaymentsQuery,
  useGetAllGraysQuery,
} from "@/features/gray/grayApi";
import { addMonths, format, parseISO } from "date-fns";
import CardLoader from "./components/home/CardLoader";
import {
  useGetAllcustomersPaymentsQuery,
  useGetAllCustomersQuery,
} from "@/features/customers/customerApi";
import { useGetAllDyeingsPaymentsQuery } from "@/features/dyeing/dyeingApi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import CashOutTab from "./components/home/CashOutTab";
import { DatePickerWithRange } from "./grays/all/[id]/DatePickerWithRange";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { useGetDailyByDateQuery } from "@/features/daily/dailyApi";

const today = new Date();

export default function Home() {
  const [date, setDate] = useState(today);

  //grays data
  const {
    data: { data: grays = [] } = {},
    isLoading: isGrayLoading,
    refetch: refetchGrays,
  } = useGetAllGraysQuery(
    `?date[eq]=${date ? format(date, "yyyy-MM-dd") : ""}`
  );

  //customers data
  const {
    data: { data: customers = [] } = {},
    isLoading: isCustomerLoading,
    refetch: refetchCustomers,
  } = useGetAllCustomersQuery(
    `?date[eq]=${date ? format(date, "yyyy-MM-dd") : ""}`
  );

  /// customer payments
  const {
    data: { data: customersPayments = [] } = {},
    isLoading: isCustomerPaymentsLoading,
  } = useGetAllcustomersPaymentsQuery(
    `?date[eq]=${date ? format(date, "yyyy-MM-dd") : ""}`
  );
  // gray payments
  const {
    data: { data: graysPayments = [] } = {},
    isLoading: isGrayPaymentsLoading,
  } = useGetAllGraysPaymentsQuery(
    `?date[eq]=${date ? format(date, "yyyy-MM-dd") : ""}`
  );
  // dyeing payments
  const {
    data: { data: dyeingsPayments = [] } = {},
    isLoading: isDyeingPaymentsLoading,
  } = useGetAllDyeingsPaymentsQuery(
    `?date[eq]=${date ? format(date, "yyyy-MM-dd") : ""}`
  );

  // daily cash

  const { data: { data: dailyCash = {} } = {} } = useGetDailyByDateQuery(
    `${date ? format(date, "yyyy-MM-dd") : ""}`
  );

  const [open, setOpen] = useState();

  return (
    <main className="p-4 ">
      <ElahiVorsa />

      {/* start date  */}
      <div className="flex justify-between items-center gap-6  pt-3  px-4">
        <p className={`${siliguri.variable} font-bangla`}>{banglaDate(date)}</p>
        <p className={`${siliguri.variable} font-bangla`}>
          {arabicDate(date)} ({dayName(date)})
        </p>
        <p>{englishDate(date)}</p>
      </div>
      {/* end date  */}

      {/* date picker */}
      <div className="pt-5 px-4">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-[280px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>

      <div className="mb-10 py-4 px-4  gap-2 flex">
        <BuyModal refetchGrays={refetchGrays} />
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger className="py-2 h-8 bg-black/5 hover:bg-black/10 rounded-md flex items-center px-3 active:scale-95 transition-all duration-100 text-black    border">
            Cash Out
          </DialogTrigger>
          <DialogContent className="overflow-scroll ">
            <DialogHeader>
              <DialogTitle className="pb-6  text-3xl font-bold tracking-tight text-center">
                Cash Out
              </DialogTitle>
              <DialogDescription></DialogDescription>
            </DialogHeader>
            <CashOutTab setOpen={setOpen} />
          </DialogContent>
        </Dialog>
      </div>

      <ResizablePanelGroup
        direction="horizontal"
        className="max-w-full rounded-lg mb-12"
      >
        <ResizablePanel defaultSize={25} className="p-3 ">
          <div className="w-full ">
            <CardTitle title={"Bought Fabric"} />

            {isGrayLoading ? <CardLoader /> : <BoughtCard grays={grays} />}
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={25} className="p-3">
          <div className="w-full">
            <CardTitle title={"Sold Fabric"} />
            {isCustomerLoading ? (
              <CardLoader />
            ) : (
              <SoldCard customers={customers} />
            )}
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={25} className="p-3">
          <div className="w-full">
            <CardTitle title={"Cash In"} />

            {isCustomerPaymentsLoading ? (
              <CardLoader />
            ) : (
              <CashInCard
                customersPayments={customersPayments}
                dailyCash={dailyCash}
                graysPayments={graysPayments}
                dyeingsPayments={dyeingsPayments}
              />
            )}
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={25} className="p-3">
          <div className="w-full">
            <CardTitle title={"Cash Out"} />

            {isGrayPaymentsLoading ? (
              <CardLoader />
            ) : (
              <CashOutCard
                graysPayments={graysPayments}
                dyeingsPayments={dyeingsPayments}
                dailyCash={dailyCash}
              />
            )}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
