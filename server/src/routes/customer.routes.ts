import express from "express";
import {
  addCustomer,
  deleteCustomerById,
  deleteCustomerPaymentById,
  getAllCustomerPayments,
  getAllCustomers,
  getCustomerById,
  paymentForCustomerChalan,
  purchaseProduct,
  toggleCustomerChalanMarkedById,
  updateCustomerById,
  updateCustomerPaymentById,
} from "../controllers/customer.controller";

const customerRouter = express.Router();

customerRouter.route("/").get(getAllCustomers).post(addCustomer);

customerRouter.route("/").post();
customerRouter.route("/confirm-purchase").post(purchaseProduct);
customerRouter.route("/all-customers-payments").get(getAllCustomerPayments);
customerRouter.route("/customer-payment").post(paymentForCustomerChalan);

customerRouter
  .route("/customer-payment/:id")
  .put(updateCustomerPaymentById)
  .delete(deleteCustomerPaymentById);
customerRouter
  .route("/toggle-marked/:id")
  .patch(toggleCustomerChalanMarkedById);

customerRouter
  .route("/:id")
  .delete(deleteCustomerById)
  .put(updateCustomerById)
  .get(getCustomerById);

export default customerRouter;
