import bcrypt from "bcryptjs";
import { env } from "../config/env.js";
import { AdminUser } from "../models/AdminUser.js";
import { Doctor } from "../models/Doctor.js";
import { Insight } from "../models/Insight.js";
import { Service } from "../models/Service.js";
import { SiteSetting } from "../models/SiteSetting.js";
import { defaultDoctors, defaultInsights, defaultServices, defaultSettings } from "./defaultContent.js";

export async function seedDatabase() {
  const existingAdmin = await AdminUser.findOne({ email: env.adminEmail.toLowerCase() });

  if (!existingAdmin) {
    const passwordHash = await bcrypt.hash(env.adminPassword, 12);
    await AdminUser.create({
      email: env.adminEmail,
      name: env.adminName,
      passwordHash,
    });
  }

  const settingsCount = await SiteSetting.countDocuments();

  if (settingsCount === 0) {
    await SiteSetting.create(defaultSettings);
  }

  const doctorsCount = await Doctor.countDocuments();

  if (doctorsCount === 0) {
    await Doctor.insertMany(defaultDoctors);
  }

  const servicesCount = await Service.countDocuments();

  if (servicesCount === 0) {
    await Service.insertMany(defaultServices);
  }

  const insightsCount = await Insight.countDocuments();

  if (insightsCount === 0) {
    await Insight.insertMany(defaultInsights);
  }
}

