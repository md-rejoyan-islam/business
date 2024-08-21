export default function CountCost({ allSelectedProducts }) {
  const totalAmount = allSelectedProducts?.reduce((acc, product) => {
    acc += product?.items?.reduce((acc, item) => {
      acc += item.amount;
      return acc;
    }, 0);
    return acc;
  }, 0);

  const totalCost = allSelectedProducts?.reduce((acc, product) => {
    acc += product?.items?.reduce((acc, item) => {
      acc += item.amount * product?.sellRate;
      return acc;
    }, 0);
    return acc;
  }, 0);

  return (
    <table className="w-full border border-collapse">
      <thead className="bg-slate-100 ">
        <tr className="text-left">
          <th className="border border-collapse px-4 py-1.5">Fabric Name</th>
          <th className="border border-collapse px-4 py-1.5">Amount</th>
          <th className="border border-collapse px-4 py-1.5">Rate</th>
          <th className="border border-collapse px-4 py-1.5">Price</th>
        </tr>
      </thead>
      <tbody>
        {allSelectedProducts?.map((product, index) => {
          const totalAmount = product?.items?.reduce((acc, item) => {
            acc += item.amount;
            return acc;
          }, 0);
          const price = totalAmount * product?.sellRate;
          return (
            <tr key={index}>
              <td className="px-4 py-1.5 border border-collapse">
                {product?.name}
              </td>
              <td className="px-4 py-1.5 border border-collapse">
                {totalAmount}
              </td>
              <td className="px-4 py-1.5 border border-collapse">
                {product?.sellRate}
              </td>
              <td className="px-4 py-1.5 border border-collapse">{price}</td>
            </tr>
          );
        })}
      </tbody>
      <tfoot>
        <tr className="bg-green-100/70">
          <td className="px-4 py-1.5 border border-collapse"></td>
          <td className="px-4 py-1.5 border border-collapse font-semibold">
            {totalAmount}
          </td>
          <td className="px-4 py-1.5 border border-collapse"></td>
          <td className="px-4 py-1.5 border border-collapse font-semibold">
            {totalCost}
          </td>
        </tr>
      </tfoot>
    </table>
  );
}
