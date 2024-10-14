import { env } from "@blackstar/env";
import nodemailer from "nodemailer";

export const email_object = {
	host: env.EMAIL_SERVER_HOST,
	port: env.EMAIL_SERVER_PORT,
	auth: {
		user: env.EMAIL_SERVER_USER,
		pass: env.EMAIL_SERVER_PASSWORD,
	},
};

export var transport = nodemailer.createTransport(email_object);
