import express from "express";
import {
  countFinishedProduct,
  createGrayDyeingProduct,
  createProduct,
  deleteProductById,
  deleteThaanById,
  getAllProducts,
  getProductById,
  productAddToDyeing,
  updateMultipleFinishedData,
  updateProductById,
  updateThaanById,
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

// create gray-dyeing-product
productRouter
  .route("/create-gray-dyeing-products")
  .post(createGrayDyeingProduct);

// thaan add
productRouter.route("/add-finished-product").post(countFinishedProduct);
productRouter
  .route("/update-finished-products")
  .put(updateMultipleFinishedData);
productRouter.route("/product-thaan/:id").patch(updateThaanById);
productRouter.route("/product-thaan/:id").delete(deleteThaanById);

productRouter
  .route("/:id")
  .get(getProductById)
  .patch(updateProductById)
  .delete(deleteProductById);

// export product router
export default productRouter;
