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
      console.log(column);

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

const ProductTable = () => {
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

export default ProductTable;
