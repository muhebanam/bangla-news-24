import mongoose, { Schema } from "mongoose";

const AssignmentSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    beat: { type: String, default: "জাতীয়" },
    assignedTo: {
      name: { type: String, required: true },
      email: { type: String, default: "" },
    },
    assignedBy: {
      name: { type: String, default: "বার্তা সম্পাদক" },
    },
    priority: {
      type: String,
      enum: ["জরুরি", "উচ্চ", "স্বাভাবিক", "কম"],
      default: "স্বাভাবিক",
    },
    status: {
      type: String,
      enum: ["বরাদ্দকৃত", "চলমান", "জমা_দেওয়া", "সম্পন্ন"],
      default: "বরাদ্দকৃত",
    },
    deadline: { type: Date, required: true },
    submittedNewsId: { type: String, default: "" },
  },
  { timestamps: true }
);

export default mongoose.models.Assignment || mongoose.model("Assignment", AssignmentSchema);
