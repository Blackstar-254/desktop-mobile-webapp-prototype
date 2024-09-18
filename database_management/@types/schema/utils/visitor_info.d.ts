export type VisitorInfoType = {
    ip_address: string;
    last_visit: Date;
    cookie: string;
    banned: {
        isBanned: boolean;
        time: Date;
        duration: number;
    };
};
export declare const exampleVisitorInfo: {
    ip_address: string;
    last_visit: Date;
    cookie: string;
    banned: {
        isBanned: boolean;
        time: Date;
        duration: number;
    };
};
export declare const visitor_info_t: <TName extends string>(dbName: TName, fieldConfig?: unknown) => import("drizzle-orm/pg-core").PgCustomColumnBuilder<import("drizzle-orm/pg-core").ConvertCustomConfig<TName, {
    data: VisitorInfoType;
    driverData: string;
    default: true;
}>>;
