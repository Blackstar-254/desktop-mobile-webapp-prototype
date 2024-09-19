export declare const visitors: import('drizzle-orm/pg-core').PgTableWithColumns<{
  name: 'visitors';
  schema: undefined;
  columns: {
    client_org: import('drizzle-orm/pg-core').PgColumn<
      {
        name: 'client_id';
        tableName: 'visitors';
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
    visitor_info: import('drizzle-orm/pg-core').PgColumn<
      {
        name: 'visitor_info';
        tableName: 'visitors';
        dataType: 'custom';
        columnType: 'PgCustomColumn';
        data: import('./utils/visitor_info').VisitorInfoType;
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
        tableName: 'visitors';
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
        tableName: 'visitors';
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
        tableName: 'visitors';
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
