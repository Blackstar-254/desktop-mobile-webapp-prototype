import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import { authOptions } from "@blackstar/server/auth";
import { env } from "@blackstar/env";
import { z } from "zod";
import Email from "next-auth/providers/email";
import { email_object } from "@blackstar/lib/api/email_handlers";

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
	// Do whatever you want here, before the request is passed down to `NextAuth`

	await NextAuth(req, res, {
		...authOptions,
		providers: [...authOptions.providers, email_provider],
	});
}

const parse_credentials = z.object({
	username: z
		.string()
		.min(3)
		.max(36)
		.regex(/^[a-z0-9\.@ ]+$/i),

	email: z.string().email(),
	password: z.string().max(36).min(3),
});

let redirect_to = "";

const email_provider = Email({
	server: email_object,
	from: env.EMAIL_FROM,
});
