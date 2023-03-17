import { Express, NextFunction, Request, Response } from "express";

export function getBookHandler(
  req: Request<{ bookId: string; authorId: string }, {}, { name: string }, {}>,
  res: Response,
  next: NextFunction
) {
  console.log(req.body.name);

  return res.send(req.body.name);
}
