import type { NextApiRequest, NextApiResponse } from "next";

import { env } from "@blackstar/env";

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse<any>,
) {
	const { method } = req;
	if (method !== "GET") {
		res.status(400).write("");
		return;
	}

	res.status(200);
	res.json({
		ClientId: env.CLIENT_ID,
	});
}
