import { NextFunction, Request, Response } from "express";
import { errorResponse } from "../helper/responseHandler";
import { HttpError } from "http-errors";

//error handle middlewares
export const errorHandler = async (
  error: HttpError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    const errorMessage = error.message || "UnKnown Error";
    const errorStatus = error.status || 500;

    errorResponse(res, {
      statusCode: errorStatus,
      message: errorMessage,
      errors: error.errors,
    });
  } catch (error: any) {
    const errorMessage = (error as Error).message || "Internal server error";
    errorResponse(res, {
      statusCode: 500,
      message: errorMessage,
    });
  }
};
