import { defineConfig } from 'drizzle-kit';

import { env } from '@blackstar/env';
import { valid_schemas } from '@blackstar/server/db/schema';

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
