import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { useGetAllDyeingsQuery } from "@/features/dyeing/dyeingApi";
import CreatableSelect from "react-select/creatable";

export default function ProductField({ index, removeField, form, showBorder }) {
  const { data: dyeings } = useGetAllDyeingsQuery();

  const dyeingNames = dyeings?.data.map((dt) => {
    return {
      value: dt.name,
      label: dt?.name,
      id: dt.id,
    };
  });
  return (
    <>
      <div className={`space-y-4 py-3  ${showBorder ? "border-b" : " "}`}>
        <FormField
          control={form.control}
          name={`product_${index}`}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="flex justify-between items-center">
                <span>Product- {index}</span>
                {removeField && (
                  <span
                    onClick={removeField}
                    className="p-2 bg-red-100 rounded-md cursor-pointer"
                  >
                    X
                  </span>
                )}
              </FormLabel>
              <FormControl>
                <Input
                  className="   focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-slate-400/80"
                  placeholder="Enter product name"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex justify-between">
          <FormField
            control={form.control}
            name={`amount_${index}`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount-{index} </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    className="   focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-slate-400/80"
                    min={0}
                    step="0.01"
                    placeholder="Enter product amount"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={`rate_${index}`}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Rate-{index} </FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    min={0}
                    className="   focus-visible:ring-0 focus-visible:ring-offset-0 focus:border-slate-400/80"
                    step="0.01"
                    placeholder="Enter product rate"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div>
          <Label>Dyeing for product-{index}</Label>
          <CreatableSelect
            isClearable
            options={dyeingNames}
            className="mt-2"
            styles={{
              control: (baseStyles, state) => ({
                ...baseStyles,
                borderColor: state.isFocused ? "#a9b5c6" : "#e2e8f0",
              }),
            }}
            onChange={(value) => {
              form.setValue(`dyeing_name_${index}`, value?.value);
              form.setValue(`dyeing_id_${index}`, value?.id);
            }}
          />
        </div>

        {/* <FormField
          control={form.control}
          name={`dyeing_name_${index}`}
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dyeing for product-{index}</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Dyeing Name" />
                  </SelectTrigger>
                  <SelectContent {...field}>
                    {dyeings?.data?.map((dyeing) => (
                      <SelectItem value={dyeing.name} key={dyeing.id}>
                        {dyeing.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        /> */}
      </div>
    </>
  );
}
