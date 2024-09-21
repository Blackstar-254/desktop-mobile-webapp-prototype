import { postRouter } from "@blackstar/server/api/routers/post";
import {
	createCallerFactory,
	createTRPCRouter,
} from "@blackstar/server/api/trpc";
import { contactFormsRouter } from "./routers/contact_forms";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	post: postRouter,
	contactForms: contactFormsRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;

/**
 * Create a server-side caller for the tRPC API.
 * @example
 * const trpc = createCaller(createContext);
 * const res = await trpc.post.all();
 *       ^? Post[]
 */
export const createCaller = createCallerFactory(appRouter);
