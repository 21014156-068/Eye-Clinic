import bcrypt from "bcryptjs";
import express from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { requireAdminAuth } from "../middleware/auth.js";
import { AdminUser } from "../models/AdminUser.js";
import { Appointment } from "../models/Appointment.js";
import { ContactMessage } from "../models/ContactMessage.js";
import { Doctor } from "../models/Doctor.js";
import { Insight } from "../models/Insight.js";
import { Service } from "../models/Service.js";
import { SiteSetting } from "../models/SiteSetting.js";

const router = express.Router();

function createAdminToken(admin) {
  return jwt.sign(
    {
      email: admin.email,
      role: admin.role,
    },
    env.jwtSecret,
    {
      expiresIn: "7d",
      subject: admin._id.toString(),
    },
  );
}

function toAdminPayload(admin) {
  return {
    email: admin.email,
    id: admin._id,
    lastLoginAt: admin.lastLoginAt,
    name: admin.name,
    role: admin.role,
  };
}

function normalizeList(value) {
  if (Array.isArray(value)) {
    return value.map((item) => String(item).trim()).filter(Boolean);
  }

  return String(value || "")
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

router.post("/auth/login", async (request, response, next) => {
  try {
    const email = String(request.body.email || "")
      .trim()
      .toLowerCase();
    const password = String(request.body.password || "");
    const admin = await AdminUser.findOne({ email });

    if (!admin) {
      return response
        .status(401)
        .json({ message: "Invalid admin credentials." });
    }

    const passwordMatches = await bcrypt.compare(password, admin.passwordHash);

    if (!passwordMatches) {
      return response
        .status(401)
        .json({ message: "Invalid admin credentials." });
    }

    admin.lastLoginAt = new Date();
    await admin.save();

    return response.json({
      data: {
        admin: toAdminPayload(admin),
        token: createAdminToken(admin),
      },
      message: "Admin login successful.",
    });
  } catch (error) {
    return next(error);
  }
});

router.use(requireAdminAuth);

router.get("/auth/me", async (request, response) => {
  response.json({
    data: {
      admin: toAdminPayload(request.admin),
    },
  });
});

router.get("/dashboard", async (_request, response, next) => {
  try {
    const [
      appointmentsCount,
      messagesCount,
      doctorsCount,
      servicesCount,
      insightsCount,
      recentAppointments,
      recentMessages,
    ] = await Promise.all([
      Appointment.countDocuments(),
      ContactMessage.countDocuments(),
      Doctor.countDocuments(),
      Service.countDocuments(),
      Insight.countDocuments(),
      Appointment.find().sort({ createdAt: -1 }).limit(5).lean(),
      ContactMessage.find().sort({ createdAt: -1 }).limit(5).lean(),
    ]);

    response.json({
      data: {
        recentAppointments,
        recentMessages,
        stats: {
          appointmentsCount,
          doctorsCount,
          insightsCount,
          messagesCount,
          servicesCount,
        },
      },
    });
  } catch (error) {
    next(error);
  }
});

// GET: Admin gets all appointments, sorted by nearest date first
router.get("/appointments", async (_request, response, next) => {
  try {
    const appointments = await Appointment.find()
      .sort({ appointmentDateTime: 1 }) // 1 = nearest dates show up first
      .lean();

    response.json({ data: appointments });
  } catch (error) {
    next(error);
  }
});

// PATCH: Admin updates status (e.g. pending -> confirmed -> completed)
router.patch("/appointments/:id", async (request, response, next) => {
  try {
    const appointment = await Appointment.findByIdAndUpdate(
      request.params.id,
      {
        adminNotes: request.body.adminNotes ?? "",
        status: request.body.status, // Admin sets to 'confirmed'
      },
      { new: true, runValidators: true },
    ).lean();

    response.json({
      data: appointment,
      message: "Appointment status updated successfully.",
    });
  } catch (error) {
    next(error);
  }
});

// DELETE: Admin manually deletes an appointment
router.delete("/appointments/:id", async (request, response, next) => {
  try {
    const appointment = await Appointment.findByIdAndDelete(request.params.id);

    if (!appointment) {
      return response.status(404).json({ message: "Appointment not found." });
    }

    response.json({ message: "Appointment deleted successfully." });
  } catch (error) {
    next(error);
  }
});

router.get("/messages", async (_request, response, next) => {
  try {
    const messages = await ContactMessage.find().sort({ createdAt: -1 }).lean();
    response.json({ data: messages });
  } catch (error) {
    next(error);
  }
});

router.patch("/messages/:id", async (request, response, next) => {
  try {
    const message = await ContactMessage.findByIdAndUpdate(
      request.params.id,
      {
        status: request.body.status,
      },
      { new: true, runValidators: true },
    ).lean();

    response.json({ data: message, message: "Message updated successfully." });
  } catch (error) {
    next(error);
  }
});

router.get("/doctors", async (_request, response, next) => {
  try {
    const doctors = await Doctor.find()
      .sort({ displayOrder: 1, name: 1 })
      .lean();
    response.json({ data: doctors });
  } catch (error) {
    next(error);
  }
});

router.post("/doctors", async (request, response, next) => {
  try {
    const doctor = await Doctor.create({
      ...request.body,
      focus: normalizeList(request.body.focus),
    });

    response
      .status(201)
      .json({ data: doctor, message: "Doctor created successfully." });
  } catch (error) {
    next(error);
  }
});

router.put("/doctors/:id", async (request, response, next) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      request.params.id,
      {
        ...request.body,
        focus: normalizeList(request.body.focus),
      },
      { new: true, runValidators: true },
    ).lean();

    response.json({ data: doctor, message: "Doctor updated successfully." });
  } catch (error) {
    next(error);
  }
});

