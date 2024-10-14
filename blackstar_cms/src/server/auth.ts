import { DrizzleAdapter } from "@auth/drizzle-adapter";
import type { GetServerSidePropsContext } from "next";
import {
	type DefaultSession,
	type NextAuthOptions,
	getServerSession,
} from "next-auth";
import type { Adapter } from "next-auth/adapters";
import DiscordProvider from "next-auth/providers/discord";

import { env } from "@blackstar/env";
import { db } from "@blackstar/server/db";
import {
	accounts,
	sessions,
	users,
	verificationTokens,
} from "@blackstar/server/db/schema";
import { z } from "zod";
import { DefaultPostgresSchema } from "node_modules/@auth/drizzle-adapter/lib/pg";

import { sql } from "drizzle-orm";
import { get_users_passwords } from "@blackstar/lib/api/auth";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
	interface Session extends DefaultSession {
		user: {
			id: string;
			// ...other properties
			// role: UserRole;
		} & DefaultSession["user"];
	}

	// interface User {
	//   // ...other properties
	//   // role: UserRole;
	// }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authOptions: NextAuthOptions = {
	callbacks: {
		session: ({ session, user }) => ({
			...session,
			user: {
				...session.user,
				id: user.id,
			},
		}),
		async signIn({ user, account, profile, email, credentials }) {
			console.log({ user, account });
			// return true;
			if (!user?.email) {
				return false;
			}
			const a = await get_users_passwords(user.email);
			if (!a?.length) {
				return false;
			}

			return true;
		},
	},
	debug: true,

	session: {
		maxAge: 5 * 24 * 60 * 60, // 5 days
		strategy: "database",
		updateAge: 60 * 60,
	},

	adapter: DrizzleAdapter(db, {
		usersTable: users,
		accountsTable: accounts,
		sessionsTable: sessions,
		verificationTokensTable: verificationTokens,
	} as unknown as DefaultPostgresSchema) as Adapter,
	providers: [
		/**
		 * ...add more providers here.
		 *
		 * Most other providers require a bit more work than the Discord provider. For example, the
		 * GitHub provider requires you to add the `refresh_token_expires_in` field to the Account
		 * model. Refer to the NextAuth.js docs for the provider you want to use. Example:
		 *
		 * @see https://next-auth.js.org/providers/github
		 */
	],
};

/**
 * Wrapper for `getServerSession` so that you don't need to import the `authOptions` in every file.
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
export const getServerAuthSession = (ctx: {
	req: GetServerSidePropsContext["req"];
	res: GetServerSidePropsContext["res"];
}) => {
	return getServerSession(ctx.req, ctx.res, authOptions);
};
