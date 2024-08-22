import { Response } from "express";
import { nodeEnv } from "../app/secret";

// clear cookie
export const clearCookie = (res: Response, cookieName: string) => {
  res.clearCookie(cookieName, {
    secure: true,
    sameSite: "none",
    // secure: nodeEnv == "development" ? false : true,
    // sameSite: nodeEnv === "development" ? "strict" : "none",
    httpOnly: true,
  });
};

// set cookie
export const setCookie = ({
  res,
  cookieName,
  cookieValue,
  maxAge,
}: {
  res: Response;
  cookieName: string;
  cookieValue: string | undefined;
  maxAge?: number | undefined;
}) => {
  res.cookie(cookieName, cookieValue, {
    httpOnly: true,
    // httpOnly: false,
    maxAge,
    secure: true, // only https
    sameSite: "none", // when use cross site
    // secure: nodeEnv === "development" ? false : true, // only https
    // sameSite: nodeEnv === "development" ? "strict" : "none", // when use cross site
  });
};
