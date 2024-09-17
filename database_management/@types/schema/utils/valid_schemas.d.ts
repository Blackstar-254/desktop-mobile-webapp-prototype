export type ValidSchemaType = 'billing' | 'public' | 'content' | 'user_accounts';
export declare const CastValidSchema: (schema: ValidSchemaType) => string;
export declare const user_accounts_schema: import("drizzle-orm/pg-core").PgSchema<string>;
export declare const content_schema: import("drizzle-orm/pg-core").PgSchema<string>;
export declare const billing_schema: import("drizzle-orm/pg-core").PgSchema<string>;
export declare const valid_schemas: ValidSchemaType[];
