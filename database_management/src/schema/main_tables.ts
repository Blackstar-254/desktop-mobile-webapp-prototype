import {
	json,
	pgSchema,
	text,
	date,
	interval,
	pgEnum,
	timestamp,
	uuid,
	integer,
	pgTable,
	unique,
	index,
} from "drizzle-orm/pg-core";
import { common } from "./table_common";
import { sql } from "drizzle-orm/sql";
import { pricelist } from "./accounts";

type Contact = {
	PhoneNumbers: string[];
	EmailAddress: string[];
	Locale: {
		City: string;
		Province: string;
		State: string;
		Nationality: string;
	};
};

type NextOfKin = {
	[name: string]: {
		Phone: string;
		Email?: string;
		Relationship: string;
	};
};

const exampleContact: Contact = {
	PhoneNumbers: [],
	EmailAddress: [],
	Locale: {
		City: "",
		Province: "",
		State: "",
		Nationality: "Ke",
	},
};

const exampleNextOfKin: NextOfKin = {
	["NA"]: {
		Phone: "",
		Email: "",
		Relationship: "",
	},
};

export const patients_records = pgTable("patients_file", {
	...common("patients_file"),
	uuid: uuid("uuid").notNull().defaultRandom().unique(),
	patients_name: text("patient_name").unique().notNull(),
	patient_no: text("patient_no").notNull().unique(),
	file_no: text("file_no").notNull().unique(),
	occupation: text("occupation"),
	contact_info: json("contact_info")
		.notNull()
		.default(JSON.stringify(exampleContact)),
	next_of_kin: json("next_of_kin")
		.notNull()
		.default(JSON.stringify(exampleNextOfKin)),
	date_of_birth: date("date_of_birth").notNull(),
});

export const visit_type = pgEnum("visit_type", [
	"outpatient",
	"post-op",
	"review",
	"inpatient-la",
	"inpatient-ga",
	"inpatient-emergency",
	"diagnostic",
]);

export const time_sheet = pgTable("time_sheet", {
	...common("time_sheet"),
	entry_time: timestamp("entry_time").defaultNow().notNull(),
	triage_time: timestamp("triage_time"),
	consult_entry_time: timestamp("consult_entry_time"),
	consult_exit_time: timestamp("consult_exit_time"),
	admission_time: timestamp("admission_time"),
	theatre_entry_time: timestamp("theatre_entry_time"),
	theatre_exit_time: timestamp("theatre_exit_time"),

	exit_time: timestamp("exit_time"),
});

export const visit_records = pgTable("visit_records", {
	...common("visit"),
	date: date("date").defaultNow().notNull(),
	visit_type: visit_type("type").notNull(),
	appt_id: integer("appt_id").references(() => appt_cal.id),
	time_sheet: integer("time_row")
		.references(() => time_sheet.id)
		.notNull(),
	patient: integer("patient").references(() => patients_records.id),
	current_age: interval("current_age").notNull(),
});

export const services_records = pgTable("services_records", {
	...common("services_records"),
	visit_id: integer("visit_id")
		.references(() => visit_records.id)
		.notNull(),
	service_id: integer("service_id")
		.references(() => pricelist.id)
		.notNull(),
	comment: text("comment").default(""),
	quantity: integer("quantity").notNull().default(1),
	price: integer("price").notNull().default(100),
});

export const appt_state_t = pgEnum("appt_state_t", [
	"appointment",
	"confirmed",
	"cancelled",
	"blank",
]);

export const appt_cal = pgTable(
	"appt_cal",
	{
		...common("appt_cal"),
		appt_date: timestamp("appt_date", { withTimezone: true })
			.notNull()
			.unique(),
		patient_id: uuid("patient_uuid").references(() => patients_records.uuid),
		appt_state: appt_state_t("appt_state").notNull().default("blank"),
	},
	({ appt_date, patient_id }) => {
		return {
			appt_idx: index("uniq_appt_idx").on(appt_date, patient_id),
		};
	},
);
