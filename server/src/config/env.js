import dotenv from "dotenv";

dotenv.config();

const requiredVars = ["MONGODB_URI", "MONGODB_DB_NAME", "JWT_SECRET", "ADMIN_EMAIL", "ADMIN_PASSWORD"];

for (const key of requiredVars) {
  if (!process.env[key]) {
    throw new Error(`Missing required environment variable: ${key}`);
  }
}

export const env = {
  adminEmail: process.env.ADMIN_EMAIL,
  adminName: process.env.ADMIN_NAME || "EyeCon Admin",
  adminPassword: process.env.ADMIN_PASSWORD,
  clientUrl: process.env.CLIENT_URL || "http://localhost:5173",
  jwtSecret: process.env.JWT_SECRET,
  mongoDbName: process.env.MONGODB_DB_NAME,
  mongoUri: process.env.MONGODB_URI,
  port: Number(process.env.PORT || 5000),
};

