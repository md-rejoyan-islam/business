const tableId = document.getElementById("table");

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
          id: 2,
          amount: 200,
          date: "2 june",
        },
      ],
    },
  ],
};
const products = dyeingData.products.map((product) => product);
const payments = products.reduce((allPayement, product) => {
  return [...allPayement, ...product.dyeing_payments];
}, []);

// console.log(products.length);
// console.log(payments.length);

const totalColumn = [
  "name",
  "address",
  "phone",
  // "Gray Date",
  // "Dyeing Date",
  // "Chalan",
  "product",
  // "order",
  // "thaan amount",
  // "difference",
  // "rate",
  // "total",
  "payment date",
  "payment amount",
  // "total amount done",
  // "due",
  // "payment Status",
  // "progress",
  // "gray Name",
];

// console.log(totalRow);

const tableColumn = Array(totalColumn.length);

const tableRow = Array(payments.length).fill([]);

const maxRowSpan =
  payments.length > products.length ? payments.length : products.length;
// console.log(maxRowSpan);

const table = tableRow.map((column, index, array) => {
  // console.log(index);

  const td = `<td></td>`;

  return `<tr>
  ${
    array.length === maxRowSpan && index + 1 === 1
      ? ` <td rowspan=${maxRowSpan}> ${dyeingData.name}</td>
  <td rowspan=${maxRowSpan}> ${dyeingData.address}</td>
  <td rowspan=${maxRowSpan}> ${dyeingData.phone}</td>`
      : ""
  }
  ${
    index % products[0].dyeing_payments.length === 0 || index === 0
      ? ` <td rowspan=${products[0].dyeing_payments.length}> ${products[0].name}</td>`
      : ""
  }
</tr>`;
});

console.log(table);
tableId.innerHTML = table.join("");

const tableData = table.map((row, rowIndex) => {});

// console.log(tableData);
