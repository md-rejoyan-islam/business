import { prismaClient } from "./../helper/prisma";
import asyncHandler from "express-async-handler";
import { successResponse } from "../helper/responseHandler";
import { Request, Response } from "express";
import createError from "http-errors";

/**
 *
 * @description        Get All Dyeings
 * @method             GET
 *
 * @route              /api/v1/dyeing
 * @access             Private
 *
 * @params             [ page = number ]     default page = 1
 * @params             [ limit = number ]    min = 1, default = 10
 * @params             [ search query ]
 *
 * @success            { success : true , message, pagination , data }
 * @failed             { success : false, error : { status : code , message} }
 * @error              ( Not Found 404 )   No Dyeings data found
 *
 */

export const getAllDyeings = asyncHandler(
  async (_req: Request, res: Response) => {
    // get all dyeing from database
    const dyeing = await prismaClient.dyeing.findMany({
      include: {
        products: {
          include: {
            dyeing_payments: true,
            gray: true,
          },
        },
      },
    });

    // if data is empty
    if (!dyeing.length)
      throw createError.NotFound("Couldn't find any dyeing data.");

    successResponse(res, {
      statusCode: 200,
      message: "All dyeing data fetched successfully.",
      payload: {
        data: dyeing,
      },
    });
  }
);

/**
 *
 * @description        Get dyeing by id
 * @method             GET
 *
 * @route              /api/v1/dyeing/:id
 * @access             Private
 *
 * @params             [ id = number ]
 *
 * @success            { success : true  , data }
 * @failed             { success : false, error : { status : code , message} }
 * @error              ( Not Found 404 )   No Dyeings data found
 *
 */

export const getDyeingById = asyncHandler(
  async (req: Request, res: Response) => {
    const dyeing = await prismaClient.dyeing.findUnique({
      where: {
        id: +req.params.id,
      },
    });

    if (!dyeing) throw createError.NotFound("Counldn't find any dyeing data.");

    successResponse(res, {
      statusCode: 200,
      message: "dyeing data fetched successfully.",
      payload: {
        data: dyeing,
      },
    });
  }
);

/**
 *
 * @description        Create new dyeing
 * @method             POST
 *
 * @route              /api/v1/dyeing
 * @access             Private
 *
 * @body               { name, description, price, stock }
 *
 * @success            { success : true  , data }
 * @failed             { success : false, error : { status : code , message} }
 * @error              ( Bad Request 400 )   Invalid input
 *
 */

export const createDyeing = asyncHandler(
  async (req: Request, res: Response) => {
    const dyeing = await prismaClient.dyeing.create({
      data: req.body,
    });

    successResponse(res, {
      statusCode: 201,
      message: "dyeing created successfully.",
      payload: {
        data: dyeing,
      },
    });
  }
);

/**
 *
 * @description        Update dyeing by id
 * @method             PUT
 *
 * @route              /api/v1/dyeing/:id
 * @access             Private
 *
 * @params             [ id = number ]
 * @body               { name, description, price, stock }
 *
 * @success            { success : true  , data }
 * @failed             { success : false, error : { status : code , message} }
 * @error              ( Not Found 404 )   No Dyeings data found
 *
 */

export const updateDyeingById = asyncHandler(
  async (req: Request, res: Response) => {
    const exist = await prismaClient.dyeing.findUnique({
      where: { id: +req.params.id },
    });

    if (!exist) throw createError("Couldn't find dyeing by this id.");

    const dyeing = await prismaClient.dyeing.update({
      where: {
        id: +req.params.id,
      },
      data: req.body,
    });

    if (!dyeing) throw createError.NotFound("Couldn't find any dyeing data.");

    successResponse(res, {
      statusCode: 200,
      message: "dyeing updated successfully.",
      payload: {
        data: dyeing,
      },
    });
  }
);

/**
 *@description           Delete dyeing by id
 *@method                DELETE
 *
 *@route                 /api/v1/dyeing/:id
 *@access                private
 *
 *@success              { success : true  , data }
 *@failed               { success : false, error : { status : code , message} }
 *@error                ( Not Found 404 )   No Dyeings data found
 *
 */

export const deleteDyeingById = asyncHandler(
  async (req: Request, res: Response) => {
    const dyeing = await prismaClient.dyeing.findUnique({
      where: { id: +req.params.id },
    });
    if (!dyeing) throw createError.NotFound("Couldn't find any dyeing data.");

    // delete
    await prismaClient.dyeing.delete({
      where: {
        id: +req.params.id,
      },
    });

    successResponse(res, {
      statusCode: 200,
      message: "Dyeing data deleted successfully.",
      payload: {
        data: dyeing,
      },
    });
  }
);
