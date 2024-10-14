import { env } from "@blackstar/env";
import { db } from "@blackstar/server/db";
import { sql } from "drizzle-orm";
import { z } from "zod";

export type DBUserDataT = {
	id: string;
	name: string;
	email: string;
	email_verified: string | null;
	image: string | null;
	client_org: string;
	contact_info: string | null;
	pass_id: string | null;
	pass_created_at: string | null;
	pass_updated_at: string | null;
	user: string | null;
	password: string | null;
};

export const get_users_passwords = async (
	email: string,
): Promise<DBUserDataT[] | null> => {
	if (!email_schema.safeParse(email).success) {
		console.log({ email, loc: "get_users_passwords" });
		return null;
	}

	return await db.execute(
		sql`select * from user_accounts."user" left join user_accounts.passwords_table on user_accounts.user.id = user_accounts.passwords_table."user" where email=${email}`,
	);
};

const email_schema = z.string().email();
