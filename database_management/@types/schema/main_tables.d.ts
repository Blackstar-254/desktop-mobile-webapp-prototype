export declare const frontdesk_schema: import('drizzle-orm/pg-core').PgSchema<'frontdesk'>
export declare const patients_records: import('drizzle-orm/pg-core').PgTableWithColumns<{
  name: 'patients_file'
  schema: 'frontdesk'
  columns: {
    patients_name: import('drizzle-orm/pg-core').PgColumn<
      {
        name: 'patient_name'
        tableName: 'patients_file'
        dataType: 'string'
        columnType: 'PgText'
        data: string
        driverParam: string
        notNull: true
        hasDefault: false
        isPrimaryKey: false
        isAutoincrement: false
        hasRuntimeDefault: false
        enumValues: [string, ...string[]]
        baseColumn: never
        generated: undefined
      },
      {},
      {}
    >
    patient_no: import('drizzle-orm/pg-core').PgColumn<
      {
        name: 'patient_no'
        tableName: 'patients_file'
        dataType: 'string'
        columnType: 'PgText'
        data: string
        driverParam: string
        notNull: true
        hasDefault: false
        isPrimaryKey: false
        isAutoincrement: false
        hasRuntimeDefault: false
        enumValues: [string, ...string[]]
        baseColumn: never
        generated: undefined
      },
      {},
      {}
    >
    file_no: import('drizzle-orm/pg-core').PgColumn<
      {
        name: 'file_no'
        tableName: 'patients_file'
        dataType: 'string'
        columnType: 'PgText'
        data: string
        driverParam: string
        notNull: true
        hasDefault: false
        isPrimaryKey: false
        isAutoincrement: false
        hasRuntimeDefault: false
        enumValues: [string, ...string[]]
        baseColumn: never
        generated: undefined
      },
      {},
      {}
    >
    occupation: import('drizzle-orm/pg-core').PgColumn<
      {
        name: 'occupation'
        tableName: 'patients_file'
        dataType: 'string'
        columnType: 'PgText'
        data: string
        driverParam: string
        notNull: false
        hasDefault: false
        isPrimaryKey: false
        isAutoincrement: false
        hasRuntimeDefault: false
        enumValues: [string, ...string[]]
        baseColumn: never
        generated: undefined
      },
      {},
      {}
    >
    contact_info: import('drizzle-orm/pg-core').PgColumn<
      {
        name: 'contact_info'
        tableName: 'patients_file'
        dataType: 'json'
        columnType: 'PgJson'
        data: unknown
        driverParam: unknown
        notNull: true
        hasDefault: true
        isPrimaryKey: false
        isAutoincrement: false
        hasRuntimeDefault: false
        enumValues: undefined
        baseColumn: never
        generated: undefined
      },
      {},
      {}
    >
    next_of_kin: import('drizzle-orm/pg-core').PgColumn<
      {
        name: 'next_of_kin'
        tableName: 'patients_file'
        dataType: 'json'
        columnType: 'PgJson'
        data: unknown
        driverParam: unknown
        notNull: true
        hasDefault: true
        isPrimaryKey: false
        isAutoincrement: false
        hasRuntimeDefault: false
        enumValues: undefined
        baseColumn: never
        generated: undefined
      },
      {},
      {}
    >
    date_of_birth: import('drizzle-orm/pg-core').PgColumn<
      {
        name: 'date_of_birth'
        tableName: 'patients_file'
        dataType: 'string'
        columnType: 'PgDateString'
        data: string
        driverParam: string
        notNull: true
        hasDefault: false
        isPrimaryKey: false
        isAutoincrement: false
        hasRuntimeDefault: false
        enumValues: undefined
        baseColumn: never
        generated: undefined
      },
      {},
      {}
    >
    current_age: import('drizzle-orm/pg-core').PgColumn<
      {
        name: 'current_age'
        tableName: 'patients_file'
        dataType: 'string'
        columnType: 'PgText'
        data: string
        driverParam: string
        notNull: false
        hasDefault: true
        isPrimaryKey: false
        isAutoincrement: false
        hasRuntimeDefault: false
        enumValues: [string, ...string[]]
        baseColumn: never
        generated: import('drizzle-orm').GeneratedColumnConfig<string>
      },
      {},
      {}
    >
    id: import('drizzle-orm/pg-core').PgColumn<
      {
        name: `${string}_id`
        tableName: 'patients_file'
        dataType: 'number'
        columnType: 'PgSerial'
        data: number
        driverParam: number
        notNull: true
        hasDefault: true
        isPrimaryKey: true
        isAutoincrement: false
        hasRuntimeDefault: false
        enumValues: undefined
        baseColumn: never
        generated: undefined
      },
      {},
      {}
    >
    created_at: import('drizzle-orm/pg-core').PgColumn<
      {
        name: `${string}_createdat`
        tableName: 'patients_file'
        dataType: 'date'
        columnType: 'PgTimestamp'
        data: Date
        driverParam: string
        notNull: false
        hasDefault: true
        isPrimaryKey: false
        isAutoincrement: false
        hasRuntimeDefault: false
        enumValues: undefined
        baseColumn: never
        generated: undefined
      },
      {},
      {}
    >
    updated_at: import('drizzle-orm/pg-core').PgColumn<
      {
        name: `${string}_updatedat`
        tableName: 'patients_file'
        dataType: 'date'
        columnType: 'PgTimestamp'
        data: Date
        driverParam: string
        notNull: true
        hasDefault: true
        isPrimaryKey: false
        isAutoincrement: false
        hasRuntimeDefault: false
        enumValues: undefined
        baseColumn: never
        generated: undefined
      },
      {},
      {}
    >
  }
  dialect: 'pg'
}>
