export const productStatus = (product) => {
  let status = null;
  if (product?.dyeing_date) {
    status = "IN HOME";
  } else if (product?.dyeing_date && product?.gray_date) {
    status = "IN MILE";
  } else {
    status = "IN RUNNING";
  }

  return status;
};

export const numberToFixed = (number) => {
  return Number.isInteger(number) ? number : number?.toFixed(2);
};

export const productShortage = (product) => {
  // finished product
  const finishedProduct = numberToFixed(
    product?.finished_products?.reduce((acc, product) => {
      acc += product?.amount;
      return acc;
    }, 0)
  );

  const gAmount = product?.gray_amount;
  const gRate = product?.gray_rate;
  const difference =
    (finishedProduct && gAmount && finishedProduct - gAmount) || 0;
  // sortage furmula
  const shortage =
    difference > 0 &&
    gRate &&
    finishedProduct &&
    ((difference * gRate) / finishedProduct).toFixed(2);

  return shortage ? shortage : 0;
};
