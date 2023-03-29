import express, { NextFunction, Request, Response } from "express";

const validInfo = (req: Request, res: Response, next: NextFunction) => {
  const { email, username, password } = req.body;

  function validEmail(userEmail: any) {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(userEmail);
  }

  if (req.path === "/register") {
    console.log(!email.length);
    if (![email, username, password].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    } else if (!validEmail(email)) {
      return res.status(401).json("Invalid Email");
    }
  } else if (req.path === "/login") {
    if (![email, password].every(Boolean)) {
      return res.status(401).json("Missing Credentials");
    } else if (!validEmail(email)) {
      return res.status(401).json("Invalid Email");
    }
  }
  next();
};

export default validInfo;
