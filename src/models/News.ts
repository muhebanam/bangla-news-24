import mongoose, { Schema } from "mongoose";

const NewsSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, unique: true, sparse: true },
    summary: { type: String, default: "" },
    content: { type: String, required: true },
    featuredImage: { type: String, default: "" },
    imageCaption: { type: String, default: "" },
    category: { type: String, required: true, default: "জাতীয়" },
    subCategory: { type: String, default: "" },
    author: {
      name: { type: String, default: "নিজস্ব প্রতিবেদক" },
      email: { type: String, default: "" },
      avatar: { type: String, default: "" },
      designation: { type: String, default: "স্টাফ রিপোর্টার" },
    },
    status: {
      type: String,
      enum: ["draft", "pending", "revision", "approved", "published", "rejected"],
      default: "published",
    },
    editorNotes: { type: String, default: "" },
    isBreaking: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
    isTrending: { type: Boolean, default: false },
    isLive: { type: Boolean, default: false },
    tags: [{ type: String }],
    videoUrl: { type: String, default: "" },
    audioUrl: { type: String, default: "" },
    views: { type: Number, default: 0 },
    reactions: {
      like: { type: Number, default: 0 },
      love: { type: Number, default: 0 },
      sad: { type: Number, default: 0 },
      angry: { type: Number, default: 0 },
      wow: { type: Number, default: 0 },
    },
    seo: {
      metaTitle: { type: String, default: "" },
      metaDescription: { type: String, default: "" },
      keywords: [{ type: String }],
    },
    publishedAt: { type: Date, default: Date.now },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.News || mongoose.model("News", NewsSchema);
