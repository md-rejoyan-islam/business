import MenuItem from "./MenuItem";
import { GiClothes, GiRolledCloth } from "react-icons/gi";
import { MdProductionQuantityLimits } from "react-icons/md";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

import InnerLink from "./InnerLink";
import { usePathname } from "next/navigation";

export default function SideContent() {
  const pathname = usePathname();

  return (
    <div>
      <ul className="space-y-1">
        <li>
          <MenuItem
            title="Gray"
            active={pathname.includes("/grays")}
            icon={<GiRolledCloth />}
          >
            <ul className="space-y-1">
              <InnerLink
                href={"/grays/all"}
                label={"All"}
                pathname={pathname}
              />
              <InnerLink
                href={"/grays/add"}
                label={"Add"}
                pathname={pathname}
              />
            </ul>
          </MenuItem>
        </li>
        <li>
          <MenuItem
            title="Dyeing"
            active={pathname.includes("/dyeings")}
            icon={<GiClothes />}
          >
            <ul className="space-y-1">
              <InnerLink
                href={"/dyeings/all"}
                label={"All"}
                pathname={pathname}
              />
              <InnerLink
                href={"/dyeings/add"}
                label={"Add"}
                pathname={pathname}
              />
            </ul>
          </MenuItem>
        </li>
        <li>
          <MenuItem
            active={pathname.includes("/products")}
            title="Product"
            icon={<MdProductionQuantityLimits />}
          >
            <ul className="space-y-1">
              <InnerLink
                href={"/products/all"}
                label={"All"}
                pathname={pathname}
              />
              <InnerLink
                href={"/products/add"}
                label={"Add"}
                pathname={pathname}
              />
            </ul>
          </MenuItem>
        </li>
        <li>
          <MenuItem
            active={pathname.includes("/chalans")}
            title="Chalan"
            icon={<FaArrowUpRightFromSquare className="text-sm" />}
          >
            <ul className="space-y-1">
              <InnerLink
                href={"/chalans/all"}
                label={"All"}
                pathname={pathname}
              />
              <InnerLink
                href={"/chalans/add"}
                label={"Add"}
                pathname={pathname}
              />
            </ul>
          </MenuItem>
        </li>
      </ul>
    </div>
  );
}
