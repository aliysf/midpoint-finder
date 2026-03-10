import { defineConfig, env } from "prisma/config";

// Only load dotenv in local development
if (process.env.NODE_ENV !== "production") {
  try {
    require("dotenv/config");
  } catch {
    // dotenv not installed, environment variables come from the platform
  }
}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  engine: "classic",
  datasource: {
    url: env("DATABASE_URL"),
  },
});
