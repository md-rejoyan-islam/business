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
      dyeing_payment_status: false,
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

const show = dyeingData.products?.reduce((allDetails, product) => {
  const allProducts = product?.dyeing_payments?.length
    ? product?.dyeing_payments?.reduce((sum, payment) => {
        return [
          ...sum,
          {
            dyeingId: dyeingData.id,
            dyeingName: dyeingData.name,
            dyeingAddress: dyeingData.address,
            dyeingPhone: dyeingData.phone,
            dyeing_payment_status: product.dyeing_payment_status,
            dyeing_rate: product.dyeing_rate,
            thaan_amount: product.thaan_amount,
            productId: product.id,
            productName: product.name,
            chalanId: product.chalanId,
            paymentAmount: payment.amount,
            paymentDate: payment.date,
            paymentId: payment.id,
          },
        ];
      }, [])
    : [
        {
          dyeingId: dyeingData.id,
          dyeingName: dyeingData.name,
          dyeingAddress: dyeingData.address,
          dyeingPhone: dyeingData.phone,
          dyeing_payment_status: product.dyeing_payment_status,
          dyeing_rate: product.dyeing_rate,
          thaan_amount: product.thaan_amount,
          productId: product.id,
          productName: product.name,
          chalanId: product.chalanId,
        },
      ];

  return [...allDetails, ...allProducts];
}, []);

// const tableId = document.getElementById("table")
let check = [];
const willColaps = (mainData, key, value) => {
  const result = mainData.filter((data) => {
    return data[key] === value;
  });

  // add
  if (check?.length) {
    const res = check.filter((data) => {
      return key in data;
    });
    if (!res?.length) {
      check.push({ [key]: value, colap: result.length });
    } else {
      check = check?.map((dt) => {
        // console.log(dt);

        if (key in dt) {
          //   if ((dt[key] = "dyeingPhone")) console.log("dyeingId");

          return {
            ...dt,
            colap: dt.colap > 1 ? dt.colap - 1 : dt.colap,
          };
        } else {
          return dt;
        }
      });
    }
  } else {
    check.push({ [key]: value, colap: result.length });
  }
  // console.log(check);

  const colapData = check.find((data) => key in data);
  //   console.log(colap);

  const send = {
    value: result?.length,
    colap: colapData.colap,
  };

  if (key == "productId") {
    console.log(send);
  }

  return result?.length;
};

const r = show
  .map((data, index) => {
    return `
    <tr>
    <td rowspan=${willColaps(show, "dyeingId", data.dyeingId)}>${
      data?.dyeingId
    }</td>
    <td rowspan=${willColaps(show, "dyeingName", data.dyeingName)}>${
      data?.dyeingName
    }</td>
   <td rowspan=${willColaps(show, "dyeingAddress", data.dyeingAddress)}>${
      data?.dyeingAddress
    }</td>
    <td rowspan=${willColaps(show, "dyeingPhone", data.dyeingPhone)}>${
      data?.dyeingPhone
    }</td>
      <td rowspan=${willColaps(show, "productId", data.productId)}>${
      data?.productId
    }</td>
    <td rowspan=${willColaps(show, "productName", data.productName)}>${
      data?.productName
    }</td>
    <td rowspan=${willColaps(
      show,
      "dyeing_payment_status",
      data.dyeing_payment_status
    )}>
    ${data?.dyeing_payment_status}</td>
    <td  rowspan=${willColaps(show, "dyeing_rate", data.dyeing_rate)}>${
      data?.dyeing_rate
    }</td>
    <td rowspan=${willColaps(show, "thaan_amount", data.thaan_amount)}>${
      data?.thaan_amount
    }</td>
    <td rowspan=${willColaps(show, "chalanId", data.chalanId)}
    >${data?.chalanId}</td>
    <td rowspan=${willColaps(show, "paymentAmount", data.paymentAmount)}
    >${data?.paymentAmount}</td>
    <td rowspan=${willColaps(show, "paymentDate", data.paymentDate)}
    >${data?.paymentDate}</td>
    <td rowspan=${willColaps(show, "paymentId", data.paymentId)}>${
      data?.paymentId
    }</td>
    </tr>
    `;
  })
  .join("");

document.getElementById("table").innerHTML = r;
