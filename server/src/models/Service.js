import mongoose from "mongoose";

const serviceSchema = new mongoose.Schema(
  {
    accent: {
      type: String,
      trim: true,
      default: "#83efe7",
    },
    active: {
      type: Boolean,
      default: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    subtitle: {
      type: String,
      trim: true,
      default: "",
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
    treatments: {
      type: [String],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

export const Service = mongoose.model("Service", serviceSchema);

