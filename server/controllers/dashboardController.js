import Issue from "../models/Issue.js";
import User from "../models/User.js";

export const getDashboardData = async (req, res, next) => {
  try {
    const userId = req.user._id;

    const totalIssues = await Issue.countDocuments({
      reportedBy: userId,
    });

    const inProgress = await Issue.countDocuments({
      reportedBy: userId,
      status: "In Progress",
    });

    const resolved = await Issue.countDocuments({
      reportedBy: userId,
      status: "Resolved",
    });

    const recentIssues = await Issue.find({
      reportedBy: userId,
    })
      .sort({ createdAt: -1 })
      .limit(5);

    res.json({
      stats: {
        totalIssues,
        inProgress,
        resolved,
        points: req.user.points || 0,
      },
      recentIssues,
    });
  } catch (error) {
    next(error);
  }
};

export const getAdminDashboard = async (req, res, next) => {
  try {
    const totalIssues = await Issue.countDocuments();

    const activeIssues = await Issue.countDocuments({
      status: { $ne: "Resolved" },
    });

    const resolvedIssues = await Issue.countDocuments({
      status: "Resolved",
    });

    const users = await User.countDocuments();

    res.json({
      totalIssues,
      activeIssues,
      resolvedIssues,
      users,
    });
  } catch (error) {
    console.error("ADMIN DASHBOARD ERROR:", error);
    next(error);
  }
};