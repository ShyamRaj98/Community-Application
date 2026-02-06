import mongoose from "mongoose";

const issueSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },

    description: {
      type: String,
      required: true,
      trim: true
    },

    category: {
      type: String,
      enum: ["Road", "Garbage", "Streetlight", "Graffiti", "Public Space"],
      required: true
    },

    priority: {
      type: String,
      enum: ["Low", "Medium", "High"],
      default: "Low"
    },

    location: {
      lat: Number,
      lng: Number
    },

    images: [String],

    status: {
      type: String,
      enum: ["Reported", "In Progress", "Resolved"],
      default: "Reported"
    },

    reportedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    volunteers: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
      }
    ]
  },
  { timestamps: true }
);

// Indexes for performance
issueSchema.index({ status: 1 });
issueSchema.index({ category: 1 });
issueSchema.index({ createdAt: -1 });

export default mongoose.model("Issue", issueSchema);
