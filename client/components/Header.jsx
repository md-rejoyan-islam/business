"use client";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { CiMenuFries } from "react-icons/ci";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useRef, useState } from "react";
import { RiMenu2Line, RiMenu3Fill } from "react-icons/ri";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import SideContent from "./SideContent";

export default function Header({ showFull, setShowFull }) {
  const drawRef = useRef(null);

  return (
    <>
      <div className="flex w-full justify-between items-center h-[60px] border-b px-4">
        <div
          className={`${
            showFull ? "-translate-x-[400px] w-0" : "translate-x-0 w-[260px]"
          } transition-all duration-500 hidden md:block`}
        >
          <span className="logo"> LOGO </span>
        </div>

        <div className="flex items-center justify-between w-full flex-1">
          <span
            className="cursor-pointer p-2 hover:bg-black/5 rounded-sm hidden md:block"
            onClick={() => setShowFull(!showFull)}
          >
            {showFull ? <RiMenu2Line /> : <RiMenu3Fill />}
          </span>
          <span
            className="cursor-pointer p-2 hover:bg-black/5 rounded-sm block md:hidden"
            onClick={() => {
              setShowFull(!showFull);
              drawRef.current.click();
            }}
          >
            {showFull ? <RiMenu2Line /> : <RiMenu3Fill />}
          </span>
          <div className="flex items-center gap-4">
            <Popover>
              <PopoverTrigger>
                <Avatar className="ring-[3px] w-9 h-9">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </PopoverTrigger>
              <PopoverContent align="end" className="p-2 w-[200px]">
                <ul className="text-[14px] space-y-1 ">
                  <li className="px-2 py-1.5 rounded-md hover:bg-black/5 cursor-pointer">
                    <a href="">Profile</a>
                  </li>
                  <li className="px-2 py-1.5 rounded-md hover:bg-black/5 cursor-pointer">
                    <a href="">Logout</a>
                  </li>
                </ul>
              </PopoverContent>
            </Popover>

            <div className="flex flex-col">
              <h4 className="text-sm font-semibold"> John Doe </h4>
              <p className="text-[12px]"> Administator </p>
            </div>
          </div>
        </div>
      </div>
      {/* sheet  */}
      <Sheet>
        <SheetTrigger className="hidden" ref={drawRef}>
          Open
        </SheetTrigger>
        <SheetContent
          side={"left"}
          className="max-w-[300px] sm:max-w-[300px] text-left"
        >
          <SheetHeader className="text-left">
            <SheetTitle>Are you absolutely sure?</SheetTitle>
          </SheetHeader>
          <SideContent />
        </SheetContent>
      </Sheet>
    </>
  );
}
