import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const app = express();
const port = 4000;
const secret = "your-secret-key";

app.use(bodyParser.json());
app.use(cors());

const users: Array<{ id: number; username: string; password: string }> = [];

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  console.log(users);
  console.log(req.body);

  // You should check the user credentials against a database here
  // For this example, we'll just use a hardcoded user
  const user = users.find((user) => user.username === username);
  //   const user = {
  //     id: 1,
  //     username: "john.doe",
  //     password: "$2a$10$KjR4wIW8CrIv.eO3/3oKbe/ll/X1okQX9nMNzoBnEUnNjyC8wNpJG",
  //   }; // password: password

  if (!user) {
    res.status(401).send("Invalid username or password");
    return;
  }

  bcrypt.compare(password, user.password, (err, result) => {
    if (err || !result) {
      res.status(401).send("Invalid username or password");
      return;
    }

    const token = jwt.sign({ id: user.id, username: user.username }, secret, {
      expiresIn: "1h",
    });
    res.send({ token });
  });
});

app.post("/api/register", (req, res) => {
  const { username, password } = req.body;

  // Check if the user already exists
  if (users.find((user) => user.username === username)) {
    res.status(400).send("User already exists");
    return;
  }

  // Hash the password and create a new user
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      res.status(500).send("Internal server error");
      return;
    }

    const user = { id: users.length + 1, username, password: hashedPassword };
    users.push(user);

    // Create a JWT token for the new user and send it back
    const token = jwt.sign({ id: user.id, username: user.username }, secret, {
      expiresIn: "1h",
    });
    res.send({ token });
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
