export declare const organisations: import('drizzle-orm/pg-core').PgTableWithColumns<{
  name: 'organisations';
  schema: string;
  columns: {
    name: import('drizzle-orm/pg-core').PgColumn<
      {
        name: 'name';
        tableName: 'organisations';
        dataType: 'string';
        columnType: 'PgText';
        data: string;
        driverParam: string;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        generated: undefined;
      },
      {},
      {}
    >;
    address: import('drizzle-orm/pg-core').PgColumn<
      {
        name: 'address';
        tableName: 'organisations';
        dataType: 'string';
        columnType: 'PgText';
        data: string;
        driverParam: string;
        notNull: true;
        hasDefault: true;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        generated: undefined;
      },
      {},
      {}
    >;
    domain_name: import('drizzle-orm/pg-core').PgColumn<
      {
        name: 'domain_name';
        tableName: 'organisations';
        dataType: 'string';
        columnType: 'PgText';
        data: string;
        driverParam: string;
        notNull: false;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        generated: undefined;
      },
      {},
      {}
    >;
    client_id: import('drizzle-orm/pg-core').PgColumn<
      {
        name: 'client_id';
        tableName: 'organisations';
        dataType: 'string';
        columnType: 'PgText';
        data: string;
        driverParam: string;
        notNull: true;
        hasDefault: true;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: true;
        enumValues: [string, ...string[]];
        baseColumn: never;
        generated: undefined;
      },
      {},
      {}
    >;
    contact_information: import('drizzle-orm/pg-core').PgColumn<
      {
        name: 'contact_information';
        tableName: 'organisations';
        dataType: 'custom';
        columnType: 'PgCustomColumn';
        data: import('./utils/contact_info').UserContactsType[];
        driverParam: string;
        notNull: false;
        hasDefault: true;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: undefined;
        baseColumn: never;
        generated: undefined;
      },
      {},
      {}
    >;
    social_media_integration: import('drizzle-orm/pg-core').PgColumn<
      {
        name: 'social_media_integration';
        tableName: 'organisations';
        dataType: 'custom';
        columnType: 'PgCustomColumn';
        data: import('./utils/contact_info').SocialMediaIntegrationType[];
        driverParam: string;
        notNull: false;
        hasDefault: true;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: undefined;
        baseColumn: never;
        generated: undefined;
      },
      {},
      {}
    >;
    id: import('drizzle-orm/pg-core').PgColumn<
      {
        name: `${string}_id`;
        tableName: 'organisations';
        dataType: 'number';
        columnType: 'PgSerial';
        data: number;
        driverParam: number;
        notNull: true;
        hasDefault: true;
        isPrimaryKey: true;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: undefined;
        baseColumn: never;
        generated: undefined;
      },
      {},
      {}
    >;
    created_at: import('drizzle-orm/pg-core').PgColumn<
      {
        name: `${string}_created_at`;
        tableName: 'organisations';
        dataType: 'date';
        columnType: 'PgTimestamp';
        data: Date;
        driverParam: string;
        notNull: true;
        hasDefault: true;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: undefined;
        baseColumn: never;
        generated: undefined;
      },
      {},
      {}
    >;
    updated_at: import('drizzle-orm/pg-core').PgColumn<
      {
        name: `${string}_updated_at`;
        tableName: 'organisations';
        dataType: 'date';
        columnType: 'PgTimestamp';
        data: Date;
        driverParam: string;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: undefined;
        baseColumn: never;
        generated: undefined;
      },
      {},
      {}
    >;
  };
  dialect: 'pg';
}>;
export declare const client_id_ref: () => import('drizzle-orm').NotNull<
  import('drizzle-orm/pg-core').PgTextBuilder<{
    name: 'client_id';
    dataType: 'string';
    columnType: 'PgText';
    data: string;
    enumValues: [string, ...string[]];
    driverParam: string;
    generated: undefined;
  }>
>;
export declare const payment_method_type: import('drizzle-orm/pg-core').PgEnum<
  ['cash', 'mpesa', 'bank_transfer', 'cheque', 'visa']
>;
export declare const payment_period_type: import('drizzle-orm/pg-core').PgEnum<
  ['monthly', 'weekly', 'annually', '3 months', '2 years', '5 years']
