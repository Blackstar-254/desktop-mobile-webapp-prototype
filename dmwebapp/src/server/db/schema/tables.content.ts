import { sql } from 'drizzle-orm';
import {
  pgTable,
  serial,
  varchar,
  timestamp,
  index,
} from 'drizzle-orm/pg-core';
import { users } from './tables.user_accounts';
import { common } from './table_common';
import { content_schema } from './utils/valid_schemas';

export const posts = content_schema.table(
  'post',
  {
    ...common('posts'),
    name: varchar('name', { length: 256 }),
    createdById: varchar('created_by', { length: 255 })
      .notNull()
      .references(() => users.id),
  },
  (example) => ({
    createdByIdIdx: index('created_by_idx').on(example.createdById),
    nameIndex: index('name_idx').on(example.name),
  }),
);
