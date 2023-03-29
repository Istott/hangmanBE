// import express, { NextFunction, Request, Response } from "express";
// import jwt from "jsonwebtoken";
// require("dotenv").config();

// module.exports = function (req: Request, res: Response, next: NextFunction) {
//   const token = req.header("jst_token");

//   if (!token) {
//     return res.status(403).json({ msg: "authorization denied" });
//   }

//   try {
//     const verify = jwt.verify(token, process.env.jwtSecret);

//     req.user = verify.users;
//     next();
//   } catch (err) {
//     res.status(401).json({ msg: "token is not valid" });
//   }
// };

import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("jwt_token");

  if (!token) {
    return res.status(403).json({ msg: "Authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    const user = decoded as { users: string }; // Cast the decoded value to an interface or type that matches your expected value

    //@ts-ignore
    req.user = user.users;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ msg: "Token is not valid" });
  }
};

export default authMiddleware;
