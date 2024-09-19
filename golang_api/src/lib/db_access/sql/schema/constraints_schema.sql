--> statement-breakpoint
CREATE TYPE "public"."payment_method_t" AS ENUM('cash', 'mpesa', 'bank_transfer', 'cheque', 'visa');
--> statement-breakpoint
CREATE TYPE "public"."payment_period_t" AS ENUM('monthly', 'weekly', 'annually', '3 months', '2 years', '5 years');
--> statement-breakpoint
ALTER TABLE "billing"."transactions_records" ADD CONSTRAINT "transactions_records_client_id_organisations_client_id_fk" FOREIGN KEY ("client_id") REFERENCES "billing"."organisations"("client_id") ON DELETE no action ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "user_accounts"."account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user_accounts"."user"("id") ON DELETE no action ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "user_accounts"."session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user_accounts"."user"("id") ON DELETE no action ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "user_accounts"."user" ADD CONSTRAINT "user_client_org_organisations_client_id_fk" FOREIGN KEY ("client_org") REFERENCES "billing"."organisations"("client_id") ON DELETE no action ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "user_accounts"."visits" ADD CONSTRAINT "visits_client_id_organisations_client_id_fk" FOREIGN KEY ("client_id") REFERENCES "billing"."organisations"("client_id") ON DELETE no action ON UPDATE no action;
--> statement-breakpoint
ALTER TABLE "user_accounts"."visits" ADD CONSTRAINT "visits_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "user_accounts"."user"("id") ON DELETE no action ON UPDATE no action;
--> statement-breakpoint
CREATE INDEX IF NOT EXISTS "session_user_id_idx" ON "user_accounts"."session" USING btree ("user_id");