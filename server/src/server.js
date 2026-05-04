import { app } from "./app.js";
import { connectDatabase } from "./config/db.js";
import { seedDatabase } from "./seed/seedDatabase.js";

async function startServer() {
  try {
    await connectDatabase();

    const PORT = process.env.PORT || 5000;

    app.listen(PORT, () => {
      console.log(`EyeCon server running on port ${PORT}`);
    });

    // run after server starts
    seedDatabase().catch((err) => console.error("Seeding failed:", err));
  } catch (error) {
    console.error("Failed to start EyeCon server", error);
    process.exit(1);
  }
}

startServer();
