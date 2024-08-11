import React, { useState } from "react";
import { Input } from "../ui/input";

const Field = ({ index, defaultValue, showBorder, removeField }) => {
  return (
    <div className="group">
      <p className=" flex items-center gap-2 justify-between h-10  ">
        <span>Thaan-{index}</span>
      </p>
      <div className={`${showBorder ? "border-b" : ""}  flex pb-4`}>
        <div className="space-y-2">
          <input
            className="flex h-10 w-full border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300 focus-visible:ring-0 rounded-none rounded-l-md focus-visible:ring-offset-0 focus:border-slate-400/80"
            min={0}
            placeholder="Thaan amount"
            type="number"
            defaultValue={defaultValue?.amount}
            name={`amount-${index}`}
          />
        </div>
        <div className="space-y-2">
          <input
            className="flex h-10 w-full border border-slate-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-500 focus-visible:outline-none focus-visible:ring-slate-950 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:bg-slate-950 dark:ring-offset-slate-950 dark:placeholder:text-slate-400 dark:focus-visible:ring-slate-300 rounded-none rounded-r-md focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-slate-400/80"
            min={0}
            placeholder="Thaan defect"
            type="number"
            defaultValue={defaultValue?.defect}
            name={`defect-${index}`}
          />
        </div>
      </div>
    </div>
  );
};

export default function UpdateThaanCountForm({ formData }) {
  const thaans = formData?.thaan_count;
  const [fields, setFields] = useState([]);

  // add field
  const addField = () => {
    setFields((prev) => setFields([...prev, Field]));
  };

  // remove field
  const removeField = (index) => {
    setFields((prev) => {
      const newFields = [...prev];
      newFields.splice(index, 1);
      return newFields;
    });
  };

  return (
    <>
      <form>
        {thaans?.map((thaan, index, array) => (
          <Field
            key={thaan?.id}
            index={index + 1}
            defaultValue={{
              amount: thaan?.amoun,
              defect: thaan?.defect,
            }}
            showBorder={
              fields.length ? true : array.length - 1 === index ? false : true
            }
          />
        ))}
        {fields?.map((Field, index, array) => (
          <Field
            key={index}
            index={index + thaans?.length}
            defaultValue={{
              amount: 0,
              defect: 0,
            }}
            removeField={array.length - 1 === index && removeField}
            showBorder={array.length - 1 === index ? false : true}
          />
        ))}
      </form>
    </>
  );
}
