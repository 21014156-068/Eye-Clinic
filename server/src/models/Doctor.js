import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true, // e.g. "Senior Specialist", "Refractive Surgeon"
    },
    specialization: {
      type: String,
      trim: true, // primary specialty (e.g. "Cataract", "LASIK")
    },
    focus: {
      type: [String],
      default: [], // list of skills/procedures (e.g. ["Cataract", "Retina"])
    },
    bio: {
      type: String,
      trim: true, // doctor biography / description
    },
    photo: {
      type: String,
      trim: true, // avatar / image URL
    },
    experienceYears: {
      type: Number,
      default: 0,
    },
    rating: {
      type: Number,
      default: 4.5,
      min: 0,
      max: 5,
    },
    availabilityStatus: {
      type: String,
      trim: true, // "Available today", "This week", "Next week"
    },
    schedule: {
      type: String,
      trim: true, // line shown in featured card (e.g. "Mon–Fri 9–5")
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      trim: true,
    },
    initials: {
      type: String,
      trim: true, // fallback for avatar, e.g. "DR"
    },
    active: {
      type: Boolean,
      default: true, // soft‑hide doctors
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

export const Doctor = mongoose.model("Doctor", doctorSchema);
