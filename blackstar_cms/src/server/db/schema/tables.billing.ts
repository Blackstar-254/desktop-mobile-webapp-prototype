import {
  index,
  integer,
  pgEnum,
  text,
  timestamp,
  uniqueIndex,
} from 'drizzle-orm/pg-core';
import { sql } from 'drizzle-orm/sql';
import { common } from './table_common';
import { social_media_integrations, user_contacts } from './utils/contact_info';
import { billing_schema } from './utils/valid_schemas';

export const organisations = billing_schema.table('organisations', {
  ...common('organisations'),
  name: text('name').unique().notNull(),
  address: text('address').notNull().default('P O Box 1862 80100'),
  domain_name: text('domain_name').unique(),
  client_id: text('client_id')
    .$default(() => sql`gen_random_uuid()::text`)
    .notNull()
    .unique(),
  contact_information: user_contacts('contact_information'),
  social_media_integration: social_media_integrations(
    'social_media_integration',
  ).default([]),
});

export const client_id_ref = () =>
  text('client_id')
    .references(() => organisations.client_id)
    .notNull();

export const payment_method_type = pgEnum('payment_method_t', [
  'cash',
  'mpesa',
  'bank_transfer',
  'cheque',
  'visa',
]);

export const payment_period_type = pgEnum('payment_period_t', [
  'monthly',
  'weekly',
  'annually',
  '3 months',
  '2 years',
  '5 years',
]);

export const pricelist = billing_schema.table(
  'pricelist',
  {
    ...common('pricelist'),
    name: text('name').notNull(),
    description: text('description'),
    sales_price_in_cents: integer('sales_price_in_cents')
      .notNull()
      .default(2000 * 100),
    payment_period: payment_period_type('payment_period').notNull(),
    cost_in_cents: integer('cost_in_cents')
      .notNull()
      .default(2000 * 100),
    cost_period: payment_period_type('cost_period').notNull(),
  },
  ({ name, payment_period }) => ({
    uniq_pricelist_item: uniqueIndex('uniq_pricelist_item').on(
      name,
      payment_period,
    ),
  }),
);

export const transactions_records = billing_schema.table(
  'transactions_records',
  {
    ...common('transactions'),

    description: text('description').notNull().unique(),
    client_id: client_id_ref(),
    credit_in_cents: integer('credit_in_cents').notNull().default(0),
    debit_in_cents: integer('debit_in_cents').notNull().default(0),
    payment_method: payment_method_type('payment_method').notNull(),
    discount_in_cents: integer('discount_in_cents').notNull().default(0),
    pending_payment_in_cents: integer('pending_payment_in_cents')
      .notNull()
      .default(0),
    next_payment_date: timestamp('next_payment_date', { withTimezone: true }),
  },
);
