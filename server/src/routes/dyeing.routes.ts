import express from "express";
import validateRequest from "../middlewares/validationRequest";
import {
  createDyeing,
  deleteDyeingById,
  getAllDyeings,
  getDyeingById,
  updateDyeingById,
} from "../controllers/dyeing.controller";
import { createDyeingZodSchema } from "../middlewares/validation/validation";

const dyeingRouter = express.Router();

dyeingRouter
  .route("/")
  .get(getAllDyeings)
  .post(validateRequest(createDyeingZodSchema), createDyeing);

dyeingRouter
  .route("/:id")
  .get(getDyeingById)
  .put(updateDyeingById)
  .delete(deleteDyeingById);

// export dyeing router
export default dyeingRouter;
