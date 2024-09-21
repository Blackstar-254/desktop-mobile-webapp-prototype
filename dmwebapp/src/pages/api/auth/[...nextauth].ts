import CredentialsProvider from "next-auth/providers/credentials";
import type { NextApiRequest, NextApiResponse } from "next";
import NextAuth from "next-auth";
import { authOptions } from "@blackstar/server/auth";
import { env } from "@blackstar/env";
import { db } from "@blackstar/server/db";
import { sql } from "drizzle-orm";
import { z } from "zod";
import { NextResponse } from "next/server";
import { get_users_passwords } from "@blackstar/lib/api/auth";
import Email from "next-auth/providers/email";
import nodemailer from "nodemailer";

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

const email_object = {
	host: env.EMAIL_SERVER_HOST,
	port: env.EMAIL_SERVER_PORT,
	auth: {
		user: env.EMAIL_SERVER_USER,
		pass: env.EMAIL_SERVER_PASSWORD,
	},
};

const email_provider = Email({
	server: email_object,
	from: env.EMAIL_FROM,
});

var transport = nodemailer.createTransport(email_object);
