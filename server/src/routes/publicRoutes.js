import express from "express";
import { Appointment } from "../models/Appointment.js";
import { ContactMessage } from "../models/ContactMessage.js";
import { Doctor } from "../models/Doctor.js";
import { Insight } from "../models/Insight.js";
import { Service } from "../models/Service.js";
import { SiteSetting } from "../models/SiteSetting.js";

const router = express.Router();

router.get("/health", (_request, response) => {
  response.json({ message: "EyeCon API is running." });
});

router.get("/bootstrap", async (_request, response, next) => {
  try {
    const [settings, doctors, services, insights] = await Promise.all([
      SiteSetting.findOne({ key: "main" }).lean(),
      Doctor.find({ active: true }).sort({ featured: -1, displayOrder: 1, name: 1 }).lean(),
      Service.find({ active: true }).sort({ featured: -1, displayOrder: 1, title: 1 }).lean(),
      Insight.find({ status: "published" }).sort({ featured: -1, displayOrder: 1, publishedAt: -1 }).lean(),
    ]);

    response.json({
      data: {
        doctors,
        insights,
        services,
        settings,
      },
    });
  } catch (error) {
    next(error);
  }
});

router.post("/appointments", async (request, response, next) => {
  try {
    const appointment = await Appointment.create({
      bestTime: request.body.bestTime,
      email: request.body.email,
      message: request.body.message,
      name: request.body.name,
      phone: request.body.phone,
      preferredDate: request.body.preferredDate || undefined,
      service: request.body.service,
    });

    response.status(201).json({
      data: appointment,
      message: "Appointment request received successfully.",
    });
  } catch (error) {
    next(error);
  }
});

router.post("/messages", async (request, response, next) => {
  try {
    const message = await ContactMessage.create({
      contactMethod: request.body.contactMethod,
      email: request.body.email,
      message: request.body.message,
      name: request.body.name,
      phone: request.body.phone,
    });

    response.status(201).json({
      data: message,
      message: "Message received successfully.",
    });
  } catch (error) {
    next(error);
  }
});

export const publicRoutes = router;

