import { z } from 'zod';

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from '@blackstar/server/api/trpc';
import { db } from '@blackstar/server/db';

import { eq, sql } from 'drizzle-orm';
import { user_profile_return_t } from './social_media_integration_types';
import { organisations, users } from '@blackstar/server/db/schema';
import { env } from '@blackstar/env';

const org_select = organisations.$inferSelect;

export const userProfileManagement = createTRPCRouter({
  get: protectedProcedure.query(async ({ ctx }) => {
    const { session, visitor_id } = ctx;
    if (!session?.user?.id || !visitor_id) {
      return { success: false };
    }

    try {
      const user = (
        await db.select().from(users).where(eq(users.id, session.user.id))
      ).pop();
      if (!user?.client_org) {
        return { success: false };
      }
      console.log({ client_org: user.client_org });
      const organisation = (
        await db.execute(
          sql`select * from billing.organisations where billing.organisations.client_id = ${user.client_org}`,
        )
      ).pop() as typeof org_select;

      // console.log({ organisation });
      return {
        success: true,
        user,
        organisation,
      };
    } catch (err) {
      console.log(err);
      if (env.NODE_ENV === 'development') {
        return { success: false, error: err };
      }

      return { success: false };
    }
  }),
});
