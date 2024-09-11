import { timestamp } from 'drizzle-orm/pg-core'
import { serial } from 'drizzle-orm/pg-core'

export const common = (table_name: string) => ({
  id: serial(`${table_name}_id`).primaryKey().notNull(),
  created_at: timestamp(`${table_name}_created_at`).defaultNow().notNull(),
  updated_at: timestamp(`${table_name}_updated_at`).notNull(),
})
