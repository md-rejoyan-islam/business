import express from "express";
import {
  addCustomer,
  deleteCustomerById,
  getAllCustomerPayments,
  getAllCustomers,
  getCustomerById,
  paymentForCustomerChalan,
  purchaseProduct,
  updateCustomerById,
} from "../controllers/customer.controller";

const customerRouter = express.Router();

customerRouter.route("/").get(getAllCustomers).post(addCustomer);

customerRouter.route("/").post();
customerRouter.route("/confirm-purchase").post(purchaseProduct);
customerRouter.route("/all-customers-payments").get(getAllCustomerPayments);
customerRouter.route("/chalan-payment").post(paymentForCustomerChalan);

customerRouter
  .route("/:id")
  .delete(deleteCustomerById)
  .put(updateCustomerById)
  .get(getCustomerById);

export default customerRouter;
