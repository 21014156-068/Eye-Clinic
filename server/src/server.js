import { app } from "./app.js";
import { connectDatabase } from "./config/db.js";
import { env } from "./config/env.js";
import { seedDatabase } from "./seed/seedDatabase.js";

async function startServer() {
  await connectDatabase();
  await seedDatabase();

  app.listen(env.port, () => {
    console.log(`EyeCon server running on port ${env.port}`);
  });
}

startServer().catch((error) => {
  console.error("Failed to start EyeCon server", error);
  process.exit(1);
});
