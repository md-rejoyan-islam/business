import express from "express";
import {
  createProduct,
  deleteProductById,
  getAllProducts,
  getProductById,
  productAddToDyeing,
  updateProductById,
} from "../controllers/product.controllers";
import {
  createProductZodSchema,
  productAddToDyeingZodSchema,
} from "../middlewares/validation/validation";
import validateRequest from "../middlewares/validationRequest";

const productRouter = express.Router();

productRouter
  .route("/")
  .get(getAllProducts)
  .post(validateRequest(createProductZodSchema), createProduct);

// product add to dyeing
productRouter
  .route("/add-to-dyeing")
  .patch(validateRequest(productAddToDyeingZodSchema), productAddToDyeing);

productRouter
  .route("/:id")
  .get(getProductById)
  .put(updateProductById)
  .delete(deleteProductById);

// export product router
export default productRouter;
