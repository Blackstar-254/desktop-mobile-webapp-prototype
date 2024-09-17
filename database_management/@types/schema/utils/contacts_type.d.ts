export type ContactType = {
    PhoneNumbers: string[];
    EmailAddress: string[];
    Locale?: {
        City?: string;
        Province?: string;
        State?: string;
        Nationality?: string;
    };
};
export declare const exampleContact: ContactType;
export declare const contacts: import("drizzle-orm/pg-core").PgCustomColumnBuilder<import("drizzle-orm/pg-core").ConvertCustomConfig<string, {
    data: ContactType;
    driverData: string;
    default: true;
}>>;
type ContactPerson = {
    [name: string]: {
        Contacts: ContactType;
        Relationship?: string;
        Position?: string;
    };
};
export declare const contact_person: import("drizzle-orm/pg-core").PgCustomColumnBuilder<import("drizzle-orm/pg-core").ConvertCustomConfig<string, {
    data: ContactPerson;
    driverData: string;
    default: true;
}>>;
export {};
