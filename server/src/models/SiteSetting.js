// models/SiteSetting.js
import mongoose from "mongoose";

const siteSettingSchema = new mongoose.Schema(
  {
    key: {
      type: String,
      required: true,
      unique: true,
      default: "main",
    },
    // Brand / Clinic info
    clinicName: { type: String, trim: true },
    tagline: { type: String, trim: true },
    phone: { type: String, trim: true },
    emergencyPhone: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    address: { type: String, trim: true },
    mapEmbedUrl: { type: String, trim: true }, // for the iframe src
    directionsUrl: { type: String, trim: true },

    // Social links
    facebook: { type: String, trim: true },
    instagram: { type: String, trim: true },
    youtube: { type: String, trim: true },
    linkedin: { type: String, trim: true },

    // Business hours (optional)
    businessHours: {
      type: Map,
      of: String,
      default: {},
    },

    // Other global settings
    logoUrl: { type: String, trim: true },
    faviconUrl: { type: String, trim: true },
    footerCopyright: { type: String, trim: true },
  },
  { timestamps: true },
);

export const SiteSetting = mongoose.model("SiteSetting", siteSettingSchema);
