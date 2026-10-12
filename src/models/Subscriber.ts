import mongoose, { Schema } from "mongoose";

const SubscriberSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, default: "" },
    phone: { type: String, default: "" },
    plan: {
      type: String,
      enum: ["free", "pro_monthly", "pro_yearly", "enterprise"],
      default: "free",
    },
    paymentMethod: {
      type: String,
      enum: ["none", "bkash", "nagad", "card"],
      default: "none",
    },
    transactionId: { type: String, default: "" },
    status: {
      type: String,
      enum: ["active", "cancelled", "expired"],
      default: "active",
    },
    expiresAt: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.models.Subscriber || mongoose.model("Subscriber", SubscriberSchema);
