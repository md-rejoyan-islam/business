import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useAddFinishedDataToProductMutation,
  useUpdateMultipleFinishedDataToProductMutation,
} from "@/features/products/productApi";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { RxCrossCircled } from "react-icons/rx";
import { toast } from "react-toastify";

export default function ThaanAddForm({ product, setOpen }) {
  const datas = product?.finished_products?.length
    ? product?.finished_products
    : [null];

  const [fields, setFields] = useState(datas);

  const [addFinishedProduct] = useAddFinishedDataToProductMutation();
  const [updateFinishedProduct] =
    useUpdateMultipleFinishedDataToProductMutation();

  // add field
  const addField = () => {
    setFields((prev) => [...prev, null]);
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    unregister,
  } = useForm();

  // remove field
  const removeField = (index) => {
    setFields((prev) => {
      const newFields = [...prev];
      newFields.splice(index, 1);
      return newFields;
    });
    unregister(`amount_${index}`);
  };

  const onSubmit = (data) => {
    const values = Object.entries(data).reduce((acc, [key, value]) => {
      const [name, index] = key.split("_");
      if (name === "amount") {
        acc[index] = {
          ...acc[index],
          ...product?.finished_products[index],
          amount: +value,
        };
      }
      return acc;
    }, []);

    const result = {
      total_defected: +data.defect,
      productId: +product.id,
      finishedProducts: values,
    };

    if (product?.finished_products?.length) {
      updateFinishedProduct(result).then((response) => {
        if (response?.data?.success) {
          setOpen(false);
          toast.success(response.data?.message);
        } else if (!response.error?.data?.success) {
          toast.error(response?.error?.data?.error?.message);
        }
      });
    } else {
      addFinishedProduct(result).then((response) => {
        if (response?.data?.success) {
          setOpen(false);
          toast.success(response.data?.message);
        } else if (!response.error?.data?.success) {
          toast.error(response?.error?.data?.error?.message);
        }
      });
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label
            htmlFor="defect"
            className={`${errors.name ? "text-red-500" : ""} pt-3 pb-2 block`}
          >
            Defect
          </Label>

          <Input
            id="name"
            type="number"
            className="   focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-slate-400/80"
            defaultValue={product?.total_defected || 0}
            {...register("defect", { min: 0 })}
          />

          {errors.name && <p className="text-red-500">{errors.name.message}</p>}
        </div>
        {fields.map((item, index, all) => (
          <div key={index} className="group pt-1">
            <Label
              htmlFor="amount"
              className={`${
                errors[`amount_${index}`] ? "text-red-500" : ""
              } pt-3 pb-2 flex justify-between items-center`}
            >
              <span>Amount</span>
              {all.length - 1 === index && index > 0 && (
                <span
                  className="p-1 rounded-md bg-red-100 cursor-pointer invisible group-hover:visible "
                  onClick={() => removeField(index)}
                >
                  <RxCrossCircled className="text-lg   text-red-500 " />
                </span>
              )}
            </Label>

            <Input
              id="email"
              type="number"
              defaultValue={item?.amount || 0}
              className={` focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-slate-400/80 ${
                errors[`amount_${index}`]
                  ? "border-red-400 focus:border-red-400"
                  : ""
              } `}
              {...register(`amount_${index}`, {
                required: "Amount is required",
                min: 0,
              })}
            />

            {errors[`amount_${index}`] && (
              <p className="text-red-500 pt-[2px]">
                {errors[`amount_${index}`].message}
              </p>
            )}
          </div>
        ))}

        <div className="flex gap-6 justify-between items-center py-4">
          {!product?.finished_products?.length && (
            <Button
              type="button"
              className="bg-transparent text-black border hover:bg-black/5 "
              onClick={addField}
            >
              Add Field
            </Button>
          )}
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </>
  );
}
