import express, { Request, Response } from "express";

const app = express();

app.use(express.json());

// app.use(express.urlencoded({extended: true}));

// app.get("/", (req: Request, res: Response) => {
//   return res.json({
//     success: true,
//     name: "Isaac The Fullstack dev",
//   });
// });

// app.post("/api/data", (req: Request, res: Response) => {
//   console.log(req.body);

//   return res.sendStatus(200);
// });

// app.all("/api/all", (req: Request, res: Response) => {
//   return res.sendStatus(200);
// });

// app
//   .route("/")
//   .get((req: Request, res: Response) => {
//     return res.send("You made a GET Request");
//   })
//   .post((req: Request, res: Response) => {
//     return res.send("You made a POST Request");
//   })
//   .put((req: Request, res: Response) => {
//     return res.send("You made a PUT Request");
//   })
//   .delete((req: Request, res: Response) => {
//     return res.send("You made a DELETE Request");
//   });

app.get("/health", (req: Request, res: Response) => res.sendStatus(200));
app.get("/ab*cd", (req: Request, res: Response) => res.send("ab*cd"));
app.get(/abc/, (req: Request, res: Response) => res.send("abc"));

app.listen(4000, () => {
  console.log("application listening at http://localhost:4000");
});