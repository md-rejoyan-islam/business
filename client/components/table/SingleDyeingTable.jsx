const dyeingData = {
  id: 1,
  name: "Dyeing-1",
  address: "Dhaka",
  phone: "01700000000",
  products: [
    {
      id: 1,
      name: "product-1",
      chalanId: 1000,
      gray_amount: 100,
      gray_rate: 60,
      gray_date: "1 june",
      gray_payment_status: "paid",
      delivery_status: "in mile",
      dyeingId: 101,
      dyeing_date: "2june",
      dyeing_payment_status: false,
      dyeing: {
        name: "Dyeing Name",
      },
      gray: {
        name: "Gray Name",
      },
      dyeing_rate: 60,
      thaan_amount: 30,
      dyeing_payments: [
        {
          id: 1,
          amount: 1000,
          date: "1 june",
        },
        {
          id: 2,
          amount: 2000,
          date: "2 june",
        },
        {
          id: 3,
          amount: 4000,
          date: "2 june",
        },
      ],
      gray_payments: [
        // {
        //   id: 1,
        //   amount: 1000,
        //   date: "1 june",
        // },
        // {
        //   id: 2,
        //   amount: 2000,
        //   date: "2 june",
        // },
        // {
        //   id: 3,
        //   amount: 5000,
        //   date: "2 june",
        // },
      ],
    },
    {
      id: 2,
      name: "product-2",
      chalanId: 1000,
      gray_amount: 85,
      gray_rate: 20,
      gray_date: "1 june",
      gray_payment_status: "paid",
      deliver_status: "in mile",
      dyeing_rate: 60,
      thaan_amount: 85,
      dyeing_payments: [
        {
          id: 1,
          amount: 400,
          date: "1 june",
        },
        {
          id: 2,
          amount: 200,
          date: "2 june",
        },
      ],
      gray_payments: [
        // {
        //   id: 1,
        //   amount: 100,
        //   date: "1 june",
        // },
        // {
        //   id: 1,
        //   amount: 100,
        //   date: "1 june",
        // },
        // {
        //   id: 1,
        //   amount: 100,
        //   date: "1 june",
        // },
        // {
        //   id: 2,
        //   amount: 200,
        //   date: "2 june",
        // },
      ],
    },
    {
      id: 2,
      name: "product-2",
      chalanId: 1000,
      gray_amount: 85,
      gray_rate: 20,
      gray_date: "1 june",
      gray_payment_status: "paid",
      deliver_status: "in mile",
      dyeing_rate: 60,
      thaan_amount: 85,
      dyeing_payments: [
        {
          id: 1,
          amount: 400,
          date: "1 june",
        },
        {
          id: 2,
          amount: 200,
          date: "2 june",
        },
      ],
      gray_payments: [],
    },
    {
      id: 2,
      name: "product-2",
      chalanId: 1000,
      gray_amount: 85,
      gray_rate: 20,
      gray_date: "1 june",
      gray_payment_status: "paid",
      deliver_status: "in mile",
      dyeing_rate: 60,
      thaan_amount: 85,
      dyeing_payments: [
        {
          id: 1,
          amount: 400,
          date: "1 june",
        },
        {
          id: 2,
          amount: 200,
          date: "2 june",
        },
      ],
      gray_payments: [
        {
          id: 1,
          amount: 100,
          date: "1 june",
        },
        {
          id: 1,
          amount: 100,
          date: "1 june",
        },
        // {
        //   id: 1,
        //   amount: 100,
        //   date: "1 june",
        // },
        // {
        //   id: 2,
        //   amount: 200,
        //   date: "2 june",
        // },
      ],
    },
  ],
};

import dyeingTableData from "./dyeingTableData";
import HtmlContent from "./HtmlContent";

