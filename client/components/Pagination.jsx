import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function PagePagination({ table }) {
  console.log(table.getPageCount());

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            className={`${
              !table.getCanPreviousPage()
                ? "cursor-default text-black/50 hover:bg-transparent hover:text-black/50"
                : ""
            } `}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            href="#"
            className={`${
              !table.getCanNextPage()
                ? "cursor-default text-black/50 hover:bg-transparent hover:text-black/50"
                : ""
            } `}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
