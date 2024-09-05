import { prismaClient } from "./../helper/prisma";
import asyncHandler from "express-async-handler";
import { successResponse } from "../helper/responseHandler";
import { Request, Response } from "express";
import createError from "http-errors";

// get daily cash
export const getAllDailyCash = asyncHandler(
  async (_req: Request, res: Response) => {
    const dailyCash = await prismaClient.dailyCash.findMany();

    if (!dailyCash.length)
      throw createError.NotFound("Couldn't find any daily cash.");

    successResponse(res, {
      statusCode: 200,
      message: "Daily cash fetched successfully",
      payload: {
        data: dailyCash,
      },
    });
  }
);

// get daily cash by id
export const getDailyCashById = asyncHandler(
  async (req: Request, res: Response) => {
    const dailyCash = await prismaClient.dailyCash.findUnique({
      where: {
        id: +req.params.id,
      },
    });

    if (!dailyCash) throw createError.NotFound("Couldn't find any");

    successResponse(res, {
      statusCode: 200,
      message: "Successfully fetch",
      payload: {
        data: dailyCash,
      },
    });
  }
);

// get daily cash by date
export const getDailyCashByDate = asyncHandler(
  async (req: Request, res: Response) => {
    const dailyCash = await prismaClient.dailyCash.findUnique({
      where: {
        date: req.params.date,
      },
      include: {
        othersCost: true,
      },
    });

    successResponse(res, {
      statusCode: 200,
      message: "Successfully fetch daily cash data.",
      payload: {
        data: dailyCash ? dailyCash : {},
      },
    });
  }
);

// create daily cash data
export const createDailyCash = asyncHandler(
  async (req: Request, res: Response) => {
    const dailyCash = await prismaClient.dailyCash.create({
      data: {
        date: req.body.date,
        previous: req.body.previous,
      },
    });

    successResponse(res, {
      statusCode: 200,
      message: "Successfully created",
      payload: {
        data: dailyCash,
      },
    });
  }
);

// delete daily cash by id
export const deleteDailyCashById = asyncHandler(
  async (req: Request, res: Response) => {
    const dailyCash = await prismaClient.dailyCash.findUnique({
      where: {
        id: +req.params.id,
      },
    });

    if (!dailyCash) throw createError.NotFound("Couldn't find any daily cash.");

    await prismaClient.dailyCash.delete({
      where: {
        id: +req.params.id,
      },
    });

    successResponse(res, {
      statusCode: 200,
      message: "Successfully deleted",
      payload: {
        data: dailyCash,
      },
    });
  }
);

// add others cost
export const addOthersCost = asyncHandler(
  async (req: Request, res: Response) => {
    const dailyCash = await prismaClient.dailyCash.findUnique({
      where: {
        date: new Date().toISOString().split("T")[0],
      },
    });

    if (!dailyCash) throw createError.NotFound("Daily Cash not found.");

    const other = await prismaClient.dailyOthersCost.create({
      data: {
        date: req.body.date.split("T")[0],
        amount: req.body.amount,
        name: req.body.name,
        dailyCashId: dailyCash?.id,
      },
    });

    successResponse(res, {
      statusCode: 201,
      message: "Success.",
      payload: {
        data: other,
      },
    });
  }
);
