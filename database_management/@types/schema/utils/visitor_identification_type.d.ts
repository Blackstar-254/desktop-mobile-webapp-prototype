export type VisitorIdentificationType = {
    IpAddress?: string;
    Visits: number;
    LastVisit: Date;
    VisitorCookie?: string;
    Banned: {
        isBanned: boolean;
        time: Date;
        duration: number;
    };
    device_type: string;
};
export declare const exampleVisitorIdToken: VisitorIdentificationType;
export declare const visitor_metadata: import("drizzle-orm/pg-core").PgCustomColumnBuilder<import("drizzle-orm/pg-core").ConvertCustomConfig<string, {
    data: VisitorIdentificationType;
    driverData: string;
    default: true;
}>>;
