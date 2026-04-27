import jwt from "jsonwebtoken";
import { env } from "../config/env.js";
import { AdminUser } from "../models/AdminUser.js";

export async function requireAdminAuth(request, response, next) {
  try {
    const authHeader = request.headers.authorization || "";

    if (!authHeader.startsWith("Bearer ")) {
      return response.status(401).json({ message: "Authorization token missing." });
    }

    const token = authHeader.replace("Bearer ", "");
    const decoded = jwt.verify(token, env.jwtSecret);
    const admin = await AdminUser.findById(decoded.sub).lean();

    if (!admin) {
      return response.status(401).json({ message: "Admin session is no longer valid." });
    }

    request.admin = admin;
    return next();
  } catch (error) {
    return response.status(401).json({ message: "Invalid or expired admin session." });
  }
}

