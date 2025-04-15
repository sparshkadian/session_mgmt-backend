import dotenv from 'dotenv';
import { z } from 'zod';
dotenv.config();

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(10),
  NODE_ENV: z.string(),
  PORT: z.string(),
  DOMAIN: z.string(),
});

export const env = envSchema.parse({
  DATABASE_URL: process.env.DATABASE_URL,
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  PORT: process.env.PORT,
  DOMAIN: process.env.DOMAIN,
});
