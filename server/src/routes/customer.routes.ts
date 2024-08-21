import express from "express";
import {
  addCustomer,
  deleteCustomerById,
  getAllCustomers,
  getCustomerById,
  updateCustomerById,
} from "../controllers/customer.controller";

const customerRouter = express.Router();

customerRouter.route("/").get(getAllCustomers).post(addCustomer);

customerRouter
  .route("/:id")
  .delete(deleteCustomerById)
  .put(updateCustomerById)
  .get(getCustomerById);

export default customerRouter;
