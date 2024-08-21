import { GiClothes, GiRolledCloth } from "react-icons/gi";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FaUserTie } from "react-icons/fa6";
import { CiMemoPad } from "react-icons/ci";

import { usePathname } from "next/navigation";
import Link from "next/link";

export default function SideContent() {
  const pathname = usePathname();

  return (
    <div>
      <ul className="space-y-1">
        <li
          className={`${
            pathname.includes("/grays/")
              ? "bg-[#18181b] hover:bg-[#18181b] text-white"
              : "hover:bg-[#f4f4f5]"
          } py-2 px-2 rounded-md hover:no-underline   `}
        >
          <Link href="/grays/all" className="flex gap-3 items-center">
            <GiRolledCloth />
            <span>Grays</span>
          </Link>
        </li>
        <li
          className={`${
            pathname.includes("/dyeings/all")
              ? "bg-[#18181b] hover:bg-[#18181b] text-white"
              : "hover:bg-[#f4f4f5]"
          } py-2 px-2 rounded-md hover:no-underline   `}
        >
          <Link href="/dyeings/all" className="flex gap-3 items-center">
            <GiClothes />
            <span>Dyeings</span>
          </Link>
        </li>
        <li
          className={`${
            pathname.includes("/products/all")
              ? "bg-[#18181b] hover:bg-[#18181b] text-white"
              : "hover:bg-[#f4f4f5]"
          } py-2 px-2 rounded-md hover:no-underline   `}
        >
          <Link href="/products/all" className="flex gap-3 items-center">
            <MdProductionQuantityLimits />
            <span>Products</span>
          </Link>
        </li>
        <li
          className={`${
            pathname.includes("/customers/all")
              ? "bg-[#18181b] hover:bg-[#18181b] text-white"
              : "hover:bg-[#f4f4f5]"
          } py-2 px-2 rounded-md hover:no-underline   `}
        >
          <Link href="/customers/all" className="flex gap-3 items-center">
            <FaUserTie />
            <span>Cutomers</span>
          </Link>
        </li>
        <li
          className={`${
            pathname.includes("/memo")
              ? "bg-[#18181b] hover:bg-[#18181b] text-white"
              : "hover:bg-[#f4f4f5]"
          } py-2 px-2 rounded-md hover:no-underline   `}
        >
          <Link href="/memo" className="flex gap-3 items-center">
            <CiMemoPad />
            <span>Memo</span>
          </Link>
        </li>
      </ul>
    </div>
  );
}
