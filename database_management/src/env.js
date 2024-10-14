import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";
const _workEnvSchema = z
	.enum(["development", "test", "production", "debug"])
	.default("development");

const parse_string = z.string().regex(/(?!=[@:;\+\-\.\,\!])/);
const parse_port = z.coerce.number();
const _parse_nextauth_secret = z
	.string()
	.length(32)
	.regex(/(?!=[!\-\.])/);
export const env = createEnv({
	/**
	 * Specify your server-side environment variables schema here. This way you can ensure the app
	 * isn't built with invalid env vars.
	 */
	server: {
		DATABASE_URL: z.string().url(),
		NODE_ENV: z
			.enum(["development", "test", "production"])
			.default("development"),
		NEXTAUTH_SECRET:
			process.env.NODE_ENV === "production"
				? z.string()
				: z.string().optional(),
		NEXTAUTH_URL: z.preprocess(
			// This makes Vercel deployments not fail if you don't set NEXTAUTH_URL
			// Since NextAuth.js automatically uses the VERCEL_URL if present.
			(str) => process.env.VERCEL_URL ?? str,
			// VERCEL_URL doesn't include `https` so it cant be validated as a URL
			process.env.VERCEL ? z.string() : z.string().url(),
		),
		ORG_NAME: parse_string,
		DATABASE_HOST: parse_string,
		DATABASE_DATABASENAME: parse_string,
		DATABASE_USER: parse_string,
		DATABASE_PASSWORD: parse_string,
		DATABASE_PORT: parse_port,

		CLIENT_ID:
			process.env.NODE_ENV === "production"
				? z.string().uuid()
				: z.string().uuid().optional(),

		API_PORT: parse_port,
		PORT: parse_port,

		SUPABASE_REFERENCE_ID: parse_string,

		SUPABASE_SERVICE_ROLE_SECRET: z.string().min(4),
		SUPABASE_JWT_SECRET: z.string().min(4),
	},

	/**
	 * Specify your client-side environment variables schema here. This way you can ensure the app
	 * isn't built with invalid env vars. To expose them to the client, prefix them with
	 * `NEXT_PUBLIC_`.
	 */
	client: {
		// NEXT_PUBLIC_CLIENTVAR: z.string(),
		NEXT_PUBLIC_SUPABASE_API_KEY: z.string(),
		NEXT_PUBLIC_SUPABASE_PROJECT_URL: z.string().url(),
	},

	/**
	 * You can't destruct `process.env` as a regular object in the Next.js edge runtimes (e.g.
	 * middlewares) or client-side so we need to destruct manually.
	 */
	runtimeEnv: {
		DATABASE_URL: process.env.DATABASE_URL,
		NODE_ENV: process.env.NODE_ENV,
		NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
		NEXTAUTH_URL: process.env.NEXTAUTH_URL,
		// DISCORD_CLIENT_ID: process.env.DISCORD_CLIENT_ID,
		// DISCORD_CLIENT_SECRET: process.env.DISCORD_CLIENT_SECRET,

		ORG_NAME: process.env.ORG_NAME,
		DATABASE_HOST: process.env.DATABASE_HOST,
		DATABASE_DATABASENAME: process.env.DATABASE_DATABASENAME,
		DATABASE_USER: process.env.DATABASE_USER,
		DATABASE_PASSWORD: process.env.DATABASE_PASSWORD,
		DATABASE_PORT: process.env.DATABASE_PORT,

		API_PORT: process.env.API_PORT,
		PORT: process.env.PORT,
		CLIENT_ID: process.env.CLIENT_ID,

		SUPABASE_REFERENCE_ID: process.env.SUPABASE_REFERENCE_ID,
		NEXT_PUBLIC_SUPABASE_API_KEY: process.env.NEXT_PUBLIC_SUPABASE_API_KEY,
		NEXT_PUBLIC_SUPABASE_PROJECT_URL:
			process.env.NEXT_PUBLIC_SUPABASE_PROJECT_URL,

		SUPABASE_SERVICE_ROLE_SECRET: process.env.SUPABASE_SERVICE_ROLE_SECRET,
		SUPABASE_JWT_SECRET: process.env.SUPABASE_JWT_SECRET,
	},
	/**
	 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially
	 * useful for Docker builds.
	 */
	skipValidation: !!process.env.SKIP_ENV_VALIDATION,
	/**
	 * Makes it so that empty strings are treated as undefined. `SOME_VAR: z.string()` and
	 * `SOME_VAR=''` will throw an error.
	 */
	emptyStringAsUndefined: true,
});
