export declare const customJsonb: <TData>(name: string, exampleData: TData) => import("drizzle-orm/pg-core").PgCustomColumnBuilder<import("drizzle-orm/pg-core").ConvertCustomConfig<string, {
    data: TData;
    driverData: string;
    default: true;
}>>;
