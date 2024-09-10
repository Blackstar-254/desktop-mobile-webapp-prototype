CREATE TYPE "public"."appt_state_t" AS ENUM('appointment', 'confirmed', 'cancelled', 'blank');
--> statement-breakpoint
CREATE TYPE "public"."visit_type" AS ENUM('outpatient', 'post-op', 'review', 'inpatient-la', 'inpatient-ga', 'inpatient-emergency', 'diagnostic');
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "organisations" (
	"organisations_id" serial PRIMARY KEY NOT NULL,
	"organisations_created_at" timestamp DEFAULT now() NOT NULL,
	"organisations_updated_at" timestamp NOT NULL,
	"name" text NOT NULL,
	"address" text DEFAULT 'P O Box 1862 80100' NOT NULL,
	"domain_name" text,
	CONSTRAINT "organisations_name_unique" UNIQUE("name"),
	CONSTRAINT "organisations_domain_name_unique" UNIQUE("domain_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "payment_methods" (
	"payment_methods_id" serial PRIMARY KEY NOT NULL,
	"payment_methods_created_at" timestamp DEFAULT now() NOT NULL,
	"payment_methods_updated_at" timestamp NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"org" integer NOT NULL,
	CONSTRAINT "payment_methods_name_unique" UNIQUE("name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pricelist" (
	"pricelist_id" serial PRIMARY KEY NOT NULL,
	"pricelist_created_at" timestamp DEFAULT now() NOT NULL,
	"pricelist_updated_at" timestamp NOT NULL,
	"name" text NOT NULL,
	"payment_method" integer NOT NULL,
	"description" text,
	"price" integer NOT NULL,
	"units" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "appt_cal" (
	"appt_cal_id" serial PRIMARY KEY NOT NULL,
	"appt_cal_created_at" timestamp DEFAULT now() NOT NULL,
	"appt_cal_updated_at" timestamp NOT NULL,
	"appt_date" timestamp with time zone NOT NULL,
	"patient_uuid" uuid,
	"appt_state" "appt_state_t" DEFAULT 'blank' NOT NULL,
	CONSTRAINT "appt_cal_appt_date_unique" UNIQUE("appt_date")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "patients_file" (
	"patients_file_id" serial PRIMARY KEY NOT NULL,
	"patients_file_created_at" timestamp DEFAULT now() NOT NULL,
	"patients_file_updated_at" timestamp NOT NULL,
	"uuid" uuid DEFAULT gen_random_uuid() NOT NULL,
	"patient_name" text NOT NULL,
	"patient_no" text NOT NULL,
	"file_no" text NOT NULL,
	"occupation" text,
	"contact_info" json DEFAULT '{"PhoneNumbers":[],"EmailAddress":[],"Locale":{"City":"","Province":"","State":"","Nationality":"Ke"}}' NOT NULL,
	"next_of_kin" json DEFAULT '{"NA":{"Phone":"","Email":"","Relationship":""}}' NOT NULL,
	"date_of_birth" date NOT NULL,
	CONSTRAINT "patients_file_uuid_unique" UNIQUE("uuid"),
	CONSTRAINT "patients_file_patient_name_unique" UNIQUE("patient_name"),
	CONSTRAINT "patients_file_patient_no_unique" UNIQUE("patient_no"),
	CONSTRAINT "patients_file_file_no_unique" UNIQUE("file_no")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "services_records" (
	"services_records_id" serial PRIMARY KEY NOT NULL,
	"services_records_created_at" timestamp DEFAULT now() NOT NULL,
	"services_records_updated_at" timestamp NOT NULL,
	"visit_id" integer NOT NULL,
	"service_id" integer NOT NULL,
	"comment" text DEFAULT '',
	"quantity" integer DEFAULT 1 NOT NULL,
	"price" integer DEFAULT 100 NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "time_sheet" (
	"time_sheet_id" serial PRIMARY KEY NOT NULL,
	"time_sheet_created_at" timestamp DEFAULT now() NOT NULL,
	"time_sheet_updated_at" timestamp NOT NULL,
	"entry_time" timestamp DEFAULT now() NOT NULL,
	"triage_time" timestamp,
	"consult_entry_time" timestamp,
	"consult_exit_time" timestamp,
	"admission_time" timestamp,
	"theatre_entry_time" timestamp,
	"theatre_exit_time" timestamp,
	"exit_time" timestamp
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "visit_records" (
	"visit_id" serial PRIMARY KEY NOT NULL,
	"visit_created_at" timestamp DEFAULT now() NOT NULL,
	"visit_updated_at" timestamp NOT NULL,
	"date" date DEFAULT now() NOT NULL,
	"type" "visit_type" NOT NULL,
	"appt_id" integer,
	"time_row" integer NOT NULL,
	"patient" integer,
	"current_age" interval NOT NULL
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "payment_methods" ADD CONSTRAINT "payment_methods_org_organisations_organisations_id_fk" FOREIGN KEY ("org") REFERENCES "public"."organisations"("organisations_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pricelist" ADD CONSTRAINT "pricelist_payment_method_payment_methods_payment_methods_id_fk" FOREIGN KEY ("payment_method") REFERENCES "public"."payment_methods"("payment_methods_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "appt_cal" ADD CONSTRAINT "appt_cal_patient_uuid_patients_file_uuid_fk" FOREIGN KEY ("patient_uuid") REFERENCES "public"."patients_file"("uuid") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "services_records" ADD CONSTRAINT "services_records_visit_id_visit_records_visit_id_fk" FOREIGN KEY ("visit_id") REFERENCES "public"."visit_records"("visit_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "services_records" ADD CONSTRAINT "services_records_service_id_pricelist_pricelist_id_fk" FOREIGN KEY ("service_id") REFERENCES "public"."pricelist"("pricelist_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "visit_records" ADD CONSTRAINT "visit_records_appt_id_appt_cal_appt_cal_id_fk" FOREIGN KEY ("appt_id") REFERENCES "public"."appt_cal"("appt_cal_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "visit_records" ADD CONSTRAINT "visit_records_time_row_time_sheet_time_sheet_id_fk" FOREIGN KEY ("time_row") REFERENCES "public"."time_sheet"("time_sheet_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "visit_records" ADD CONSTRAINT "visit_records_patient_patients_file_patients_file_id_fk" FOREIGN KEY ("patient") REFERENCES "public"."patients_file"("patients_file_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "uniq_pricelist_item" ON "pricelist" ("name","payment_method");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "uniq_appt_idx" ON "appt_cal" ("appt_date","patient_uuid");