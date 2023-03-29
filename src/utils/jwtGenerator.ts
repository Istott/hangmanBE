import jwt from "jsonwebtoken";
require("dotenv").config();

export default function jwtGenerator(user_id: number) {
  const payload = {
    user: {
      id: user_id,
    },
  };

  return jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: "1h" });
}

// module.exports = jwtGenerator;
