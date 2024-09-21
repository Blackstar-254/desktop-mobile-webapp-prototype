import { z } from "zod";

import {
	createTRPCRouter,
	protectedProcedure,
	publicProcedure,
} from "@blackstar/server/api/trpc";

export const contactFormsRouter = createTRPCRouter({});
