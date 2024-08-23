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
