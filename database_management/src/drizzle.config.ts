import dotenv from 'dotenv';
import { defineConfig } from 'drizzle-kit';
import { z } from 'zod';
import { valid_schemas } from './schema/index';

dotenv.config();
const envSchema = z.object({
  DATABASE_URL: z.string().url().min(3),
});
const env = envSchema.parse(process.env);

export default defineConfig({
  schema: './src/schema',
  dialect: 'postgresql',
  out: './schema',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  migrations: {
    table: 'migrations_custom', // default `__drizzle_migrations`,
    schema: 'public', // used in PostgreSQL only and default to `drizzle`
  },

  schemaFilter: valid_schemas,
  verbose: true,
  strict: true,
});
