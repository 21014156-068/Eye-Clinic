import mongoose from "mongoose";

const siteSettingSchema = new mongoose.Schema(
  {
    aboutHeadline: {
      type: String,
      trim: true,
      default: "Premium eye care, shaped to feel clear, calm, and confidently modern.",
    },
    aboutSummary: {
      type: String,
      trim: true,
      default:
        "EyeCon is designed as an advanced vision clinic where precision diagnostics, specialist guidance, and patient comfort all belong to the same experience.",
    },
    brandName: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    hours: {
      type: String,
      trim: true,
      required: true,
    },
    key: {
      type: String,
      required: true,
      unique: true,
      default: "main",
    },
    location: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
    signature: {
      type: String,
      required: true,
      trim: true,
    },
    tagline: {
      type: String,
      required: true,
      trim: true,
    },
    whatsapp: {
      type: String,
      trim: true,
      default: "",
    },
  },
  {
    timestamps: true,
  },
);

export const SiteSetting = mongoose.model("SiteSetting", siteSettingSchema);

