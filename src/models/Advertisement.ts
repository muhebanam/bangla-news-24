import mongoose, { Schema } from "mongoose";

const AdvertisementSchema = new Schema(
  {
    title: { type: String, required: true },
    advertiser: { type: String, required: true },
    placement: {
      type: String,
      enum: ["header_leaderboard", "sidebar_box", "in_article", "footer_banner", "sticky_bottom"],
      required: true,
    },
    imageUrl: { type: String, required: true },
    targetUrl: { type: String, required: true },
    status: {
      type: String,
      enum: ["active", "paused", "expired"],
      default: "active",
    },
    impressions: { type: Number, default: 0 },
    clicks: { type: Number, default: 0 },
    startDate: { type: Date, default: Date.now },
    endDate: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.models.Advertisement || mongoose.model("Advertisement", AdvertisementSchema);
