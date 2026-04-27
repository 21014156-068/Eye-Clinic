import mongoose from "mongoose";

const adminUserSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    lastLoginAt: Date,
    name: {
      type: String,
      required: true,
      trim: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "superadmin",
      enum: ["superadmin"],
    },
  },
  {
    timestamps: true,
  },
);

export const AdminUser = mongoose.model("AdminUser", adminUserSchema);

