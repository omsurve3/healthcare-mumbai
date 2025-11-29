// src/lib/prisma.js
import { PrismaClient } from "../generated/prisma"
import { PrismaNeon } from "@prisma/adapter-neon"
import { Pool } from "@neondatabase/serverless"

const connectionString =
  process.env.DATABASE_URL ??
  "postgresql://neondb_owner:npg_eauE8qnkMf7A@ep-lingering-poetry-adv3lb77-pooler.c-2.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require"

const pool = new Pool({ connectionString })
const adapter = new PrismaNeon(pool)

const globalForPrisma = globalThis

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter,
    log: ["error", "warn"],
  })

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma
}
