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
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
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

import PagePagination from "./Pagination";

const data2 = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    email: "ken99@yahoo.com",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    email: "Abe45@gmail.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@hotmail.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@hotmail.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@hotmail.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@hotmail.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@hotmail.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@hotmail.com",
  },
];
const data = [
  {
    id: "1",
    name: "Product-T",
    gray_cost: 5500,
    dyeing_cost: 3315,
    total_unit: 195,
    unit_cost: 45.21,
    all_unit_cost: 47,
    gray: 20,
    dyeing: 17,
  },
  {
    id: "2",
    name: "Product-T1",
    gray_cost: 5500,
    dyeing_cost: 3100,
    total_unit: 191,
    unit_cost: 42,
    all_unit_cost: 34,
    gray: 29,
    dyeing: 18,
  },
  {
    id: "1",
    name: "Product-T",
    gray_cost: 5500,
    dyeing_cost: 3315,
    total_unit: 195,
    unit_cost: 45.21,
    all_unit_cost: 47,
    gray: 20,
    dyeing: 17,
  },
  {
    id: "2",
    name: "Product-T1",
    gray_cost: 5500,
    dyeing_cost: 3100,
    total_unit: 191,
    unit_cost: 42,
    all_unit_cost: 34,
    gray: 29,
    dyeing: 18,
  },
  {
    id: "1",
    name: "Product-T",
    gray_cost: 5500,
    dyeing_cost: 3315,
    total_unit: 195,
    unit_cost: 45.21,
    all_unit_cost: 47,
    gray: 20,
    dyeing: 17,
  },
  {
    id: "2",
    name: "Product-T1",
    gray_cost: 5500,
    dyeing_cost: 3100,
    total_unit: 191,
    unit_cost: 42,
    all_unit_cost: 34,
    gray: 29,
    dyeing: 18,
  },
  {
    id: "1",
    name: "Product-T",
    gray_cost: 5500,
    dyeing_cost: 3315,
    total_unit: 195,
    unit_cost: 45.21,
    all_unit_cost: 47,
    gray: 20,
    dyeing: 17,
  },
  {
    id: "2",
    name: "Product-T1",
    gray_cost: 5500,
    dyeing_cost: 3100,
    total_unit: 191,
    unit_cost: 42,
    all_unit_cost: 34,
    gray: 29,
    dyeing: 18,
  },
  {
    id: "1",
    name: "Product-T",
    gray_cost: 5500,
    dyeing_cost: 3315,
    total_unit: 195,
    unit_cost: 45.21,
    all_unit_cost: 47,
    gray: 20,
    dyeing: 17,
  },
  {
    id: "2",
    name: "Product-T1",
    gray_cost: 5500,
    dyeing_cost: 3100,
    total_unit: 191,
    unit_cost: 42,
    all_unit_cost: 34,
    gray: 29,
    dyeing: 18,
  },
  {
    id: "3",
    name: "Product-T2",
    gray_cost: 5500,
    dyeing_cost: 3315,
    total_unit: 195,
    unit_cost: 45.21,
    all_unit_cost: 47,
    gray: 20,
    dyeing: 17,
  },
  {
    id: "4",
    name: "Product-T3",
    gray_cost: 5500,
    dyeing_cost: 3100,
    total_unit: 191,
    unit_cost: 42,
    all_unit_cost: 34,
    gray: 29,
    dyeing: 18,
  },
  {
    id: " 5",
    name: "Product-T4",
    gray_cost: 5500,
    dyeing_cost: 3315,
    total_unit: 195,
    unit_cost: 45.21,
    all_unit_cost: 47,
    gray: 20,
    dyeing: 17,
  },
  {
    id: "6",
    name: "Product-T5",
    gray_cost: 5500,
    dyeing_cost: 3100,
    total_unit: 191,
    unit_cost: 42,
    all_unit_cost: 34,
    gray: 29,
    dyeing: 18,
  },
  {
    id: "7",
    name: "Product-T6",
    gray_cost: 5500,
    dyeing_cost: 3315,
    total_unit: 195,
    unit_cost: 45.21,
    all_unit_cost: 47,
    gray: 20,
    dyeing: 17,
  },
];

export const columns = [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div className="capitalize">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "gray_cost",
    header: "Gray Cost",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("gray_cost")}</div>
    ),
  },
  {
    accessorKey: "dyeing_cost",
    header: "Dyeing Cost",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("dyeing_cost")}</div>
    ),
  },
  {
    accessorKey: "total_unit",
    header: "Total Unit",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("total_unit")}</div>
    ),
  },
  {
    accessorKey: "unit_cost",

    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Unit Cost
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize pl-4">{row.getValue("unit_cost")}</div>
    ),
  },
  {
    accessorKey: "all_unit_cost",
    header: "All Unit Cost",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("all_unit_cost")}</div>
    ),
  },
  {
    accessorKey: "gray",
    header: "Gray",
    cell: ({ row }) => <div className="capitalize">{row.getValue("gray")}</div>,
  },
  {
    accessorKey: "dyeing",
    header: "Gray",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("dyeing")}</div>
    ),
  },
];
export const columnss = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

const DataTableDemo = () => {
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

export default DataTableDemo;
