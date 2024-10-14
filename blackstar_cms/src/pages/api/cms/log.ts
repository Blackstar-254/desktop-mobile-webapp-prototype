// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

import { db } from "@blackstar/server/db";
import { visits_table } from "@blackstar/server/db/schema";
import { env } from "@blackstar/env";
import { eq, sql } from "drizzle-orm";
import { visitor_info_t } from "@blackstar/server/db/schema/utils/visitor_info";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>,
) {
	const { body } = req;
	if (typeof body !== "string") {
		res.status(400).json({});
		return;
	}

	try {
		const data = JSON.parse(body);
		console.log(data);
	} catch (err) {
		res.status(400).json({ success: false });
	}

	return;
}
