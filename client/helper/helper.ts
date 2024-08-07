export const countTotalAmount = (data: []) => {
  const result = data?.reduce((sum, product) => {
    return sum + product.gray_rate * product.gray_amount;
  }, 0);

  return result;
};

export const countTotalDue = (data: []) => {
  const totalAmount = countTotalAmount(data);

  const totalPayment = data?.reduce((sum, product) => {
    const paymentSum = product?.payments?.reduce((sum, payment) => {
      return sum + payment.amount;
    }, 0);

    return sum + paymentSum;
  }, 0);

  const due = totalAmount - totalPayment;

  return due;
};
