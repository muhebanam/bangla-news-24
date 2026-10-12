import mongoose, { Schema } from "mongoose";

const MediaSchema = new Schema(
  {
    title: { type: String, required: true },
    type: {
      type: String,
      enum: ["image", "video", "audio", "document"],
      default: "image",
    },
    url: { type: String, required: true },
    thumbnail: { type: String, default: "" },
    caption: { type: String, default: "" },
    photographer: { type: String, default: "স্টাফ ফটোসাংবাদিক" },
    dimensions: { type: String, default: "" },
    fileSize: { type: String, default: "" },
    tags: [{ type: String }],
    uploadedBy: { type: String, default: "অ্যাডমিন" },
  },
  { timestamps: true }
);

export default mongoose.models.Media || mongoose.model("Media", MediaSchema);
