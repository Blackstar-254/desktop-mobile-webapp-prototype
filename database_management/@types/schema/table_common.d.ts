export declare const common: (table_name: string) => {
    id: import("drizzle-orm").NotNull<import("drizzle-orm").IsPrimaryKey<import("drizzle-orm").NotNull<import("drizzle-orm/pg-core").PgSerialBuilderInitial<`${string}_id`>>>>;
    created_at: import("drizzle-orm", { with: { "resolution-mode": "import" } }).HasDefault<import("drizzle-orm/pg-core").PgTimestampBuilderInitial<`${string}_createdat`>>;
    updated_at: import("drizzle-orm", { with: { "resolution-mode": "import" } }).HasDefault<import("drizzle-orm").NotNull<import("drizzle-orm/pg-core").PgTimestampBuilderInitial<`${string}_updatedat`>>>;
};
