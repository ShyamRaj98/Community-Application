import Issue from "../models/Issue.js";
import User from "../models/User.js";
import {
  REPORT_POINTS,
  RESOLUTION_POINTS,
  VOLUNTEER_POINTS,
} from "../utils/points.js";
// CREATE ISSUE
// CREATE ISSUE
export const createIssue = async (req, res, next) => {
  try {
    console.log("REQ BODY:", req.body);
    console.log("REQ FILES:", req.files);

    const imageUrls = req.files?.map(file => file.path) || [];

    const issue = await Issue.create({
      title: req.body.title,
      description: req.body.description,
      category: req.body.category,
      priority: req.body.priority,
      images: imageUrls,
      location: {
        lat: req.body.lat,
        lng: req.body.lng
      },
      reportedBy: req.user._id
    });

    const user = await User.findById(req.user._id);
    user.points += REPORT_POINTS;
    await user.save();

    res.status(201).json(issue);
  } catch (error) {
    next(error); // ⭐ THIS IS THE FIX
  }
};


// GET ALL ISSUES
export const getIssues = async (req, res) => {
  const issues = await Issue.find()
    .populate("reportedBy", "name")
    .sort({ createdAt: -1 });

  res.json(issues);
};

// GET SINGLE ISSUE
export const getIssueById = async (req, res) => {
  const issue = await Issue.findById(req.params.id)
    .populate("reportedBy", "name")
    .populate("volunteers", "name");

  if (!issue) return res.status(404).json({ message: "Issue not found" });

  res.json(issue);
};

// VOLUNTEER FOR ISSUE
export const volunteerIssue = async (req, res) => {
  const issue = await Issue.findById(req.params.id);

  if (!issue) return res.status(404).json({ message: "Issue not found" });

  if (issue.volunteers.includes(req.user._id))
    return res.status(400).json({ message: "Already volunteered" });

  issue.volunteers.push(req.user._id);

  // Optional: move status automatically
  if (issue.status === "Reported") {
    issue.status = "In Progress";
  }

  await issue.save();

  // reward volunteer
  const user = await User.findById(req.user._id);
  user.points += VOLUNTEER_POINTS;
  await user.save();

  res.json(issue);
};

// UPDATE STATUS (ADMIN LATER, USER FOR NOW)
export const updateIssueStatus = async (req, res) => {
  const issue = await Issue.findById(req.params.id);

  if (!issue) return res.status(404).json({ message: "Issue not found" });

  issue.status = req.body.status;
  await issue.save();

  res.json(issue);
};

export const adminUpdateStatus = async (req, res) => {
  const issue = await Issue.findById(req.params.id);

  if (!issue) return res.status(404).json({ message: "Issue not found" });

  // only reward once
  if (issue.status !== "Resolved" && req.body.status === "Resolved") {
    const volunteers = issue.volunteers;
    const share = volunteers.length
      ? Math.floor(RESOLUTION_POINTS / volunteers.length)
      : 0;

    for (let v of volunteers) {
      const user = await User.findById(v);
      user.points += share;
      await user.save();
    }
  }

  issue.status = req.body.status;
  await issue.save();

  res.json(issue);
};
