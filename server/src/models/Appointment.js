import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    adminNotes: {
      type: String,
      trim: true,
      default: "",
    },
    bestTime: {
      type: String,
      trim: true,
      default: "",
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    message: {
      type: String,
      trim: true,
      default: "",
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    preferredDate: Date,
    service: {
      type: String,
      required: true,
      trim: true,
    },
    source: {
      type: String,
      default: "website",
      trim: true,
    },
    status: {
      type: String,
      default: "new",
      enum: ["new", "contacted", "scheduled", "completed", "cancelled"],
    },
  },
  {
    timestamps: true,
  },
);

export const Appointment = mongoose.model("Appointment", appointmentSchema);

