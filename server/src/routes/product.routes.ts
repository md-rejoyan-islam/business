import express from "express";
import {
  createProduct,
  deleteProductById,
  deleteThaanById,
  getAllProducts,
  getProductById,
  productAddToDyeing,
  thaanCountAddToProduct,
  updateMultipleThaanData,
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

// thaan add
productRouter.route("/add-thaan").post(thaanCountAddToProduct);
productRouter.route("/thaans-update").put(updateMultipleThaanData);
productRouter.route("/product-thaan/:id").patch(updateThaanById);
productRouter.route("/product-thaan/:id").delete(deleteThaanById);

productRouter
  .route("/:id")
  .get(getProductById)
  .patch(updateProductById)
  .delete(deleteProductById);

// export product router
export default productRouter;
