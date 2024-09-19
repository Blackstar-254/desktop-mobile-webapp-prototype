DROP SCHEMA "billing" CASCADE;
--> statement-breakpoint
DROP SCHEMA "content" CASCADE;
--> statement-breakpoint
DROP SCHEMA "user_accounts" cascade;
--> statement-breakpoint
DROP TYPE "public"."payment_method_t" cascade;
--> statement-breakpoint
DROP TYPE "public"."payment_period_t" cascade;
--> statement-breakpoint
DROP TABLE  "billing"."organisations";
--> statement-breakpoint
DROP TABLE  "billing"."pricelist" ;
--> statement-breakpoint
DROP TABLE  "billing"."transactions_records" ;
--> statement-breakpoint
DROP TABLE  "content"."post" ;
--> statement-breakpoint
DROP TABLE  "user_accounts"."account" ;
--> statement-breakpoint
DROP TABLE  "user_accounts"."session" ;
--> statement-breakpoint
DROP TABLE  "user_accounts"."user" ;
--> statement-breakpoint
DROP TABLE  "user_accounts"."verification_token" ;
--> statement-breakpoint
DROP TABLE  "visitors" ;
--> statement-breakpoint
DROP UNIQUE INDEX  "uniq_pricelist_item" cascade;
DROP INDEX  "created_by_idx" cascade;
DROP INDEX  "name_idx" cascade;
DROP INDEX  "account_user_id_idx" cascade;
DROP INDEX  "session_user_id_idx" cascade;