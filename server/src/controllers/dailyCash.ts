import { prismaClient } from "./../helper/prisma";
import asyncHandler from "express-async-handler";
import { successResponse } from "../helper/responseHandler";
import { Request, Response } from "express";
import createError from "http-errors";
import { previousCashCalculate } from "../helper/previousCost";
import { formatISO } from "date-fns";

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

    // load previous cash
    const date = new Date();

    const previousDay = date.setDate(date.getDate() - 1);

    // update daily cash data
    const todayDailyCash = await prismaClient.dailyCash.findUnique({
      where: {
        date: new Date().toISOString().split("T")[0],
      },
    });

    if (!todayDailyCash) {
      const previousCash = await prismaClient.dailyCash.findUnique({
        where: {
          date: new Date(previousDay).toISOString().split("T")[0],
        },
        include: {
          othersCost: true,
        },
      });

      const previousCashCal = await previousCashCalculate(
        new Date(previousDay).toISOString().split("T")[0],
        previousCash
      );

      // console.log(previousCash, previousCashCal);

      await prismaClient.dailyCash.create({
        data: {
          previous: previousCash ? previousCashCal : 0,
          date: new Date().toISOString().split("T")[0],
        },
      });
    }

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

// add balance
export const addBalance = asyncHandler(async (req: Request, res: Response) => {
  const { amount } = req.body;

  if (!amount) throw createError.NotFound("Amount is required!.");

  const cash = await prismaClient.dailyCash.update({
    where: {
      date: formatISO(new Date()).split("T")[0],
    },
    data: {
      cashIn: +amount,
    },
  });

  successResponse(res, {
    statusCode: 201,
    message: "Successfully balance added.",
    payload: {
      data: cash,
    },
  });
});

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
    console.log(dailyCash);

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
