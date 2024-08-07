"use client";

import * as React from "react";

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";

const grayData = [
  {
    id: 1,
    name: "gray-1",
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

        dyeing_rate: 60,
        thaan_amount: 12,
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
        ],
        gray_payments: [
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
        thaan: 12,
        dyeing_payments: [
          {
            id: 1,
            amount: 1005,
            date: "1 june",
          },
          {
            id: 2,
            amount: 2000,
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
            id: 2,
            amount: 2000,
            date: "2 june",
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: "gray-2",
    address: "Dhaka 2",
    phone: "01700000001",
    products: [
      {
        id: 1,
        name: "product-2",
        chalanId: 1000,
        gray_amount: 100,
        gray_rate: 60,
        gray_date: "1 june",
        gray_payment_status: "paid",
        delivery_status: "in mile",
        dyeingId: 101,
        dyeing_date: "2june",
        dyeing_payment_status: false,

        dyeing_rate: 60,
        thaan_amount: 12,
        dyeing_payments: [
          {
            id: 1,
            amount: 2000,
            date: "1 june",
          },
          {
            id: 2,
            amount: 4000,
            date: "2 june",
          },
        ],
        gray_payments: [
          {
            id: 1,
            amount: 600,
            date: "1 june",
          },
          {
            id: 2,
            amount: 8000,
            date: "2 june",
          },
        ],
      },
      {
        id: 2,
        name: "product-3",
        chalanId: 1000,
        gray_amount: 85,
        gray_rate: 20,
        gray_date: "1 june",
        gray_payment_status: "paid",
        deliver_status: "in mile",
        dyeing_rate: 60,
        thaan: 12,
        dyeing_payments: [
          {
            id: 1,
            amount: 2000,
            date: "1 june",
          },
          {
            id: 2,
            amount: 3000,
            date: "2 june",
          },
        ],
        gray_payments: [
          {
            id: 1,
            amount: 5000,
            date: "1 june",
          },
          {
            id: 2,
            amount: 7000,
            date: "2 june",
          },
        ],
      },
    ],
  },
];

const data = grayData.map((gray) => {
  const totalAmount = gray?.products?.reduce((sum, product) => {
    return sum + product.gray_rate * product.gray_amount;
  }, 0);
  const totalPaid = gray?.products?.reduce((sum, product) => {
    return (
      sum +
      product?.gray_payments?.reduce((sum, payment) => sum + payment.amount, 0)
    );
  }, 0);
  return {
    name: gray.name,
    address: gray.address,
    phone: gray.phone,
    products: gray.products,
    totalAmount,
    due: totalAmount - totalPaid,
  };
});

export const columns = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => (
      <div className="capitalize">
        <Link href={"/gray/all/2"}>{row.getValue("name")}</Link>
      </div>
    ),
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("address")}</div>
    ),
  },
  {
    accessorKey: "phone",
    header: "Phone",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("phone")}</div>
    ),
  },
  {
    accessorKey: "totalAmount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Total Amount
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize pl-4">{row.getValue("totalAmount")}</div>
    ),
  },
  {
    accessorKey: "due",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Due
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize pl-4">{row.getValue("due")}</div>
    ),
  },
];

const GrayTable = () => {
  const [sorting, setSorting] = React.useState([]);
  const [columnFilters, setColumnFilters] = React.useState([]);
  const [columnVisibility, setColumnVisibility] = React.useState({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full p-6">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter name..."
          value={table.getColumn("name")?.getFilterValue() ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          showing 10 of {data.length} enteries
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GrayTable;
