import { z } from "zod";

import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "@blackstar/server/api/trpc";
import { db } from "@blackstar/server/db";
import {
	contact_us_form_table,
	visits_table,
} from "@blackstar/server/db/schema";
import { eq } from "drizzle-orm";
import { env } from "@blackstar/env";

export const contactFormsRouter = createTRPCRouter({
	view_all: protectedProcedure.query(async ({ ctx }) => {
		if (!env.CLIENT_ID) {
			return null;
		}
		const res = await ctx.db
			.select()
			.from(contact_us_form_table)
			.where(eq(contact_us_form_table.client, env.CLIENT_ID));

		return res;
	}),
});

export const dashboardHelpers = createTRPCRouter({
	get_visits: protectedProcedure.query(async ({ ctx }) => {
		if (!env.CLIENT_ID) {
			return null;
		}
		const res = await ctx.db
			.select()
			.from(visits_table)
			.where(eq(visits_table.client, env.CLIENT_ID));

		return res;
	}),
});
