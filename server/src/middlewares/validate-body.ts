import { Request, Response, NextFunction } from "express";
import { ERROR } from "../const";
import { InsufficientBodyError } from "../errors/Insufficient-body";

export const validateBody = <T>(keys: (keyof T)[]) => (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { body } = req;

  for (const key of keys) {
    if (body[key]) {
      continue;
    }

    next(new InsufficientBodyError(key as string));
  }

  next();
};
