import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema(
  {
    active: {
      type: Boolean,
      default: true,
    },
    bio: {
      type: String,
      required: true,
      trim: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    education: {
      type: String,
      trim: true,
      default: "",
    },
    experience: {
      type: String,
      trim: true,
      default: "",
    },
    featured: {
      type: Boolean,
      default: false,
    },
    focus: {
      type: [String],
      default: [],
    },
    initials: {
      type: String,
      required: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      required: true,
      trim: true,
    },
    schedule: {
      type: String,
      trim: true,
      default: "",
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Doctor = mongoose.model("Doctor", doctorSchema);

