import { HttpError } from "http-errors";
import { Request } from "express";
import { string, z } from "zod";
import userSchema from "../schema/user.schema";

export type User = z.infer<typeof userSchema>;

export interface RequestWithUser extends Request {
  me?: User;
}

export interface CustomError extends HttpError {
  error.errors?: ERRORS;
}

export type ERRORS = {
  path: string | number;
  message: string;
};