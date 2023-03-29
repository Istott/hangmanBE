import { Request, Response } from "express";
import { PoolClient } from "pg";
import authorize from "../middleware/authorize";
import pool from "../db";

const router = require("express").Router();

router.get("/", authorize, async (req: Request, res: Response) => {
  try {
    const client: PoolClient = await pool.connect();
    const result = await client.query(
      "SELECT user_name FROM users WHERE user_id = $1",
      //@ts-ignore
      [req.user.id]
    );
    client.release();
    const user = result.rows[0];
    res.json(user);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;

// import { Request, Response } from "express";
// const router = require("express").Router();
// import authorize from "../middleware/authorize";
// import pool from "../db";

// router.get("/", authorize, async (req: Request, res: Response) => {
//   try {
//     const user = await pool.query(
//       "SELECT user_name FROM users WHERE user_id = $1",
//       //@ts-ignore
//       [req.user.id]
//     );

//     console.log(user);
//     res.json(user.rows[0]);
//   } catch (err: any) {
//     console.error(err.message);
//     res.status(500).send("Server error");
//   }
// });

// module.exports = router;
