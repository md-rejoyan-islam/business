import { prismaClient } from "./../helper/prisma";
import asyncHandler from "express-async-handler";
import { successResponse } from "../helper/responseHandler";
import { Request, Response } from "express";
import createError from "http-errors";

// get all customers
export const getAllCustomers = asyncHandler(
  async (_req: Request, res: Response) => {
    const customers = await prismaClient.customer.findMany({
      include: {
        products: true,
        chalans: true,
        customerPayments: true,
      },
    });

    if (!customers.length) throw createError.NotFound("No customers found");

    successResponse(res, {
      statusCode: 200,
      message: "All customers",
      payload: {
        data: customers,
      },
    });
  }
);

// get customer by id
export const getCustomerById = asyncHandler(
  async (req: Request, res: Response) => {
    const customer = await prismaClient.customer.findUnique({
      where: {
        id: +req.params.id,
      },
      include: {
        products: true,
        chalans: true,
        customerPayments: true,
      },
    });

    if (!customer) throw createError.NotFound("Customer not found");

    successResponse(res, {
      statusCode: 200,
      message: "Customer data",
      payload: {
        data: customer,
      },
    });
  }
);

// add customer
export const addCustomer = asyncHandler(async (req: Request, res: Response) => {
  const { name, phone, address } = req.body;

  if (!name || !phone || !address) {
    throw createError.BadRequest("Please provide all the required fields");
  }

  const customer = await prismaClient.customer.create({
    data: {
      name,
      phone,
      address,
    },
  });

  successResponse(res, {
    statusCode: 201,
    message: "Customer added successfully",
    payload: {
      data: customer,
    },
  });
});

// delete customer by id
export const deleteCustomerById = asyncHandler(
  async (req: Request, res: Response) => {
    const customer = await prismaClient.customer.findUnique({
      where: {
        id: +req.params.id,
      },
    });

    if (!customer) throw createError.NotFound("Customer not found");

    await prismaClient.customer.delete({
      where: {
        id: +req.params.id,
      },
    });

    successResponse(res, {
      statusCode: 200,
      message: "Customer data deleted successfully.",
      payload: {
        data: customer,
      },
    });
  }
);

// update customer by id
export const updateCustomerById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const customer = await prismaClient.customer.findUnique({
      where: { id: +id },
    });

    if (!customer) throw createError.NotFound("Customer not found!");

    const updatedCustomer = await prismaClient.customer.update({
      where: { id: +id },
      data: req.body,
    });

    successResponse(res, {
      statusCode: 200,
      message: "Customer updated successfully",
      payload: {
        data: updatedCustomer,
      },
    });
  }
);
