import jwt from "jsonwebtoken";
require("dotenv").config();

export default function jwtGenerator(user_id: number) {
  const payload = {
    user: {
      id: user_id,
    },
  };

  // @ts-ignore
  return jwt.sign(payload, process.env.jwtSecret, { expiresIn: "1h" });
}

// module.exports = jwtGenerator;
