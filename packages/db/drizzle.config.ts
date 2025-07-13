import * as dotenv from "dotenv";
import type { Config } from "drizzle-kit";

// Load the correct env file based on NODE_ENV
if (process.env.NODE_ENV === "production") {
  dotenv.config({ path: ".env.production" });
} else {
  dotenv.config({ path: ".env" });
}

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

export default {
  schema: "./src/schema.ts",
  dialect: "postgresql",
  migrations: {
    table: "drizzle_migrations",
  },
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  out: "./migrations",
  strict: process.env.NODE_ENV === "production",
} satisfies Config;
