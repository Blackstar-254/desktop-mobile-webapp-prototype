import { sql } from 'drizzle-orm';
import {
  index,
  pgTable,
  serial,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { common } from './table_common';
import { users, visits_table } from './tables.user_accounts';
import { content_schema } from './utils/valid_schemas';
import { z } from 'zod';
import { client_id_ref } from './tables.billing';
import { contact_us_form_t } from './utils/contact_info';
import { uuid } from 'drizzle-orm/pg-core';

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

export const contact_us_form_table = content_schema.table('contact_us', {
  ...common('contct_us'),
  client: client_id_ref(),
  form_data: contact_us_form_t('form_data').notNull(),
  visitor_id: uuid('visitor_id').references(() => visits_table.visitor_id),
});
