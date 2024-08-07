import Link from "next/link";
import MenuItem from "./MenuItem";
import { GiClothes, GiRolledCloth } from "react-icons/gi";
import { MdProductionQuantityLimits } from "react-icons/md";
import { BiRectangle } from "react-icons/bi";

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
            active={pathname.includes("/gray")}
            icon={<GiRolledCloth />}
          >
            <ul className="space-y-1">
              <InnerLink href={"/gray/all"} label={"All"} pathname={pathname} />
              <InnerLink href={"/gray/add"} label={"Add"} pathname={pathname} />
            </ul>
          </MenuItem>
        </li>
        <li>
          <MenuItem
            title="Dyeing"
            active={pathname.includes("/dyeing")}
            icon={<GiClothes />}
          >
            <ul className="space-y-1">
              <InnerLink
                href={"/dyeing/all"}
                label={"All"}
                pathname={pathname}
              />
              <InnerLink
                href={"/dyeing/add"}
                label={"Add"}
                pathname={pathname}
              />
            </ul>
          </MenuItem>
        </li>
        <li>
          <MenuItem
            active={pathname.includes("/product")}
            title="Product"
            icon={<MdProductionQuantityLimits />}
          >
            <ul className="space-y-1">
              <InnerLink
                href={"/product/all"}
                label={"All"}
                pathname={pathname}
              />
              <InnerLink
                href={"/product/add"}
                label={"Add"}
                pathname={pathname}
              />
            </ul>
          </MenuItem>
        </li>
        <li>
          <a href="">Dashboard2</a>
        </li>
      </ul>
    </div>
  );
}
