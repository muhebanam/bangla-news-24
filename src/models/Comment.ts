import mongoose, { Schema } from "mongoose";

const CommentSchema = new Schema(
  {
    newsId: { type: String, required: true },
    newsTitle: { type: String, default: "" },
    userName: { type: String, required: true },
    userEmail: { type: String, default: "" },
    userAvatar: { type: String, default: "" },
    content: { type: String, required: true },
    likes: { type: Number, default: 0 },
    status: {
      type: String,
      enum: ["approved", "pending", "flagged", "spam"],
      default: "approved",
    },
    aiModerationScore: { type: Number, default: 0 },
    replies: [
      {
        userName: String,
        userAvatar: String,
        content: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.models.Comment || mongoose.model("Comment", CommentSchema);
