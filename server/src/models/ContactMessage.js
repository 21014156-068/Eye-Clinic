import mongoose from "mongoose";

const contactMessageSchema = new mongoose.Schema(
  {
    contactMethod: {
      type: String,
      trim: true,
      default: "Phone",
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      default: "",
    },
    message: {
      type: String,
      trim: true,
      required: true,
    },
    name: {
      type: String,
      trim: true,
      required: true,
    },
    phone: {
      type: String,
      trim: true,
      default: "",
    },
    status: {
      type: String,
      default: "new",
      enum: ["new", "reviewed", "resolved"],
    },
  },
  {
    timestamps: true,
  },
);

export const ContactMessage = mongoose.model("ContactMessage", contactMessageSchema);

