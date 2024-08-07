import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { icons } from "lucide-react";

export default function MenuItem({ children, title, icon, active }) {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" className="border-none ">
        <AccordionTrigger
          className={`${
            active ? "bg-black/5" : ""
          } py-2 px-2 rounded-md hover:no-underline data-[state=open]:bg-black/5  hover:bg-black/5`}
        >
          <span className="flex gap-3 items-center">
            {icon}
            {title}
          </span>
        </AccordionTrigger>
        <AccordionContent className=" hover:bg-white bg-white py-1 pb-3">
          {children}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
