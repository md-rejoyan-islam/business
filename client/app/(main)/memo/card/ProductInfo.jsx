import React from "react";

export default function ProductInfo({ product }) {
  return (
    <table className="w-full">
      <thead>
        <tr className="bg-slate-50 rounded-md">
          <th className="border border-collapse px-4 py-2">Gray</th>
          <th className="border border-collapse px-4 py-2">Dyeing</th>
          <th className="border border-collapse px-4 py-2">Shortage</th>
          <th className="border border-collapse px-4 py-2">Costing</th>
        </tr>
      </thead>
      <tbody>
        <tr className="hover:bg-slate-50">
          <td className="border border-collapse px-4 py-2">
            {product?.gray?.name}
          </td>
          <td className="border border-collapse px-4 py-2">
            {product?.dyeing?.name}
          </td>
          <td className="border border-collapse px-4 py-2"></td>
          <td className="border border-collapse px-4 py-2"></td>
        </tr>
        <tr className="hover:bg-slate-50">
          <td className="border border-collapse px-4 py-2">
            {product?.gray_rate}
          </td>
          <td className="border border-collapse px-4 py-2">
            {product?.dyeing_rate}
          </td>
          <td className="border border-collapse px-4 py-2"></td>
          <td className="border border-collapse px-4 py-2"></td>
        </tr>
      </tbody>
    </table>
  );
}
