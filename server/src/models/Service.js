import mongoose from "mongoose";

// Sub-schema for FAQs
const faqSchema = new mongoose.Schema(
  {
    q: { type: String, required: true, trim: true },
    a: { type: String, required: true, trim: true },
  },
  { _id: false }, // We don't need a separate Object ID for each FAQ item
);

const serviceSchema = new mongoose.Schema(
  {
    // Basic Info
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, trim: true }, // Acts as the 'id' from frontend
    description: { type: String, required: true, trim: true },
    category: {
      type: String,
      required: true,
      enum: [
        "Vision Correction",
        "Surgical Procedures",
        "Eye Diseases",
        "Pediatric Care",
        "General Eye Checkup",
      ],
    },

    // UI Display Flags
    featured: { type: Boolean, default: false },
    active: { type: Boolean, default: true },
    displayOrder: { type: Number, default: 0 },

    // Card Details & Metrics
    tags: { type: [String], default: [] }, // e.g. ["Popular", "Advanced"]
    benefits: { type: [String], default: [] },
    successRate: { type: String, trim: true, default: "Varies" },
    recovery: { type: String, trim: true, default: "Varies" },
    cost: { type: String, trim: true, default: "Starting from —" },

    // Expanded Modal Details
    overview: { type: String, trim: true },
    procedureSteps: { type: String, trim: true },
    symptoms: { type: [String], default: [] },
    risks: { type: String, trim: true },

    // Relations & Extras
    faqs: { type: [faqSchema], default: [] },
    doctorRoles: { type: [String], default: [] }, // e.g. ["Refractive Surgeon", "Ophthalmologist"]
    treatments: { type: [String], default: [] }, // Kept for backward compatibility
  },
  {
    timestamps: true,
  },
);

export const Service = mongoose.model("Service", serviceSchema);
