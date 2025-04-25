import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

// For development purposes only - using a mock DATABASE_URL
const DATABASE_URL = process.env.DATABASE_URL || "postgres://user:password@mock-db-url:5432/db";
console.log("WARNING: Using mock database URL. Set DATABASE_URL environment variable for real database connection.");

export const pool = new Pool({ connectionString: DATABASE_URL });
export const db = drizzle(pool, { schema });