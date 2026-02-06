import User from "../models/User.js";

export const getLeaderboard = async (req, res) => {
  const users = await User.find()
    .select("name points")
    .sort({ points: -1 })
    .limit(10);

  res.json(users);
};
