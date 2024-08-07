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
        // {
        //   id: 3,
        //   amount: 5000,
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
      gray_payments: [
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
      gray_payments: [],
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
      gray_payments: [
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
        {
          id: 1,
          amount: 100,
          date: "1 june",
        },
        {
          id: 2,
          amount: 200,
          date: "2 june",
        },
      ],
    },
  ],
};

// tr create based on product payment

const products = dyeingData.products.map((product) => product);
const payments = products.reduce((allPayement, product) => {
  return [...allPayement, ...product.gray_payments];
}, []);

const totalPaymentLength = payments?.length;
const totalProductLength = products?.length;

const productWithOutPayment = dyeingData.products.filter(
  (data) => !data.gray_payments.length
);

const max = totalPaymentLength + productWithOutPayment.length;

const show = dyeingData?.products?.reduce((sum, product) => {
  const res = product?.gray_payments?.map((payment) => {
    return `
    ${tableData(payment.date)}
    ${tableData(payment.amount)}
    `;
  });

  const data = `

      ${tableData(product.gray_date, product?.gray_payments?.length)}
      ${tableData(product.gray_date, product?.gray_payments?.length)}

    
        <td rowspan=${product?.gray_payments?.length || 1}>chalan-num: ${
    product.chalanId
  }</td>
        <td rowspan=${product?.gray_payments?.length || 1}>product-name: ${
    product.name
  }</td>
        <td rowspan=${product?.gray_payments?.length || 1}> product-amount:${
    product.gray_amount
  }</td>
        <td rowspan=${product?.gray_payments?.length || 1}> gray-rate:${
    product.gray_rate
  }</td>
        <td rowspan=${product?.gray_payments?.length || 1}> gray-total:${
    product.gray_rate * product.gray_amount
  }</td>
       
        `;

  const totalPay = product?.gray_payments.reduce((sum, payment) => {
    return sum + +payment.amount;
  }, 0);

  const totalCost = product.gray_amount * product.gray_date;

  const data2 = `
    <td rowspan=${
      product?.gray_payments?.length || 1
    }> total Payment Done:${totalPay}</td>
        <td rowspan=${product?.gray_payments?.length || 1}>due:${
    totalPay - totalCost
  }</td>
        <td rowspan=${product?.gray_payments?.length || 1}>Payment status:${
    product?.gray_payment_status
  }</td>
        <td rowspan=${product?.gray_payments?.length || 1}>Delevery Status:${
    product.deliver_status
  }</td>
  
        <td rowspan=${product?.gray_payments?.length || 1}>Deying name:${
    product?.dyeing?.name
  }</td>
  
  `;

  let first = "";
  if (res.length) {
    first = res.map((dt, index) => {
      if (index === 0) {
        return data + dt + data2;
      } else {
        return dt;
      }
    });
  } else {
    const empty = `<td></td>  <td></td><td></td>  <td></td> <td></td>  <td></td>    `;

    first = [data + empty];
  }
  return [...sum, ...first];
}, []);

const output = show.map((item, index) => {
  if (index === 0) {
    return `
    <tr>
    <td rowspan=${max}>gray-Id: ${dyeingData.id}</td>
    <td rowspan=${max}>gray-name: ${dyeingData.name}</td>
        <td rowspan=${max}>gray-address: ${dyeingData.address}</td>
        <td rowspan=${max}>gray-phone: ${dyeingData.phone}</td>
    ${item}
    </tr>   `;
  }

  return ` <tr>${item} </tr>   `;
});

document.getElementById("table").innerHTML = output.join(" ");

function tableData(value = "", rowspan) {
  return `<td ${rowspan ? `rowspan=${rowspan}` : ""} >${value}</td>`;
}
