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
import { format } from "date-fns";
import CardLoader from "./components/home/CardLoader";
import {
  useGetAllcustomersPaymentsQuery,
  useGetAllCustomersQuery,
} from "@/features/customers/customerApi";
import { useGetAllDyeingsPaymentsQuery } from "@/features/dyeing/dyeingApi";

const today = new Date();

export default function Home() {
  //grays data
  const {
    data: { data: grays = [] } = {},
    isLoading: isGrayLoading,
    refetch: refetchGrays,
  } = useGetAllGraysQuery(`?date[eq]=${format(today, "yyyy-MM-dd")}`);

  //customers data
  const {
    data: { data: customers = [] } = {},
    isLoading: isCustomerLoading,
    refetch: refetchCustomers,
  } = useGetAllCustomersQuery(`?date[eq]=${format(today, "yyyy-MM-dd")}`);

  /// customer payments
  const {
    data: { data: customersPayments = [] } = {},
    isLoading: isCustomerPaymentsLoading,
  } = useGetAllcustomersPaymentsQuery(
    `?date[eq]=${format(today, "yyyy-MM-dd")}`
  );
  // gray payments
  const {
    data: { data: graysPayments = [] } = {},
    isLoading: isGrayPaymentsLoading,
  } = useGetAllGraysPaymentsQuery(`?date[eq]=${format(today, "yyyy-MM-dd")}`);
  // dyeing payments
  const {
    data: { data: dyeingsPayments = [] } = {},
    isLoading: isDyeingPaymentsLoading,
  } = useGetAllDyeingsPaymentsQuery(`?date[eq]=${format(today, "yyyy-MM-dd")}`);

  return (
    <main className="p-4 ">
      <ElahiVorsa />
      {/* start date  */}
      <div className="flex justify-between items-center gap-6  pt-3  px-4">
        <p className={`${siliguri.variable} font-bangla`}>
          {banglaDate(today)}
        </p>
        <p className={`${siliguri.variable} font-bangla`}>
          {arabicDate(today)} ({dayName(today)})
        </p>
        <p>{englishDate(today)}</p>
      </div>
      {/* end date  */}
      <div className="mb-10 pt-4 px-4  gap-2 flex">
        <BuyModal refetchGrays={refetchGrays} />
        <Button className="bg-black/5 hover:bg-black/10 text-black border">
          Cash Out
        </Button>
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
              <CashInCard customersPayments={customersPayments} />
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
              />
            )}
          </div>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
