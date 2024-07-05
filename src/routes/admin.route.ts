import { Router } from "express";
import { authenticateToken, authorizeRole } from "../middleware/middleware.js";
import { getAdminDashboard } from "../controllers/admin.js";

const route = Router();

route.get(
  "/",
  authenticateToken,
  authorizeRole(["ADMIN"]),
  getAdminDashboard
);

export default route;
