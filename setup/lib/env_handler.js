const fs = require("node:fs");
const crypto = require("node:crypto");

const { z } = require("zod");
const dotenv = require("dotenv");
const readline = require("node:readline");
const rl = readline.createInterface({
	input: process.stdin,
	output: process.stdout,
});

dotenv.config();

const workEnvSchema = z
	.enum(["development", "test", "production", "debug"])
	.default("development");

const parse_string = z.string().regex(/(?!=[@:;\+\-\.\,\!])/);
const parse_port = z.coerce.number();
const parse_nextauth_secret = z
	.string()
	.length(32)
	.regex(/(?!=[!\-\.])/);
const envItemsSchema = z.object({
	ORG_NAME: parse_string,
	DATABASE_HOST: parse_string,
	DATABASE_DATABASENAME: parse_string,
	DATABASE_USER: parse_string,
	DATABASE_PASSWORD: parse_string,
	DATABASE_PORT: parse_port,
	DATABASE_URL: z.string().url(),

	CLIENT_ID:
		process.env.NODE_ENV === "production"
			? z.string().uuid()
			: z.string().uuid().optional(),

	NODE_ENV: workEnvSchema,
	GIN_MODE: workEnvSchema,
	NEXTAUTH_SECRET: parse_nextauth_secret,
	NEXTAUTH_URL: z.string().url(),

	API_PORT: parse_port,
	PORT: parse_port,
	NEXT_PUBLIC_BLACKSTARTECH_CMS_URL: z.string().url(),

	SUPABASE_REFERENCE_ID: parse_string,
	NEXT_PUBLIC_SUPABASE_API_KEY: z.string(),
	NEXT_PUBLIC_SUPABASE_PROJECT_URL: z.string().url(),

	SUPABASE_SERVICE_ROLE_SECRET: z.string().min(4),
	SUPABASE_JWT_SECRET: z.string().min(4),

	EMAIL_SERVER_HOST: z.string(),
	EMAIL_SERVER_PORT: z.coerce.number(),
	EMAIL_SERVER_USER: z.string(),
	EMAIL_SERVER_PASSWORD: z.string(),
	EMAIL_FROM: z.string().email(),
});

const generate_secret = () => {
	const uuid = crypto.randomUUID;
	let res = "";
	for (let i = 6; i; i--) {
		res += uuid();
	}
	res = res.replaceAll(/\-/g, "");
	const rand = crypto.randomInt(365);
	if (rand % 19) {
		return res.slice(-34);
	}
	if (rand % 13) {
		return res.slice(12);
	}
	if (rand % 9) {
		return res.slice(19);
	}
	if (rand % 5) {
		return res.slice(9);
	}

	return res;
};

const envItems = {
	DATABASE_HOST: "",
	ORG_NAME: "",
	DATABASE_DATABASENAME: "",
	DATABASE_USER: "",
	DATABASE_PASSWORD: "",
	DATABASE_PORT: "",
	DATABASE_URL: "",

	NEXT_PUBLIC_SUPABASE_PROJECT_URL: "",
	NODE_ENV: "",
	GIN_MODE: "",
	NEXTAUTH_SECRET: "",
	NEXTAUTH_URL: "http://localhost:3000",

	API_PORT: "",
	PORT: "",
	CLIENT_ID: "",
	NEXT_PUBLIC_BLACKSTARTECH_CMS_URL: "",

	SUPABASE_REFERENCE_ID: "",
	NEXT_PUBLIC_SUPABASE_API_KEY: "",
	SUPABASE_SERVICE_ROLE_SECRET: "",
	SUPABASE_JWT_SECRET: "",

	EMAIL_SERVER_HOST: "",
	EMAIL_SERVER_PORT: "",
	EMAIL_SERVER_USER: "",
	EMAIL_SERVER_PASSWORD: "",
	EMAIL_FROM: "",
};

const envCreateString = (new_env = false) => {
	let output = "";

	const envObj = new_env ? envItemsSchema.parse(envItems) : envItems;

	for (const v of Object.keys(envObj)) {
		output = `${output}\n${v}="${envItems[v]}"\n`;
	}
	output = `${output}\n`;

	return output;
};

{
	const f_loc = ".env.example";
	const f_data = envCreateString();
	if (fs.existsSync(f_loc)) {
		const f = fs.readFileSync(f_loc, { encoding: "utf-8", flag: "r" });
		if (f !== f_data) {
			fs.writeFileSync(f_loc, f_data, { flag: "w", encoding: "utf-8" });
		}
	} else {
		fs.writeFileSync(f_loc, f_data, { flag: "w", encoding: "utf-8" });
	}
}

envItems.NEXTAUTH_SECRET = generate_secret();
const read_new_var_value = (key) => {
	return new Promise((res, _rej) => {
		rl.question(`${key}? \n`, (value) => {
			let val = value.trim();
			val = val.length ? val : envItems[key];
			console.log(`${key}="${val}"`);
			res(val);
		});
	});
};

const read_env = async () => {
	for (const key of Object.keys(envItems)) {
		const value = process.env[key];
		switch (key) {
			case "DATABASE_URL": {
				envItems.DATABASE_URL = `postgres://${envItems.DATABASE_USER}:${envItems.DATABASE_PASSWORD}@${envItems.DATABASE_HOST}:${envItems.DATABASE_PORT.valueOf()}/${envItems.DATABASE_DATABASENAME}`;
				break;
			}
			case "CLIENT_ID": {
				envItems.CLIENT_ID = z.string().uuid("client_id").safeParse(value)
					.success
					? value
					: crypto.randomUUID();

				break;
			}

			case "NEXTAUTH_SECRET":
				{
					envItems[key] =
						process.env?.[key] && parse_nextauth_secret.safeParse(value).success
							? value
							: generate_secret().slice(0, 32);
					break;
				}

				break;
			default:
				if (process.env?.[key]?.length) {
					envItems[key] = value;
				} else {
					envItems[key] = await read_new_var_value(key);
				}
		}
		fs.writeFileSync(".env", envCreateString(), {
			flag: "w",
			encoding: "utf-8",
		});
	}

	try {
		envItemsSchema.parse(envItems);

		for (const folder of [
			".",
			"golang_api/src/server",
			"dmwebapp",
			"database_management",
			"fastify-api",
			"blackstar_cms"
		]) {
			fs.writeFileSync(`${folder}/.env`, envCreateString(true), {
				flag: "w",
				encoding: "utf-8",
			});
			console.log(`written .env in dir: ${folder}`);
		}
	} catch (e) {
		console.error(e);

		process.exit(-1);
	}

	console.log("finished writing envs");
};

read_env();

module.exports = {
	envCreateString,
	envItems,
	envItemsSchema,
};
