import mongoose from "mongoose";

const contactMessageSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true }, // Maps to frontend 'fullName'
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },

    // Maps to frontend 'subject' dropdown
    subject: {
      type: String,
      required: true,
      enum: [
        "General Inquiry",
        "Appointment Support",
        "Emergency",
        "Billing / Insurance",
      ],
    },

    message: { type: String, required: true, trim: true },

    // Admin dashboard tracking
    status: {
      type: String,
      enum: ["new", "read", "resolved"],
      default: "new",
    },
  },
  {
    timestamps: true,
  },
);

export const ContactMessage = mongoose.model(
  "ContactMessage",
  contactMessageSchema,
);
