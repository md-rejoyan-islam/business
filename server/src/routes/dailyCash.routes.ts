import { Router } from "express";
import {
  addOthersCost,
  createDailyCash,
  deleteDailyCashById,
  getAllDailyCash,
  getDailyCashByDate,
} from "../controllers/dailyCash";

const dailyCashRouter = Router();

dailyCashRouter.route("/").get(getAllDailyCash).post(createDailyCash);

dailyCashRouter.route("/others-cost").post(addOthersCost);
dailyCashRouter.route("/:date").get(getDailyCashByDate);
dailyCashRouter.route("/:id").delete(deleteDailyCashById);
// dailyCashRouter.route("/:id").get(getDailyCashById).delete(deleteDailyCashById);

export default dailyCashRouter;
