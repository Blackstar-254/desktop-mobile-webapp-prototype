export declare const customJsonb: <TData>(example: TData) => <TName extends string>(dbName: TName, fieldConfig?: unknown) => import("drizzle-orm/pg-core").PgCustomColumnBuilder<import("drizzle-orm/pg-core").ConvertCustomConfig<TName, {
    data: TData;
    driverData: string;
    default: true;
}>>;
export declare const customArrayJsonb: <TData>(example: TData) => <TName extends string>(dbName: TName, fieldConfig?: unknown) => import("drizzle-orm/pg-core").PgCustomColumnBuilder<import("drizzle-orm/pg-core").ConvertCustomConfig<TName, {
    data: TData[];
    driverData: string;
    default: true;
}>>;
