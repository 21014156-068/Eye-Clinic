import { app } from "./app.js";
import { connectDatabase } from "./config/db.js";
import { env } from "./config/env.js";
import { seedDatabase } from "./seed/seedDatabase.js";

async function startServer() {
  await connectDatabase();

  const PORT = process.env.PORT || env.port || 5000;

  app.listen(PORT, () => {
    console.log(`EyeCon server running on port ${PORT}`);
  });

  // run seeding in background (don’t block server)
  seedDatabase().catch((error) => {
    console.error("Seeding failed:", error);
  });
}
