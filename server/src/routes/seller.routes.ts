import express from "express";
import {
  createSeller,
  deleteSellerById,
  getAllSellers,
  getSellerById,
  updateSellerById,
} from "../controllers/seller.controllers ";
import { isLoggedIn } from "../middlewares/verify";

const sellerRouter = express.Router();

// sellerRouter.use(isLoggedIn);

sellerRouter.route("/").get(getAllSellers).post(createSeller);

sellerRouter
  .route("/:id")
  .get(getSellerById)
  .put(updateSellerById)
  .delete(deleteSellerById);

// export seller router
export default sellerRouter;
