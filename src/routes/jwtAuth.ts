import express, { NextFunction, Request, Response } from "express";
// const router = express.Router();
const router = require("express").Router();
// import {Router as router} from "express";
// import bodyParser from "body-parser";
// import cors from "cors";
// import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import pool from "../db";
// import validInfo from '../middleware/validInfo'
import jwtGenerator from "../utils/jwtGenerator";
// import authorize from "../middleware/authorize";

// router.post("/register", validInfo, async (req: Request, res: Response) => {
router.post("/register", async (req: Request, res: Response) => {
  const { username, password, email } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length > 0) {
      return res.status(401).json("user already exist!");
    }

    const salt = await bcrypt.genSalt(10);
    const bcryptPassword = await bcrypt.hash(password, salt);

    let newUser = await pool.query(
      "INSERT INTO users (user_name, user_email, user_password) VALUES ($1, $2, $3) RETURNING *",
      [username, email, bcryptPassword]
    );

    const jwtToken = jwtGenerator(newUser.rows[0].user_id);

    return res.json({ jwtToken });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }

  // // Check if the user already exists
  // if (users.find((user) => user.username === username)) {
  //   res.status(400).send("User already exists");
  //   return;
  // }

  // // Hash the password and create a new user
  // bcrypt.hash(password, 10, (err, hashedPassword) => {
  //   if (err) {
  //     res.status(500).send("Internal server error");
  //     return;
  //   }

  //   const user = { id: users.length + 1, username, password: hashedPassword };
  //   users.push(user);

  //   // Create a JWT token for the new user and send it back
  //   const token = jwt.sign({ id: user.id, username: user.username }, secret, {
  //     expiresIn: "1h",
  //   });
  //   res.send({ token });
  // });
});

module.exports = router;
