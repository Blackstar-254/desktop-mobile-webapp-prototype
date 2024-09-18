import { pgTable } from 'drizzle-orm/pg-core';
import { common } from './table_common';
import { client_id_ref } from './tables.billing';
import { visitor_info_t } from './utils/visitor_info';

export const visitors = pgTable('visitors', {
  ...common('visitor'),
  client_org: client_id_ref(),
  visitor_info: visitor_info_t('visitor_info'),
});