>;
export declare const pricelist: import('drizzle-orm/pg-core').PgTableWithColumns<{
  name: 'pricelist';
  schema: string;
  columns: {
    name: import('drizzle-orm/pg-core').PgColumn<
      {
        name: 'name';
        tableName: 'pricelist';
        dataType: 'string';
        columnType: 'PgText';
        data: string;
        driverParam: string;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        generated: undefined;
      },
      {},
      {}
    >;
    description: import('drizzle-orm/pg-core').PgColumn<
      {
        name: 'description';
        tableName: 'pricelist';
        dataType: 'string';
        columnType: 'PgText';
        data: string;
        driverParam: string;
        notNull: false;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        generated: undefined;
      },
      {},
      {}
    >;
    sales_price_in_cents: import('drizzle-orm/pg-core').PgColumn<
      {
        name: 'sales_price_in_cents';
        tableName: 'pricelist';
        dataType: 'number';
        columnType: 'PgInteger';
        data: number;
        driverParam: string | number;
        notNull: true;
        hasDefault: true;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: undefined;
        baseColumn: never;
        generated: undefined;
      },
      {},
      {}
    >;
    payment_period: import('drizzle-orm/pg-core').PgColumn<
      {
        name: 'payment_period';
        tableName: 'pricelist';
        dataType: 'string';
        columnType: 'PgEnumColumn';
        data:
          | 'monthly'
          | 'weekly'
          | 'annually'
          | '3 months'
          | '2 years'
          | '5 years';
        driverParam: string;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [
          'monthly',
          'weekly',
          'annually',
          '3 months',
          '2 years',
          '5 years',
        ];
        baseColumn: never;
        generated: undefined;
      },
      {},
      {}
    >;
    cost_in_cents: import('drizzle-orm/pg-core').PgColumn<
      {
        name: 'cost_in_cents';
        tableName: 'pricelist';
        dataType: 'number';
        columnType: 'PgInteger';
        data: number;
        driverParam: string | number;
        notNull: true;
        hasDefault: true;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: undefined;
        baseColumn: never;
        generated: undefined;
      },
      {},
      {}
    >;
    cost_period: import('drizzle-orm/pg-core').PgColumn<
      {
        name: 'cost_period';
        tableName: 'pricelist';
        dataType: 'string';
        columnType: 'PgEnumColumn';
        data:
          | 'monthly'
          | 'weekly'
          | 'annually'
          | '3 months'
          | '2 years'
          | '5 years';
        driverParam: string;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [
          'monthly',
          'weekly',
          'annually',
          '3 months',
          '2 years',
          '5 years',
        ];
        baseColumn: never;
        generated: undefined;
      },
      {},
      {}
    >;
    id: import('drizzle-orm/pg-core').PgColumn<
      {
        name: `${string}_id`;
        tableName: 'pricelist';
        dataType: 'number';
        columnType: 'PgSerial';
        data: number;
        driverParam: number;
        notNull: true;
        hasDefault: true;
        isPrimaryKey: true;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: undefined;
        baseColumn: never;
        generated: undefined;
      },
      {},
      {}
    >;
    created_at: import('drizzle-orm/pg-core').PgColumn<
      {
        name: `${string}_created_at`;
        tableName: 'pricelist';
        dataType: 'date';
        columnType: 'PgTimestamp';
        data: Date;
        driverParam: string;
        notNull: true;
        hasDefault: true;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: undefined;
        baseColumn: never;
        generated: undefined;
      },
      {},
      {}
    >;
    updated_at: import('drizzle-orm/pg-core').PgColumn<
      {
        name: `${string}_updated_at`;
        tableName: 'pricelist';
        dataType: 'date';
        columnType: 'PgTimestamp';
        data: Date;
        driverParam: string;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: undefined;
        baseColumn: never;
        generated: undefined;
      },
      {},
      {}
    >;
  };
  dialect: 'pg';
}>;
export declare const transactions_records: import('drizzle-orm/pg-core').PgTableWithColumns<{
  name: 'transactions_records';
  schema: string;
  columns: {
    description: import('drizzle-orm/pg-core').PgColumn<
      {
        name: 'description';
        tableName: 'transactions_records';
        dataType: 'string';
        columnType: 'PgText';
        data: string;
        driverParam: string;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        generated: undefined;
      },
      {},
      {}
    >;
    client_id: import('drizzle-orm/pg-core').PgColumn<
      {
        name: 'client_id';
        tableName: 'transactions_records';
        dataType: 'string';
        columnType: 'PgText';
        data: string;
        driverParam: string;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: [string, ...string[]];
        baseColumn: never;
        generated: undefined;
      },
      {},
      {}
    >;
    credit_in_cents: import('drizzle-orm/pg-core').PgColumn<
      {
        name: 'credit_in_cents';
        tableName: 'transactions_records';
        dataType: 'number';
        columnType: 'PgInteger';
        data: number;
        driverParam: string | number;
        notNull: true;
        hasDefault: true;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: undefined;
        baseColumn: never;
        generated: undefined;
      },
      {},
      {}
    >;
    debit_in_cents: import('drizzle-orm/pg-core').PgColumn<
      {
        name: 'debit_in_cents';
        tableName: 'transactions_records';
        dataType: 'number';
        columnType: 'PgInteger';
        data: number;
        driverParam: string | number;
        notNull: true;
        hasDefault: true;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: undefined;
        baseColumn: never;
        generated: undefined;
      },
      {},
      {}
    >;
    payment_method: import('drizzle-orm/pg-core').PgColumn<
      {
        name: 'payment_method';
        tableName: 'transactions_records';
        dataType: 'string';
        columnType: 'PgEnumColumn';
        data: 'cash' | 'mpesa' | 'bank_transfer' | 'cheque' | 'visa';
        driverParam: string;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: ['cash', 'mpesa', 'bank_transfer', 'cheque', 'visa'];
        baseColumn: never;
        generated: undefined;
      },
      {},
      {}
    >;
    discount_in_cents: import('drizzle-orm/pg-core').PgColumn<
      {
        name: 'discount_in_cents';
        tableName: 'transactions_records';
        dataType: 'number';
        columnType: 'PgInteger';
        data: number;
        driverParam: string | number;
        notNull: true;
        hasDefault: true;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: undefined;
        baseColumn: never;
        generated: undefined;
      },
      {},
      {}
    >;
    pending_payment_in_cents: import('drizzle-orm/pg-core').PgColumn<
      {
        name: 'pending_payment_in_cents';
        tableName: 'transactions_records';
        dataType: 'number';
        columnType: 'PgInteger';
        data: number;
        driverParam: string | number;
        notNull: true;
        hasDefault: true;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: undefined;
        baseColumn: never;
        generated: undefined;
      },
      {},
      {}
    >;
    next_payment_date: import('drizzle-orm/pg-core').PgColumn<
      {
        name: 'next_payment_date';
        tableName: 'transactions_records';
        dataType: 'date';
        columnType: 'PgTimestamp';
        data: Date;
        driverParam: string;
        notNull: false;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: undefined;
        baseColumn: never;
        generated: undefined;
      },
      {},
      {}
    >;
    id: import('drizzle-orm/pg-core').PgColumn<
      {
        name: `${string}_id`;
        tableName: 'transactions_records';
        dataType: 'number';
        columnType: 'PgSerial';
        data: number;
        driverParam: number;
        notNull: true;
        hasDefault: true;
        isPrimaryKey: true;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: undefined;
        baseColumn: never;
        generated: undefined;
      },
      {},
      {}
    >;
    created_at: import('drizzle-orm/pg-core').PgColumn<
      {
        name: `${string}_created_at`;
        tableName: 'transactions_records';
        dataType: 'date';
        columnType: 'PgTimestamp';
        data: Date;
        driverParam: string;
        notNull: true;
        hasDefault: true;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: undefined;
        baseColumn: never;
        generated: undefined;
      },
      {},
      {}
    >;
    updated_at: import('drizzle-orm/pg-core').PgColumn<
      {
        name: `${string}_updated_at`;
        tableName: 'transactions_records';
        dataType: 'date';
        columnType: 'PgTimestamp';
        data: Date;
        driverParam: string;
        notNull: true;
        hasDefault: false;
        isPrimaryKey: false;
        isAutoincrement: false;
        hasRuntimeDefault: false;
        enumValues: undefined;
        baseColumn: never;
        generated: undefined;
      },
      {},
      {}
    >;
  };
  dialect: 'pg';
}>;
