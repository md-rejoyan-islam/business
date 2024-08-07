import { Prisma } from "@prisma/client";
import { ERRORS } from "../app/definition";

const handleClientError = (error: Prisma.PrismaClientKnownRequestError) => {
  let errors: ERRORS[] = [];
  let message = "";
  const statusCode = 400;

  if (error.code === "P2025") {
    message = (error.meta?.cause as string) || "Record not found!";
    errors = [
      {
        path: error.meta?.modelName as string,
        message,
      },
    ];
  } else if (error.code === "P2003") {
    if (error.message.includes("delete()` invocation:")) {
      message = "Delete failed";
      errors = [
        {
          path: "",
          message,
        },
      ];
    }
  } else if (error.code === "P2002") {
    message = "Unique constraint violation";

    errors = [
      {
        path: error.meta?.target as string,
        message: `${
          (error.meta?.target as string).split("_")[1]
        } already exists.`,
      },
    ];
  }

  return {
    statusCode,
    message,
    errors,
  };
};

export default handleClientError;
