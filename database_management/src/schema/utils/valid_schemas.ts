import { pgSchema } from 'drizzle-orm/pg-core'

export type ValidSchemaType = 'billing' | 'public' | 'content' | 'user_accounts'

export const CastValidSchema = (schema: ValidSchemaType) => {
  return schema as unknown as string
}

export const user_accounts_schema = pgSchema(CastValidSchema('user_accounts'))
export const content_schema = pgSchema(CastValidSchema('content'))
export const billing_schema = pgSchema(CastValidSchema('billing'))

export const valid_schemas: ValidSchemaType[] = [
  'billing',
  'content',
  'public',
  'user_accounts',
]
