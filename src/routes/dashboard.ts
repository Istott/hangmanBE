import express, {
  NextFunction,
  Request,
  Response,
  Router as router,
} from "express";
import authorize from "../middleware/authorize";
import pool from "../db";

router.post("/", authorize, async (req: Request, res: Response) => {
  try {
    const user = await pool.query(
      "SELECT user_name FROM users WHERE user_id = $1",
      [req.user.id]
    );

    res.json(user.rows[0]);
  } catch (err: any) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

module.exports = router;
