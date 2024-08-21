import React from "react";
import { CiSquareRemove } from "react-icons/ci";
import { IoIosRemoveCircleOutline } from "react-icons/io";

export default function SelectedProduct({
  allSelectedProducts,
  setAllSelectedProducts,
}) {
  const handleRemove = (index) => {
    setAllSelectedProducts((prev) => {
      const newSelectedProducts = [...prev];
      newSelectedProducts.splice(index, 1);
      return newSelectedProducts;
    });
  };

  return (
    <div className="flex   gap-5">
      {/* product -1  */}
      {allSelectedProducts?.map((product, index) => (
        <ul
          className="flex flex-col w-fit text-[12px]  shadow-sm  relative group"
          key={product?.div}
        >
          <li className="font-semibold rounded-l-md px-6 py-2  bg-slate-100/70  inline-flex justify-center items-center border ">
            <span className="text-nowrap">{product?.name}</span>
          </li>
          {/* item remove button */}
          <span
            className="absolute -top-[2.5px] -right-[15px] cursor-pointer z-50 hidden group-hover:block "
            onClick={() => handleRemove(index)}
          >
            <CiSquareRemove className="text-lg text-red-500" />
          </span>
          {product?.items?.map((item, index) => (
            <li
              className=" py-1.5  inline-flex justify-center items-center border "
              key={index?.id}
            >
              <span>{item?.amount}</span>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
