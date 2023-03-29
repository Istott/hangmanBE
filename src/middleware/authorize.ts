import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const authorize = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("jwt_token");

  if (!token) {
    return res.status(403).json({ msg: "Authorization denied" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    //@ts-ignore
    req.user = decoded.user;
    next();
  } catch (err) {
    console.log(err);
    res.status(401).json({ msg: "Token is not valid" });
  }
};

export default authorize;