export default function SingleDyeingTable() {
  return (
    <div className="overflow-hidden p-6">
      <h2>SingleGrayTable</h2>

      <div className=" overflow-auto">
        <table className="w-full caption-bottom  text-sm border-collapse border rounded-md overscroll-hidden">
          <thead className="[&_tr]:border-b rounded-t-md">
            <tr className="border-b transition-colors hover:bg-slate-100/50 data-[state=selected]:bg-slate-100 dark:hover:bg-slate-800/50 dark:data-[state=selected]:bg-slate-800">
              <th className=" border border-collapse h-12 px-4 text-left align-middle font-medium text-slate-500 [&:has([role=checkbox])]:pr-0 dark:text-slate-400">
                ID
              </th>
              <th className=" border border-collapse h-12 px-4 text-left align-middle font-medium text-slate-500 [&:has([role=checkbox])]:pr-0 dark:text-slate-400">
                Name
              </th>
              <th className=" border border-collapse h-12 px-4 text-left align-middle font-medium text-slate-500 [&:has([role=checkbox])]:pr-0 dark:text-slate-400">
                Address
              </th>
              <th className=" border border-collapse h-12 px-4 text-left align-middle font-medium text-slate-500 [&:has([role=checkbox])]:pr-0 dark:text-slate-400">
                Phone
              </th>
              <th className=" border border-collapse h-12 px-4 text-left align-middle font-medium text-slate-500 [&:has([role=checkbox])]:pr-0 dark:text-slate-400">
                Gray Date
              </th>
              <th className=" border border-collapse h-12 px-4 text-left align-middle font-medium text-slate-500 [&:has([role=checkbox])]:pr-0 dark:text-slate-400">
                Dyeing Date
              </th>
              <th className=" border border-collapse h-12 px-4 text-left align-middle font-medium text-slate-500 [&:has([role=checkbox])]:pr-0 dark:text-slate-400">
                Chalan
              </th>
              <th className=" border border-collapse h-12 px-4 text-left align-middle font-medium text-slate-500 [&:has([role=checkbox])]:pr-0 dark:text-slate-400">
                Product
              </th>
              <th className=" border border-collapse h-12 px-4 text-left align-middle font-medium text-slate-500 [&:has([role=checkbox])]:pr-0 dark:text-slate-400">
                Amount / Order
              </th>
              <th className=" border border-collapse h-12 px-4 text-left align-middle font-medium text-slate-500 [&:has([role=checkbox])]:pr-0 dark:text-slate-400">
                Thaan Amount
              </th>
              <th className=" border border-collapse h-12 px-4 text-left align-middle font-medium text-slate-500 [&:has([role=checkbox])]:pr-0 dark:text-slate-400">
                Difference
              </th>
              <th className=" border border-collapse h-12 px-4 text-left align-middle font-medium text-slate-500 [&:has([role=checkbox])]:pr-0 dark:text-slate-400">
                Rate
              </th>
              <th className=" border border-collapse h-12 px-4 text-left align-middle font-medium text-slate-500 [&:has([role=checkbox])]:pr-0 dark:text-slate-400">
                Total
              </th>
              <th className=" border border-collapse h-12 px-4 text-left align-middle font-medium text-slate-500 [&:has([role=checkbox])]:pr-0 dark:text-slate-400">
                Payment Date
              </th>
              <th className=" border border-collapse h-12 px-4 text-left align-middle font-medium text-slate-500 [&:has([role=checkbox])]:pr-0 dark:text-slate-400">
                Payment Amount
              </th>
              <th className=" border border-collapse h-12 px-4 text-left align-middle font-medium text-slate-500 [&:has([role=checkbox])]:pr-0 dark:text-slate-400">
                Total Payment Done
              </th>
              <th className=" border border-collapse h-12 px-4 text-left align-middle font-medium text-slate-500 [&:has([role=checkbox])]:pr-0 dark:text-slate-400">
                Due
              </th>
              <th className=" border border-collapse h-12 px-4 text-left align-middle font-medium text-slate-500 [&:has([role=checkbox])]:pr-0 dark:text-slate-400">
                Payment Status
              </th>
              <th className=" border border-collapse h-12 px-4 text-left align-middle font-medium text-slate-500 [&:has([role=checkbox])]:pr-0 dark:text-slate-400">
                Progress
              </th>
              <th className=" border border-collapse h-12 px-4 text-left align-middle font-medium text-slate-500 [&:has([role=checkbox])]:pr-0 dark:text-slate-400">
                Gray Name
              </th>
            </tr>
          </thead>
          <HtmlContent html={dyeingTableData(dyeingData)} />
        </table>
      </div>
    </div>
  );
}
