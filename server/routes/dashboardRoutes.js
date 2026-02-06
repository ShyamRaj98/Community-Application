import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import {
  getDashboardData,
  getAdminDashboard,
} from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/", protect, getDashboardData);
router.get("/all", protect, getAdminDashboard);

export default router;
