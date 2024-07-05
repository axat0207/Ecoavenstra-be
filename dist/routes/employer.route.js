import { Router } from "express";
import { authenticateToken, authorizeRole } from "../middleware/middleware.js";
import { getEmployerDashboard } from "../controllers/employer.js";
const route = Router();
route.get("/", authenticateToken, authorizeRole(["EMPLOYER"]), getEmployerDashboard);
export default route;
