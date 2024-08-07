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
            dyeingRate: product.dyeing_rate,
            thaanAmount: product.thaan_amount,
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
          dyeingRate: product.dyeing_rate,
          thaanAmount: product.thaan_amount,
          productId: product.id,
          productName: product.name,
          chalanId: product.chalanId,
        },
      ];

  return [...allDetails, ...allProducts];
}, []);

const header = [
  "dyeingName",
  "dyeingAddress",
  "dyeingPhone",
  "deingRate",
  "dyeingAmount",
  "productName",
  "thaanAmount",
  "paymentDate",
  "paymentAmount",
];

const result = show.map((data) => {
  return header.map((key) => data[key]);
});

console.log(result);
