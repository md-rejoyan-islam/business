import express from "express";
import {
  addCustomer,
  addCustomerCheck,
  deleteCustomerById,
  deleteCustomerCheckById,
  deleteCustomerPaymentById,
  getAllCustomerChalan,
  getAllCustomerPayments,
  getAllCustomers,
  getAllCustomersChecks,
  getCustomerById,
  getCustomerChalanById,
  paymentForCustomerChalan,
  toggleCustomerChalanMarkedById,
  updateCustomerById,
  updateCustomerCheckById,
  updateCustomerPaymentById,
} from "../controllers/customer.controller";

const customerRouter = express.Router();

customerRouter.route("/").get(getAllCustomers).post(addCustomer);

customerRouter.route("/").post();

customerRouter.route("/customer-chalan").get(getAllCustomerChalan);
// chalan by id
customerRouter.route("/customer-chalan/:id").get(getCustomerChalanById);

customerRouter.route("/all-customers-payments").get(getAllCustomerPayments);
customerRouter.route("/customer-payment").post(paymentForCustomerChalan);

// check
customerRouter
  .route("/checks")
  .get(getAllCustomersChecks)
  .post(addCustomerCheck);
customerRouter
  .route("/checks/:id")
  .patch(updateCustomerCheckById)
  .delete(deleteCustomerCheckById);

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
