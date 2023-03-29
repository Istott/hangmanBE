import { Request, Response } from "express";
import bcrypt from "bcrypt";
import pool from "../db";
import validInfo from "../middleware/validInfo";
import jwtGenerator from "../utils/jwtGenerator";
import authorize from "../middleware/authorize";

const router = require("express").Router();

router.post("/register", validInfo, async (req: Request, res: Response) => {
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
});

//login route

router.post("/login", validInfo, async (req: Request, res: Response) => {
  const { password, email } = req.body;

  try {
    const user = await pool.query("SELECT * FROM users WHERE user_email = $1", [
      email,
    ]);

    if (user.rows.length === 0) {
      return res.status(401).send("Password or Email is incorrect");
    }

    const validPassword = await bcrypt.compare(
      password,
      user.rows[0].user_password
    );

    if (!validPassword) {
      return res.status(401).json("Password or Email is incorrect");
    }

    const jwtToken = jwtGenerator(user.rows[0].user_id);
    return res.json({ jwtToken });
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

router.get("/is-verify", authorize, async (req: Request, res: Response) => {
  try {
    res.json(true);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

module.exports = router;
