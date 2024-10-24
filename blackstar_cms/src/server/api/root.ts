import {
  createCallerFactory,
  createTRPCRouter,
} from '@blackstar/server/api/trpc';
import { contactFormsRouter, dashboardHelpers } from './routers/contact_forms';
import { dashboardGallery } from './routers/gallery';
import { userProfileManagement } from './routers/social_media_integration';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  contactForms: contactFormsRouter,
  dashboardHelpers,
  dashboardGallery,
  userProfileManagement,
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
