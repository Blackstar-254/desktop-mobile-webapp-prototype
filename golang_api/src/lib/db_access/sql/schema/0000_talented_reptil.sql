CREATE SCHEMA "billing";
--> statement-breakpoint
CREATE SCHEMA "content";
--> statement-breakpoint
CREATE SCHEMA "user_accounts";
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."payment_method_t" AS ENUM('cash', 'mpesa', 'bank_transfer', 'cheque', 'visa');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "public"."payment_period_t" AS ENUM('monthly', 'weekly', 'annually', '3 months', '2 years', '5 years');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "billing"."organisations" (
	"organisations_id" serial PRIMARY KEY NOT NULL,
	"organisations_created_at" timestamp DEFAULT now() NOT NULL,
	"organisations_updated_at" timestamp NOT NULL,
	"name" text NOT NULL,
	"address" text DEFAULT 'P O Box 1862 80100' NOT NULL,
	"domain_name" text,
	"client_id" text NOT NULL,
	"contact_information" jsonb,
	"social_media_integration" jsonb,
	CONSTRAINT "organisations_name_unique" UNIQUE("name"),
	CONSTRAINT "organisations_domain_name_unique" UNIQUE("domain_name")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "billing"."pricelist" (
	"pricelist_id" serial PRIMARY KEY NOT NULL,
	"pricelist_created_at" timestamp DEFAULT now() NOT NULL,
	"pricelist_updated_at" timestamp NOT NULL,
	"name" text NOT NULL,
	"description" text,
	"sales_price_in_cents" integer DEFAULT 200000 NOT NULL,
	"payment_period" "payment_period_t" NOT NULL,
	"cost_in_cents" integer DEFAULT 200000 NOT NULL,
	"cost_period" "payment_period_t" NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "billing"."transactions_records" (
	"transactions_id" serial PRIMARY KEY NOT NULL,
	"transactions_created_at" timestamp DEFAULT now() NOT NULL,
	"transactions_updated_at" timestamp NOT NULL,
	"description" text NOT NULL,
	"client_id" text NOT NULL,
	"credit_in_cents" integer DEFAULT 0 NOT NULL,
	"debit_in_cents" integer DEFAULT 0 NOT NULL,
	"payment_method" "payment_method_t" NOT NULL,
	"discount_in_cents" integer DEFAULT 0 NOT NULL,
	"pending_payment_in_cents" integer DEFAULT 0 NOT NULL,
	"next_payment_date" timestamp with time zone,
	CONSTRAINT "transactions_records_description_unique" UNIQUE("description")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "content"."post" (
	"posts_id" serial PRIMARY KEY NOT NULL,
	"posts_created_at" timestamp DEFAULT now() NOT NULL,
	"posts_updated_at" timestamp NOT NULL,
	"name" varchar(256),
	"created_by" varchar(255) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_accounts"."account" (
	"user_id" varchar(255) NOT NULL,
	"type" varchar(255) NOT NULL,
	"provider" varchar(255) NOT NULL,
	"provider_account_id" varchar(255) NOT NULL,
	"refresh_token" text,
	"access_token" text,
	"expires_at" integer,
	"token_type" varchar(255),
	"scope" varchar(255),
	"id_token" text,
	"session_state" varchar(255),
	CONSTRAINT "account_provider_provider_account_id_pk" PRIMARY KEY("provider","provider_account_id")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_accounts"."session" (
	"session_token" varchar(255) PRIMARY KEY NOT NULL,
	"user_id" varchar(255) NOT NULL,
	"expires" timestamp with time zone NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_accounts"."user" (
	"id" varchar(255) PRIMARY KEY NOT NULL,
	"name" varchar(255),
	"email" varchar(255) NOT NULL,
	"email_verified" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
	"image" varchar(255),
	"client_org" text,
	"contact_info" jsonb
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "user_accounts"."verification_token" (
	"identifier" varchar(255) NOT NULL,
	"token" varchar(255) NOT NULL,
	"expires" timestamp with time zone NOT NULL,
	CONSTRAINT "verification_token_identifier_token_pk" PRIMARY KEY("identifier","token")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "visitors" (
	"visitor_id" serial PRIMARY KEY NOT NULL,
	"visitor_created_at" timestamp DEFAULT now() NOT NULL,
	"visitor_updated_at" timestamp NOT NULL,
	"client_id" text NOT NULL,
	"visitor_info" jsonb
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "billing"."transactions_records" ADD CONSTRAINT "transactions_records_client_id_organisations_client_id_fk" FOREIGN KEY ("client_id") REFERENCES "billing"."organisations"("client_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "content"."post" ADD CONSTRAINT "post_created_by_user_id_fk" FOREIGN KEY ("created_by") REFERENCES "user_accounts"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_accounts"."account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user_accounts"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_accounts"."session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user_accounts"."user"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "user_accounts"."user" ADD CONSTRAINT "user_client_org_organisations_client_id_fk" FOREIGN KEY ("client_org") REFERENCES "billing"."organisations"("client_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "visitors" ADD CONSTRAINT "visitors_client_id_organisations_client_id_fk" FOREIGN KEY ("client_id") REFERENCES "billing"."organisations"("client_id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "uniq_pricelist_item" ON "billing"."pricelist" USING btree ("name","payment_period");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "created_by_idx" ON "content"."post" USING btree ("created_by");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "name_idx" ON "content"."post" USING btree ("name");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "account_user_id_idx" ON "user_accounts"."account" USING btree ("user_id");--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "session_user_id_idx" ON "user_accounts"."session" USING btree ("user_id");