import express, { Request, Response } from "express";
import cookieParser from "cookie-parser";
const port = 9999;

const app = express();
app.use(cookieParser());
//@ts-ignore
app.use(express.json());
app.get("/", async (req: Request, res: Response) => {
  res.send("Server is working great!");
});






import User from "./routes/user.route.js";
import { authenticateToken, authorizeRole } from "./middleware/middleware.js";
app.use("/api/v1/user", User);

import Employer from "./routes/employer.route.js";
app.use("/api/v1/employer", Employer);

import Admin from "./routes/admin.route.js";
app.use("/api/v1/admin", Admin);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