router.delete("/doctors/:id", async (request, response, next) => {
  try {
    await Doctor.findByIdAndDelete(request.params.id);
    response.json({ message: "Doctor deleted successfully." });
  } catch (error) {
    next(error);
  }
});

router.get("/services", async (_request, response, next) => {
  try {
    const services = await Service.find()
      .sort({ displayOrder: 1, title: 1 })
      .lean();
    response.json({ data: services });
  } catch (error) {
    next(error);
  }
});

router.post("/services", async (request, response, next) => {
  try {
    const service = await Service.create({
      ...request.body,
      treatments: normalizeList(request.body.treatments),
      tags: normalizeList(request.body.tags),
      benefits: normalizeList(request.body.benefits),
      symptoms: normalizeList(request.body.symptoms),
      doctorRoles: normalizeList(request.body.doctorRoles),
      // If faqs are sent as a JSON string from frontend, parse them. Otherwise just pass them.
      faqs:
        typeof request.body.faqs === "string"
          ? JSON.parse(request.body.faqs)
          : request.body.faqs,
    });

    response
      .status(201)
      .json({ data: service, message: "Service created successfully." });
  } catch (error) {
    next(error);
  }
});

router.put("/services/:id", async (request, response, next) => {
  try {
    const service = await Service.findByIdAndUpdate(
      request.params.id,
      {
        ...request.body,
        treatments: normalizeList(request.body.treatments),
        tags: normalizeList(request.body.tags),
        benefits: normalizeList(request.body.benefits),
        symptoms: normalizeList(request.body.symptoms),
        doctorRoles: normalizeList(request.body.doctorRoles),
        faqs:
          typeof request.body.faqs === "string"
            ? JSON.parse(request.body.faqs)
            : request.body.faqs,
      },
      { new: true, runValidators: true },
    ).lean();

    response.json({ data: service, message: "Service updated successfully." });
  } catch (error) {
    next(error);
  }
});

router.delete("/services/:id", async (request, response, next) => {
  try {
    await Service.findByIdAndDelete(request.params.id);
    response.json({ message: "Service deleted successfully." });
  } catch (error) {
    next(error);
  }
});

router.get("/settings", async (_request, response, next) => {
  try {
    const settings = await SiteSetting.findOne({ key: "main" }).lean();
    response.json({ data: settings });
  } catch (error) {
    next(error);
  }
});

router.put("/settings/:id", async (request, response, next) => {
  try {
    const settings = await SiteSetting.findByIdAndUpdate(
      request.params.id,
      request.body,
      {
        new: true,
        runValidators: true,
      },
    ).lean();

    response.json({
      data: settings,
      message: "Site settings updated successfully.",
    });
  } catch (error) {
    next(error);
  }
});

export const adminRoutes = router;
