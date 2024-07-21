import { Router } from "express";
import { authenticateToken, authorizeRole } from "../middleware/middleware.js";
import { getAdminDashboard, deleteArticle, deleteJob, deleteService, getArticleById, getArticles, getJobById, getJobs, getServiceById, getServices, postArticle, postJobs, postService, searchArticlesByTitle, searchJobsByTitle, searchServicesByTitle, updateArticle, updateJob, updateService, } from "../controllers/admin.js";
const route = Router();
route.get("/", 
// authenticateToken,
// authorizeRole(["ADMIN"]),
getAdminDashboard);
// Article routes
route.post("/articles", 
// authenticateToken,
// authorizeRole(["ADMIN"]),
postArticle);
route.get("/articles", 
// authenticateToken,
// authorizeRole(["ADMIN"]),
getArticles);
route.get("/articles/:id", 
// authenticateToken,
// authorizeRole(["ADMIN"]),
getArticleById);
route.put("/articles/:id", 
// authenticateToken,
// authorizeRole(["ADMIN"]),
updateArticle);
route.delete("/articles/:id", 
// authenticateToken,
// authorizeRole(["ADMIN"]),
deleteArticle);
route.get("/articles/search", 
// authenticateToken,
// authorizeRole(["ADMIN"]),
searchArticlesByTitle);
// Service routes
route.post("/services", authenticateToken, authorizeRole(["ADMIN"]), postService);
route.get("/services", authenticateToken, authorizeRole(["ADMIN"]), getServices);
route.get("/services/:id", authenticateToken, authorizeRole(["ADMIN"]), getServiceById);
route.put("/services/:id", authenticateToken, authorizeRole(["ADMIN"]), updateService);
route.delete("/services/:id", authenticateToken, authorizeRole(["ADMIN"]), deleteService);
route.get("/services/search", authenticateToken, authorizeRole(["ADMIN"]), searchServicesByTitle);
// Job routes
route.post("/jobs", authenticateToken, authorizeRole(["ADMIN"]), postJobs);
route.get("/jobs", authenticateToken, authorizeRole(["ADMIN"]), getJobs);
route.get("/jobs/:id", authenticateToken, authorizeRole(["ADMIN"]), getJobById);
route.put("/jobs/:id", authenticateToken, authorizeRole(["ADMIN"]), updateJob);
route.delete("/jobs/:id", authenticateToken, authorizeRole(["ADMIN"]), deleteJob);
route.get("/jobs/search", authenticateToken, authorizeRole(["ADMIN"]), searchJobsByTitle);
export default route;
