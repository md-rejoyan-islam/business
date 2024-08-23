import { prismaClient } from "./../helper/prisma";
import asyncHandler from "express-async-handler";
import { successResponse } from "../helper/responseHandler";
import { Request, Response } from "express";
import createError from "http-errors";

interface DateQuery {
  gte?: string;
  lte?: string;
  eq?: string;
}

// get all customers
export const getAllCustomers = asyncHandler(
  async (req: Request, res: Response) => {
    const dateQuery = req.query?.date as DateQuery;
    const customers = await prismaClient.customer.findMany({
      include: {
        products: {
          include: {
            finishedProducts: true,
          },
        },
        chalans: {
          include: {
            customer: true,
            customerProducts: {
              include: {
                finishedProducts: true,
                product: true,
              },
            },
          },
          where: {
            date: dateQuery
              ? {
                  gte: dateQuery?.gte ? dateQuery.gte : undefined,
                  lte: dateQuery.lte ? dateQuery.lte : undefined,
                  equals: dateQuery.eq ? dateQuery.eq : undefined,
                }
              : undefined,
          },
        },
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
    const dateQuery = req.query?.date as DateQuery;

    const customer = await prismaClient.customer.findUnique({
      where: {
        id: +req.params.id,
      },
      include: {
        products: {
          include: {
            finishedProducts: true,
          },
        },
        chalans: {
          include: {
            customerProducts: {
              include: {
                finishedProducts: true,
                product: true,
              },
            },
            payments: true,
          },
          where: {
            date: dateQuery
              ? {
                  gte: dateQuery?.gte ? dateQuery.gte : undefined,
                  lte: dateQuery.lte ? dateQuery.lte : undefined,
                  equals: dateQuery.eq ? dateQuery.eq : undefined,
                }
              : undefined,
          },
          orderBy: {
            date: "desc",
          },
        },
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

// purchase product
export const purchaseProduct = asyncHandler(
  async (req: Request, res: Response) => {
    const { customer, products, payment } = req.body;

    let customerId = null;
    // if customer is new
    if (!customer?.beforeData) {
      const newCustomer = await prismaClient.customer.create({
        data: {
          name: customer.name,
          phone: customer.phone,
          address: customer.address,
        },
      });
      customerId = newCustomer.id;
    } else {
      customerId = customer.id;
    }

    // create customer chalan data
    const customerChalan = await prismaClient.customerChalan.create({
      data: {
        customerId: +customerId,
        date: new Date().toISOString().split("T")[0],
      },
    });

    // create customer product data and update finished product data
    products?.map(async (product: any) => {
      // crease customer product
      const productData = await prismaClient.customerProduct.create({
        data: {
          customerId: +customerId,
          productId: +product.id,
          product_rate: +product.sellRate,
          chalanId: customerChalan.id,
        },
      });

      // update finished product data
      const finished_product = product?.items?.map(async (item: any) => {
        await prismaClient.finishedProduct.update({
          where: {
            id: +item.id,
          },
          data: {
            is_sold: true,
            customerProductId: productData.id,
          },
        });
      });

      return finished_product;
    });

    // if payment done
    if (payment?.amount) {
      await prismaClient.customerPayment.create({
        data: {
          customerId: +customerId,
          amount: +payment.amount,
          date: new Date().toISOString().split("T")[0],
          customerChalanId: customerChalan.id,
        },
      });
    }

    successResponse(res, {
      statusCode: 201,
      message: "Product purchased successfully",
      payload: {
        data: null,
      },
    });
  }
);

// get all cutomer payment
export const getAllCustomerPayments = asyncHandler(
  async (req: Request, res: Response) => {
    const dateQuery = req.query?.date as DateQuery;

    const payments = await prismaClient.customerPayment.findMany({
      include: {
        customer: true,
      },
      where: {
        date: dateQuery
          ? {
              gte: dateQuery?.gte ? dateQuery.gte : undefined,
              lte: dateQuery.lte ? dateQuery.lte : undefined,
              equals: dateQuery.eq ? dateQuery.eq : undefined,
            }
          : undefined,
      },
    });

    if (!payments?.length)
      throw createError.NotFound("Couldn't find any customer payments");

    successResponse(res, {
      statusCode: 200,
      message: "All customers payments data",
      payload: {
        data: payments,
      },
    });
  }
);

// payment for customer chalan
export const paymentForCustomerChalan = asyncHandler(
  async (req: Request, res: Response) => {
    const { customerChalanId, customerId, amount, date } = req.body;

    // create payment
    const payment = await prismaClient.customerPayment.create({
      data: {
        customerId: +customerId,
        amount: +amount,
        date: date.split("T")[0],
        customerChalanId: customerChalanId ? +customerChalanId : null,
      },
    });

    successResponse(res, {
      statusCode: 201,
      message: "Payment done successfully",
      payload: {
        data: payment,
      },
    });
  }
);

// update customer payment by id
export const updateCustomerPaymentById = asyncHandler(
  async (req: Request, res: Response) => {
    console.log(req.body);

    const payment = await prismaClient.customerPayment.findUnique({
      where: {
        id: +req.params.id,
      },
    });

    if (!payment) createError.NotFound("Customer payment data not found.");

    const updatedData = await prismaClient.customerPayment.update({
      where: { id: +req.params.id },
      data: {
        amount: req.body.amount,
        date: req.body.date.split("T")[0],
      },
    });

    successResponse(res, {
      statusCode: 200,
      message: "Customer payment updated successfully.",
      payload: {
        data: updatedData,
      },
    });
  }
);

// delete customer payment by id
export const deleteCustomerPaymentById = asyncHandler(
  async (req: Request, res: Response) => {
    const payment = await prismaClient.customerPayment.findUnique({
      where: {
        id: +req.params.id,
      },
    });

    if (payment) createError.NotFound("Customer payment data not found.");

    await prismaClient.customerPayment.delete({
      where: {
        id: +req.params.id,
      },
    });
    successResponse(res, {
      statusCode: 200,
      message: "Customer payment deleted succefully.",
      payload: {
        data: payment,
      },
    });
  }
);

// toggle gray marked
export const toggleCustomerChalanMarkedById = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;

    const chalan = await prismaClient.customerChalan.findUnique({
      where: { id: +id },
    });

    if (!chalan) throw createError.NotFound("Chalan not found!");

    const updatedChalan = await prismaClient.customerChalan.update({
      where: { id: +id },
      data: {
        markedPaid: req.body.markedPaid,
        discount: req.body.discount,
      },
    });

    successResponse(res, {
      statusCode: 200,
      message: "Change marked.",
      payload: {
        data: updatedChalan,
      },
    });
  }
);
