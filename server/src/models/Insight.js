import mongoose from "mongoose";

const insightSchema = new mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      trim: true,
    },
    content: {
      type: String,
      trim: true,
      default: "",
    },
    displayOrder: {
      type: Number,
      default: 0,
    },
    excerpt: {
      type: String,
      required: true,
      trim: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    publishedAt: Date,
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    status: {
      type: String,
      default: "published",
      enum: ["draft", "published"],
    },
    title: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

export const Insight = mongoose.model("Insight", insightSchema);

