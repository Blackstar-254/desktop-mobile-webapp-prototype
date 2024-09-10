import {
	index,
	integer,
	pgSchema,
	pgTable,
	text,
	uniqueIndex,
} from "drizzle-orm/pg-core";
import { common } from "./table_common";

export const organisations = pgTable("organisations", {
	...common("organisations"),
	name: text("name").unique().notNull(),
	address: text("address").notNull().default("P O Box 1862 80100"),
	domain_name: text("domain_name").unique(),
});

export const payment_methods = pgTable("payment_methods", {
	...common("payment_methods"),
	name: text("name").notNull().unique(),
	description: text("description"),
	org: integer("org")
		.references(() => organisations.id)
		.notNull(),
});

export const pricelist = pgTable(
	"pricelist",
	{
		...common("pricelist"),
		name: text("name").notNull(),
		payment_method: integer("payment_method")
			.references(() => payment_methods.id)
			.notNull(),
		description: text("description"),
		price: integer("price").notNull(),
		units: text("units").notNull(),
	},
	({ name, payment_method }) => ({
		uniq_pricelist_item: uniqueIndex("uniq_pricelist_item").on(
			name,
			payment_method,
		),
	}),
);
