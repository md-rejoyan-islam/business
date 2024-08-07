import express from "express";
import {
  createGray,
  deleteGrayById,
  getAllGrays,
  getGrayById,
  updateGrayById,
} from "../controllers/gray.controller";
import validateRequest from "../middlewares/validationRequest";
import { createGrayZodSchema } from "../middlewares/validation/validation";

const grayRouter = express.Router();

grayRouter
  .route("/")
  .get(getAllGrays)
  .post(validateRequest(createGrayZodSchema), createGray);

grayRouter
  .route("/:id")
  .get(getGrayById)
  .put(updateGrayById)
  .delete(deleteGrayById);

// export gray router
export default grayRouter;
