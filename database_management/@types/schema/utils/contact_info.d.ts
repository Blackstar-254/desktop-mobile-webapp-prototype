import z from 'zod';
export type UserContactsType = {
    names: {
        first_name: string;
        middle_name: string;
        last_name: string;
        position?: string;
    };
    phone_number: string[];
    email: string[];
    relationship?: string;
    location: {
        street?: string;
        city?: string;
        province?: string;
        state?: string;
        postal_address?: string;
        zip_code?: string;
        nationality?: string;
    };
};
export declare const exampleUserContacts: UserContactsType;
export declare const user_contacts: <TName extends string>(dbName: TName, fieldConfig?: unknown) => import("drizzle-orm/pg-core").PgCustomColumnBuilder<import("drizzle-orm/pg-core").ConvertCustomConfig<TName, {
    data: UserContactsType[];
    driverData: string;
    default: true;
}>>;
export type social_media_type = 'Facebook' | 'Twitter' | 'Instagram' | 'Whatsapp' | 'SMS' | 'Gmail' | 'Yahoo';
export type SocialMediaIntegrationType = {
    profile_name: string;
    link: string;
    logo: string;
    profile_picture: string;
    social_media: social_media_type;
    integration?: {
        paid: boolean;
        total_paid: string;
        api_key: string;
        meta: Record<string, string>;
    };
};
export declare const exampleSocialMediaIntegration: SocialMediaIntegrationType;
export declare const social_media_lists: social_media_type[];
export declare const social_media_integrations: <TName extends string>(dbName: TName, fieldConfig?: unknown) => import("drizzle-orm/pg-core").PgCustomColumnBuilder<import("drizzle-orm/pg-core").ConvertCustomConfig<TName, {
    data: SocialMediaIntegrationType[];
    driverData: string;
    default: true;
}>>;
export declare const contactUsFormSchema: z.ZodObject<{
    name: z.ZodString;
    email: z.ZodString;
    message: z.ZodString;
    boundaryId: z.ZodString;
    valid: z.ZodBoolean;
}, "strip", z.ZodTypeAny, {
    name: string;
    email: string;
    message: string;
    boundaryId: string;
    valid: boolean;
}, {
    name: string;
    email: string;
    message: string;
    boundaryId: string;
    valid: boolean;
}>;
export declare const exampleContactUsForm: {
    name: string;
    email: string;
    message: string;
    boundaryId: string;
    valid: boolean;
};
export declare const contact_us_form_t: <TName extends string>(dbName: TName, fieldConfig?: unknown) => import("drizzle-orm/pg-core").PgCustomColumnBuilder<import("drizzle-orm/pg-core").ConvertCustomConfig<TName, {
    data: {
        name: string;
        email: string;
        message: string;
        boundaryId: string;
        valid: boolean;
    };
    driverData: string;
    default: true;
}>>;
