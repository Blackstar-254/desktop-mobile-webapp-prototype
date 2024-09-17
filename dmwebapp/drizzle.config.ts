import type { Config } from 'drizzle-kit'

import { env } from '@blackstar/env'

export default {
  schema: './src/server/db/schema.ts',
  dialect: 'postgresql',
  dbCredentials: {
    url: env.DATABASE_URL,
  },
  schemaFilter: [],
} satisfies Config
