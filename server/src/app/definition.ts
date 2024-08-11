import { HttpError } from "http-errors";
import { Request } from "express";
import { z } from "zod";
import userSchema from "../schema/user.schema";
import thaanSchema from "../schema/thaan.schema";

export type User = z.infer<typeof userSchema>;
export type Thaan = z.infer<typeof thaanSchema>;

export interface RequestWithUser extends Request {
  me?: User;
}

export type ERRORS = {
  path: string | number;
  message: string;
};

export interface CustomError extends HttpError {
  error?: {
    errors?: ERRORS;
  };
}
