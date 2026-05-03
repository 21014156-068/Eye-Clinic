import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    // 1. Patient Information (Step 4)
    fullName: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true },
    notes: { type: String, trim: true }, // Symptoms / Messages

    // 2. Service Information (Step 1)
    serviceId: { type: String, required: true }, // e.g., 'lasik', 'cataract', 'checkup'
    serviceLabel: { type: String },

    // 3. Doctor Information (Step 2)
    doctorId: { type: String }, // Can be an ObjectId if referenced, or just string id
    doctorName: { type: String },
    doctorRole: { type: String },

    // 4. Appointment Date, Time & Mode (Steps 3 & 4)
    mode: {
      type: String,
      enum: ["in_clinic", "video", "emergency"],
      default: "in_clinic",
    },
    date: { type: String, required: true }, // Format: YYYY-MM-DD
    time: { type: String, required: true }, // Format: HH:MM

    // We combine Date and Time into a proper JS Date object for MongoDB indexing
    appointmentDateTime: { type: Date, required: true },

    // 5. Tracking & Admin Fields
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending", // Default when public requests it
    },
    adminNotes: { type: String, trim: true, default: "" },
  },
  {
    timestamps: true,
  },
);

// 🔥 AUTO DELETE FEATURE 🔥
// This TTL index tells MongoDB to automatically delete the document
// 86400 seconds (24 hours) AFTER the `appointmentDateTime`.
appointmentSchema.index(
  { appointmentDateTime: 1 },
  { expireAfterSeconds: 86400 },
);

export const Appointment = mongoose.model("Appointment", appointmentSchema);
