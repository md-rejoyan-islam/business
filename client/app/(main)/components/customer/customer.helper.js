export const totalSingleCustomerAmount = (customer) => {
  return customer?.products?.reduce((sum, product) => {
    const finishedSum = product?.finishedProducts?.reduce((sum, product) => {
      return sum + product?.amount;
    }, 0);

    return sum + finishedSum;
  }, 0);
};

export const totalSingleCustomerCost = (customer) => {
  return customer?.products?.reduce((sum, product) => {
    const finishedSum = product?.finishedProducts?.reduce((sum, product) => {
      return sum + product?.amount;
    }, 0);

    return sum + (finishedSum || 0 * product?.product_rate);
  }, 0);
};

export const totalSingleCustomerPaid = (customer) => {
  return customer?.customerPayments?.reduce((sum, payment) => {
    return sum + payment?.amount || 0;
  }, 0);
};

export const totalSingleCustomerDiscount = (customer) => {
  return customer?.chalans?.reduce((sum, chalan) => {
    return sum + (chalan?.discount || 0);
  }, 0);
};
