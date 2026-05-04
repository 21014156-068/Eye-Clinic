import express from "express";
import { Appointment } from "../models/Appointment.js";
import { ContactMessage } from "../models/ContactMessage.js";
import { Doctor } from "../models/Doctor.js";
import { Service } from "../models/Service.js";
import { SiteSetting } from "../models/SiteSetting.js";

const router = express.Router();

router.get("/health", (_request, response) => {
  response.json({ message: "EyeCon API is running." });
});

router.get("/bootstrap", async (_request, response, next) => {
  try {
    const [settings, doctors, services] = await Promise.all([
      SiteSetting.findOne({ key: "main" }).lean(),
      Doctor.find({ active: true })
        .sort({ featured: -1, displayOrder: 1, name: 1 })
        .lean(),
      Service.find({ active: true })
        .sort({ featured: -1, displayOrder: 1, title: 1 })
        .lean(),
    ]);

    response.json({
      data: {
        doctors,

        services,
        settings,
      },
    });
  } catch (error) {
    next(error);
  }
});

// POST: Add new appointment (Maps to your frontend step-by-step form)
router.post("/appointments", async (request, response, next) => {
  try {
    const { date, time } = request.body;

    // Combine date and time strings into a proper JS Date object
    // Assuming date is "YYYY-MM-DD" and time is "HH:MM"
    const appointmentDateTime = new Date(`${date}T${time}`);

    const appointment = await Appointment.create({
      ...request.body, // Spread frontend payload (fullName, phone, serviceId, etc.)
      appointmentDateTime,
      status: "pending", // Always starts as pending for admin to confirm
    });

    response.status(201).json({
      data: appointment,
      message: "Appointment request received successfully.",
    });
  } catch (error) {
    next(error);
  }
});

// PATCH: Public update (Reschedule/Update) "if admin agrees / status allows"
router.patch("/appointments/:id", async (request, response, next) => {
  try {
    // 1. Find the existing appointment
    const existingAppt = await Appointment.findById(request.params.id);
    if (!existingAppt) {
      return response.status(404).json({ message: "Appointment not found." });
    }

    // 2. Check condition (If admin marked it completed or cancelled, public cannot edit it)
    if (
      existingAppt.status === "completed" ||
      existingAppt.status === "cancelled"
    ) {
      return response.status(403).json({
        message:
          "This appointment can no longer be updated. Please contact the clinic.",
      });
    }

    // 3. Update fields (recalculate Date object if date/time changed)
    const updates = { ...request.body };
    if (updates.date && updates.time) {
      updates.appointmentDateTime = new Date(`${updates.date}T${updates.time}`);
    }

    const updatedAppt = await Appointment.findByIdAndUpdate(
      request.params.id,
      updates,
      { new: true, runValidators: true },
    ).lean();

    response.json({
      data: updatedAppt,
      message: "Appointment updated successfully.",
    });
  } catch (error) {
    next(error);
  }
});

router.post("/messages", async (request, response, next) => {
  try {
    const message = await ContactMessage.create({
      name: request.body.fullName, // Mapped from React form state
      phone: request.body.phone,
      email: request.body.email,
      subject: request.body.subject, // Mapped from React form state
      message: request.body.message,
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
