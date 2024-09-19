import { userAgent } from 'next/server';
export type visitor_info_t = {
    ua: ReturnType<typeof userAgent>;
    headers: Record<string, string>;
    cookies: Record<string, string>;
    geo: Record<string, string> & {
        city: string;
        country: string;
        region: string;
        latitude: string;
        longitude: string;
    };
    ip: string;
    banned: {
        isBanned: boolean;
        time: Date;
        duration: number;
    };
};
export declare const exampleVisitorInfo: visitor_info_t;
export declare const visitor_metadata_t: <TName extends string>(dbName: TName, fieldConfig?: unknown) => import("drizzle-orm/pg-core").PgCustomColumnBuilder<import("drizzle-orm/pg-core").ConvertCustomConfig<TName, {
    data: visitor_info_t;
    driverData: string;
    default: true;
}>>;
