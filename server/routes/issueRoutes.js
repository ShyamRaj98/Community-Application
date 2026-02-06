import express from "express";
import {
  createIssue,
  getIssues,
  getIssueById,
  volunteerIssue,
  updateIssueStatus,
  adminUpdateStatus,
} from "../controllers/issueController.js";
import { protect } from "../middleware/authMiddleware.js";
import { adminOnly } from "../middleware/adminMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

const router = express.Router();

router.post("/", protect, upload.array("images", 3), createIssue);
router.get("/", getIssues);
router.get("/:id", getIssueById);
router.post("/:id/volunteer", protect, volunteerIssue);
router.put("/:id/status", protect, updateIssueStatus);
router.put("/:id/admin-status", protect, adminOnly, adminUpdateStatus);

export default router;
