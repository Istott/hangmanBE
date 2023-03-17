import express, { NextFunction, Request, Response } from "express";
import routes from "./routes";

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

// app.get("/health", (req: Request, res: Response) => res.sendStatus(200));
// app.get("/ab*cd", (req: Request, res: Response) => res.send("ab*cd"));
// app.get(/abc/, (req: Request, res: Response) => res.send("abc"));

// function handleGetBook1(req: Request, res: Response, next: NextFunction) {
//   console.log(req.params);

//   next();
// }

// function handleGetBook2(req: Request, res: Response, next: NextFunction) {
//   console.log("second handler");

//   return res.send(req.params);
// }

// app.get("/api/books/:bookId/:authorId/:date", [handleGetBook1, handleGetBook2]);

// app.get(
//   "/api/books/:bookId/:authorId/:date",
//   function (req: Request, res: Response, next: NextFunction) {
//     console.log(req.params);
//     next();
//   },
//   function (req: Request, res: Response, next: NextFunction) {
//     console.log("second handler");

//     return res.send(req.params);
//   }
// );

const middleware =
  ({ name }: { name: string }) =>
  (req: Request, res: Response, next: NextFunction) => {
    req.body.name = name;
    next();
  };

app.use(middleware({ name: "IsaacIsAwesome" }));

routes(app);

// async function throwsError() {
//   throw new Error("Boom!");
// }

// app.get("/error", async (req: Request, res: Response) => {
//   try {
//     await throwsError();
//     res.sendStatus(200);
//   } catch (e) {
//     res.status(400).send("something aint right homie");
//   }
// });

app.listen(4000, () => {
  console.log("application listening at http://localhost:4000");
});
