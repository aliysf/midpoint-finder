/**
 * Prisma Client Singleton
 *
 * Ensures a single Prisma Client instance is reused across
 * hot-reloads in development. Prevents exhausting database connections.
 *
 * Also resolves the SQLite database path to an absolute path
 * so it works correctly regardless of the Next.js working directory.
 *
 * @see https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices
 */

import path from "path";
import { PrismaClient } from "@/generated/prisma/client";

// Resolve the SQLite database path to an absolute path.
// This ensures the database file is found regardless of
// where Next.js resolves the relative path from.
const dbPath = path.resolve(process.cwd(), "prisma", "dev.db");
process.env.DATABASE_URL = `file:${dbPath}`;

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
};

export const prisma = globalForPrisma.prisma ?? new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
