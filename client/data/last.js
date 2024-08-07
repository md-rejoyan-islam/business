const dyeingData = {
  id: 1,
  name: "Dyeing-1",
  address: "Dhaka",
  phone: "01700000000",
  products: [
    {
      id: 1,
      name: "product-1",
      chalanId: 1000,
      gray_amount: 100,
      gray_rate: 60,
      gray_date: "1 june",
      gray_payment_status: "paid",
      delivery_status: "in mile",
      dyeingId: 101,
      dyeing_date: "2june",
      dyeing_payment_status: false,
      dyeing: {
        name: "Dyeing Name",
      },
      gray: { name: "Gray-1" },
      dyeing_rate: 60,
      thaan_amount: 30,
      dyeing_payments: [
        {
          id: 1,
          amount: 1000,
          date: "1 june",
        },
        {
          id: 2,
          amount: 2000,
          date: "2 june",
        },
        {
          id: 3,
          amount: 4000,
          date: "2 june",
        },
      ],
      gray_payments: [
        {
          id: 1,
          amount: 1000,
          date: "1 june",
        },
        {
          id: 2,
          amount: 2000,
          date: "2 june",
        },
        {
          id: 3,
          amount: 5000,
          date: "2 june",
        },
      ],
    },
    {
      id: 2,
      name: "product-2",
      chalanId: 1000,
      gray_amount: 85,
      gray_rate: 20,
      gray_date: "1 june",
      gray_payment_status: "paid",
      deliver_status: "in mile",
      dyeing_rate: 60,
      thaan_amount: 85,
      dyeing_payments: [
        {
          id: 1,
          amount: 400,
          date: "1 june",
        },
        {
          id: 2,
          amount: 200,
          date: "2 june",
        },
      ],
      dyeing_payments: [
        // {
        //   id: 1,
        //   amount: 100,
        //   date: "1 june",
        // },
        // {
        //   id: 1,
        //   amount: 100,
        //   date: "1 june",
        // },
        // {
        //   id: 1,
        //   amount: 100,
        //   date: "1 june",
        // },
        // {
        //   id: 2,
        //   amount: 200,
        //   date: "2 june",
        // },
      ],
    },
    {
      id: 2,
      name: "product-2",
      chalanId: 1000,
      gray_amount: 85,
      gray_rate: 20,
      gray_date: "1 june",
      gray_payment_status: "paid",
      deliver_status: "in mile",
      dyeing_rate: 60,
      thaan_amount: 85,
      dyeing_payments: [
        {
          id: 1,
          amount: 400,
          date: "1 june",
        },
        {
          id: 2,
          amount: 200,
          date: "2 june",
        },
      ],
      dyeing_payments: [],
    },
    {
      id: 2,
      name: "product-2",
      chalanId: 1000,
      gray_amount: 85,
      gray_rate: 20,
      gray_date: "1 june",
      gray_payment_status: "paid",
      deliver_status: "in mile",
      dyeing_rate: 60,
      thaan_amount: 85,
      dyeing_payments: [
        {
          id: 1,
          amount: 400,
          date: "1 june",
        },
        {
          id: 2,
          amount: 200,
          date: "2 june",
        },
      ],
      dyeing_payments: [
        {
          id: 1,
          amount: 100,
          date: "1 june",
        },
        {
          id: 1,
          amount: 100,
          date: "1 june",
        },
        // {
        //   id: 1,
        //   amount: 100,
        //   date: "1 june",
        // },
        // {
        //   id: 2,
        //   amount: 200,
        //   date: "2 june",
        // },
      ],
    },
  ],
};

// tr create based on product payment

const products = dyeingData.products;
const payments = products?.reduce((allPayement, product) => {
  return [...allPayement, ...product?.dyeing_payments];
}, []);

const totalPaymentLength = payments?.length;
const totalProductLength = products?.length;

const productsWithOutPayment = products.filter(
  (data) => !data?.dyeing_payments.length
);

const max = totalPaymentLength + productsWithOutPayment.length;

const productTableData = dyeingData?.products?.reduce((sum, product) => {
  // total gray product cost
  const totalCost = product?.thaan_amount * product?.dyeing_rate;
  // total payment for gray product
  const totalPay = product?.dyeing_payments.reduce((sum, payment) => {
    return sum + +payment.amount;
  }, 0);
  // total due
  const totalDue = totalCost - totalPay;

  // payment data
  const paymentData = product?.dyeing_payments?.map((payment) => {
    return `
    ${tableData(payment?.date)}
    ${tableData(payment?.amount)}
    `;
  });

  // difference
  const difference = product.thaan_amount - product.gray_amount;

  // show td
  const leftSideData = `
      ${tableData(product?.gray_date, product?.dyeing_payments?.length)}
      ${tableData(product?.dyeing_date, product?.dyeing_payments?.length)}
      ${tableData(product?.chalanId, product?.dyeing_payments?.length)}
      ${tableData(product?.name, product?.dyeing_payments?.length)}
      ${tableData(product?.gray_amount, product?.dyeing_payments?.length)}
      ${tableData(product?.thaan_amount, product?.dyeing_payments?.length)}
      ${tableData(difference, product?.dyeing_payments?.length)}
      ${tableData(product?.dyeing_rate, product?.dyeing_payments?.length)}
      ${tableData(totalCost, product?.dyeing_payments?.length)}
        `;

  // right side data
  const rightSideData = `
      ${tableData(totalPay, product?.dyeing_payments?.length)}
      ${tableData(totalDue, product?.dyeing_payments?.length)}
      ${tableData(
        product?.dyeing_payment_status,
        product?.dyeing_payments?.length
      )}
      ${tableData(product.deliver_status, product?.dyeing_payments?.length)}
      ${tableData(product?.gray?.name, product?.dyeing_payments?.length)}
      `;

  let productsTd = "";
  if (paymentData.length) {
    productsTd = paymentData.map((dt, index) => {
      if (index === 0) {
        return leftSideData + dt + rightSideData;
      } else {
        return dt;
      }
    });
  } else {
    const empty = `<td></td>  <td></td><td></td>  <td></td> <td></td>  <td></td> `;

    productsTd = [leftSideData + empty];
  }
  return [...sum, ...productsTd];
}, []);

const output = productTableData.map((item, index) => {
  if (index === 0) {
    return `
    <tr>
      ${tableData(dyeingData.id, max)}
      ${tableData(dyeingData.name, max)}
      ${tableData(dyeingData.address, max)}
      ${tableData(dyeingData.phone, max)}
    ${item}
    </tr>   `;
  }

  return ` <tr>${item} </tr>   `;
});

document.getElementById("table").innerHTML = output.join(" ");

function tableData(value = "", rowspan) {
  return `<td ${
    rowspan ? `rowspan=${rowspan}` : ""
  } className="p-4 align-middle [&:has([role=checkbox])]:pr-0 border border-collapse"  > 
  <div className="capitalize pl-4">${value}</div></td>`;
}
